import fs from 'node:fs';
import path from 'node:path';
import { site } from '../content/site.mjs';

const root = path.resolve(import.meta.dirname, '..');
const sitePath = new URL(site.url).pathname;
const ignoredDirs = new Set(['.git', 'node_modules', 'dist', '.cache', 'coverage']);
const errors = [];
const warnings = [];
const idCache = new Map();

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name.startsWith('.') && entry.name !== '.nojekyll') continue;
    if (ignoredDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

function rel(file) {
  return path.relative(root, file).replaceAll('\\', '/');
}

function decode(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

function getIds(file) {
  if (idCache.has(file)) return idCache.get(file);
  const html = fs.readFileSync(file, 'utf8');
  const ids = new Set();
  const duplicates = new Set();
  for (const match of html.matchAll(/\sid="([^"]+)"/g)) {
    if (ids.has(match[1])) duplicates.add(match[1]);
    ids.add(match[1]);
  }
  const data = { ids, duplicates };
  idCache.set(file, data);
  return data;
}

function checkTarget(source, ref, kind) {
  if (!ref) {
    errors.push(`${rel(source)}: ${kind} vacío`);
    return;
  }
  if (/^(https?:|mailto:|tel:|data:|javascript:|\/\/)/i.test(ref)) return;
  if (ref === '#') {
    errors.push(`${rel(source)}: ${kind}="#"; usa un ancla real o un botón`);
    return;
  }

  let targetPath = ref;
  let hash = '';
  const hashIndex = targetPath.indexOf('#');
  if (hashIndex !== -1) {
    hash = targetPath.slice(hashIndex + 1);
    targetPath = targetPath.slice(0, hashIndex);
  }
  const queryIndex = targetPath.indexOf('?');
  if (queryIndex !== -1) targetPath = targetPath.slice(0, queryIndex);
  targetPath = decodeURIComponent(targetPath);

  let rootAbsolute = false;
  if (targetPath.startsWith('/')) {
    if (!targetPath.startsWith(sitePath)) {
      errors.push(`${rel(source)}: ${kind}="${ref}" escapa de la ruta publicada ${sitePath}`);
      return;
    }
    targetPath = targetPath.slice(sitePath.length);
    rootAbsolute = true;
    if (!targetPath) targetPath = 'index.html';
  }

  const deployedSource = new URL(rel(source), site.url);
  const deployedTarget = new URL(ref, deployedSource);
  if (!deployedTarget.pathname.startsWith(sitePath)) {
    errors.push(`${rel(source)}: ${kind}="${ref}" escapa del subpath ${sitePath} al publicarse`);
  }

  let target = targetPath
    ? rootAbsolute
      ? path.resolve(root, targetPath)
      : path.resolve(path.dirname(source), targetPath)
    : source;
  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, 'index.html');

  if (!fs.existsSync(target)) {
    errors.push(`${rel(source)}: ${kind}="${ref}" apunta a un archivo inexistente`);
    return;
  }

  if (hash && hash.startsWith('/')) return;
  if (hash && target.endsWith('.html')) {
    const { ids } = getIds(target);
    if (!ids.has(hash)) {
      errors.push(`${rel(source)}: ${kind}="${ref}" apunta a un id inexistente (#${hash})`);
    }
  }
}

const htmlFiles = walk(root).sort();

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const ids = getIds(file);
  for (const duplicate of ids.duplicates) {
    errors.push(`${rel(file)}: id duplicado "${duplicate}"`);
  }

  if (!/<html\s[^>]*lang="[^"]+"/i.test(html)) errors.push(`${rel(file)}: falta lang en <html>`);
  if (!/<meta\s[^>]*name="viewport"/i.test(html)) errors.push(`${rel(file)}: falta meta viewport`);
  if (!/<title>[^<]+<\/title>/i.test(html)) errors.push(`${rel(file)}: falta <title>`);
  if (!/<meta\s[^>]*name="description"[^>]*content="[^"]+"/i.test(html)) {
    errors.push(`${rel(file)}: falta meta description`);
  }
  const h1 = [...html.matchAll(/<h1[\s>]/gi)].length;
  if (h1 !== 1) errors.push(`${rel(file)}: se esperaba 1 <h1>, hay ${h1}`);

  for (const tag of html.matchAll(/<[a-z][^>]*>/gi)) {
    const raw = tag[0];
    if (/^<script\b/i.test(raw) || /^<style\b/i.test(raw)) continue;
    for (const match of raw.matchAll(/\s(href|src|action)="([^"]*)"/gi)) {
      checkTarget(file, decode(match[2]), match[1]);
    }

    const id = raw.match(/\sid="([^"]+)"/);
    const ariaLabelledby = raw.match(/\saria-labelledby="([^"]+)"/);
    if (ariaLabelledby) {
      for (const refId of ariaLabelledby[1].split(/\s+/)) {
        if (!ids.ids.has(refId)) errors.push(`${rel(file)}: aria-labelledby="${refId}" no existe`);
      }
    }
    const ariaControls = raw.match(/\saria-controls="([^"]+)"/);
    if (ariaControls) {
      for (const refId of ariaControls[1].split(/\s+/)) {
        if (!ids.ids.has(refId)) errors.push(`${rel(file)}: aria-controls="${refId}" no existe`);
      }
    }
    const bsTarget = raw.match(/\sdata-bs-target="(#[^"]+)"/);
    if (bsTarget && !ids.ids.has(bsTarget[1].slice(1))) {
      errors.push(`${rel(file)}: data-bs-target="${bsTarget[1]}" no existe`);
    }
    const bsParent = raw.match(/\sdata-bs-parent="(#[^"]+)"/);
    if (bsParent && !ids.ids.has(bsParent[1].slice(1))) {
      errors.push(`${rel(file)}: data-bs-parent="${bsParent[1]}" no existe`);
    }
    const forAttr = raw.match(/\sfor="([^"]+)"/);
    if (forAttr && !ids.ids.has(forAttr[1])) {
      errors.push(`${rel(file)}: label for="${forAttr[1]}" no existe`);
    }

    if (/^<img\b/i.test(raw) && !/\salt=/.test(raw)) {
      errors.push(`${rel(file)}: <img> sin alt`);
    }
    if (/^<iframe\b/i.test(raw) && !/\stitle=/.test(raw)) {
      errors.push(`${rel(file)}: <iframe> sin title`);
    }
    if (/^<button\b/i.test(raw) && !/\stype=/.test(raw)) {
      errors.push(`${rel(file)}: <button> sin type`);
    }
  }
}

