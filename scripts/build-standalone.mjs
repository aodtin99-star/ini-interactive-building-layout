// Builds an offline artifact without changing the React source or Vite config.
import { build } from 'vite';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const temporaryOutput = await mkdtemp(path.join(tmpdir(), 'ini-standalone-'));
try {
  await build({
    root,
    build: {
      outDir: temporaryOutput,
      emptyOutDir: true,
      assetsInlineLimit: () => true,
      cssCodeSplit: false,
      sourcemap: false,
    },
  });
  let html = await readFile(path.join(temporaryOutput, 'index.html'), 'utf8');
  const script = html.match(/<script\b[^>]*\bsrc="([^"]+)"[^>]*><\/script>/);
  const stylesheet = html.match(/<link\b[^>]*\brel="stylesheet"[^>]*\bhref="([^"]+)"[^>]*>/);
  if (!script || !stylesheet) throw new Error('Expected one Vite script and stylesheet.');
  const js = await readFile(path.join(temporaryOutput, script[1].replace(/^\//, '')), 'utf8');
  const css = await readFile(path.join(temporaryOutput, stylesheet[1].replace(/^\//, '')), 'utf8');
  if (/\burl\((?!["']?data:)/i.test(css)) throw new Error('CSS contains a non-inline asset.');
  const favicon = await readFile(path.join(root, 'public/favicon.svg'));
  html = html.replace(script[0], () => `<script type="module">${js.replace(/<\/script/gi, '<\\/script')}</script>`);
  html = html.replace(stylesheet[0], () => `<style>${css}</style>`);
  html = html.replace('href="/favicon.svg"', `href="data:image/svg+xml;base64,${favicon.toString('base64')}"`);
  if (/<(?:script|link)\b[^>]*(?:src|href)=["'](?:https?:|\/|\.\/)/i.test(html)) {
    throw new Error('HTML still contains external resources.');
  }
  const output = path.join(root, 'ini-building-layout-standalone.html');
  await writeFile(output, html);
  console.log(`Standalone HTML: ${output} (${Buffer.byteLength(html)} bytes)`);
} finally {
  await rm(temporaryOutput, { recursive: true, force: true });
}