const notFoundFile = path.join(root, '404.html');
if (fs.existsSync(notFoundFile)) {
  const html = fs.readFileSync(notFoundFile, 'utf8');
  const baseMatch = html.match(/<base\s+href="([^"]+)"/i);
  const deepUrl = new URL('a/b/c', site.url);
  const baseUrl = baseMatch ? new URL(decode(baseMatch[1]), deepUrl) : deepUrl;
  for (const tag of html.matchAll(/<[a-z][^>]*>/gi)) {
    const raw = tag[0];
    if (/^<script\b/i.test(raw) || /^<style\b/i.test(raw)) continue;
    for (const match of raw.matchAll(/\s(href|src)="([^"]*)"/gi)) {
      const ref = decode(match[2]);
      if (!ref || /^(https?:|mailto:|tel:|data:|javascript:|#)/i.test(ref)) continue;
      const resolved = new URL(ref, baseUrl);
      if (!resolved.pathname.startsWith(sitePath)) {
        errors.push(`404.html: ${match[1]}="${ref}" no resuelve bajo ${sitePath} en una URL profunda`);
        continue;
      }
      const localPath = decodeURIComponent(resolved.pathname.slice(sitePath.length)) || 'index.html';
      const target = path.join(root, localPath);
      if (!fs.existsSync(target)) errors.push(`404.html: ${match[1]}="${ref}" no existe como ${localPath}`);
    }
  }
}

const sitemapFile = path.join(root, 'sitemap.xml');
if (fs.existsSync(sitemapFile)) {
  const xml = fs.readFileSync(sitemapFile, 'utf8');
  const locations = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  if (!locations.length) errors.push('sitemap.xml: no contiene URLs');
  for (const location of locations) {
    if (location.includes('undefined')) errors.push(`sitemap.xml: URL inválida ${location}`);
    if (!location.startsWith(site.url)) {
      errors.push(`sitemap.xml: URL fuera del sitio ${location}`);
      continue;
    }
    const relative = decodeURIComponent(location.slice(site.url.length)) || 'index.html';
    const target = path.join(root, relative);
    if (!fs.existsSync(target)) errors.push(`sitemap.xml: archivo inexistente ${location}`);
  }
} else {
  errors.push('sitemap.xml no existe');
}

const robotsFile = path.join(root, 'robots.txt');
if (fs.existsSync(robotsFile)) {
  const robots = fs.readFileSync(robotsFile, 'utf8');
  const expectedSitemap = new URL('sitemap.xml', site.url).href;
  if (!robots.includes(`Sitemap: ${expectedSitemap}`)) {
    errors.push(`robots.txt: el Sitemap debe ser ${expectedSitemap}`);
  }
} else {
  warnings.push('robots.txt no existe');
}

const manifest = path.join(root, 'site.webmanifest');
if (fs.existsSync(manifest)) {
  try {
    const data = JSON.parse(fs.readFileSync(manifest, 'utf8'));
    for (const icon of data.icons || []) {
      const target = path.resolve(root, icon.src);
      if (!fs.existsSync(target)) errors.push(`site.webmanifest: icono inexistente ${icon.src}`);
    }
  } catch (error) {
    errors.push(`site.webmanifest: JSON inválido (${error.message})`);
  }
} else {
  warnings.push('site.webmanifest no existe');
}

const uniqueErrors = [...new Set(errors)];
const uniqueWarnings = [...new Set(warnings)];

if (uniqueWarnings.length) {
  console.log('Advertencias:');
  for (const warning of uniqueWarnings) console.log(`  - ${warning}`);
}

if (uniqueErrors.length) {
  console.error(`\nEnlaces/estructura: ${uniqueErrors.length} problema(s):`);
  for (const error of uniqueErrors) console.error(`  - ${error}`);
  process.exitCode = 1;
} else {
  console.log(`OK: ${htmlFiles.length} páginas HTML, enlaces internos, ids y metadatos revisados.`);
}
