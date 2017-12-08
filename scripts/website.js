#!/usr/bin/env node

const declassify = require(`declassify`);
const fs = require(`fs`);
const minify = require(`html-minifier`).minify;
const path = require(`path`);
const uncss = require(`uncss`);

const root = `website`;
const index = path.join(root, `index.html`);
let html = fs.readFileSync(index, { encoding: `utf8` });
const perfundoCss = fs.readFileSync(path.join(root, `vendor/perfundo/perfundo.with-icons.min.css`));
const perfundoJs = fs.readFileSync(path.join(root, `vendor/perfundo/perfundo.min.js`));
const indexCss = fs.readFileSync(path.join(root, `dist/index.min.css`));
const rawCss = perfundoCss + indexCss;

html = html
  .replace(`<link rel="stylesheet" href="vendor/perfundo/perfundo.with-icons.css">`, ``)
  .replace(`<link rel="stylesheet" href="dist/index.css">`, `##CSS##`)
  .replace(`<script src="vendor/perfundo/perfundo.js"></script>`, `<script>${perfundoJs}</script>`);

uncss(html, { htmlroot: root, csspath: root, raw: rawCss, ignore: [/is-active/, /:target/] }, (error, css) => {
  if (error) throw error;

  const uncssHtml = html.replace(`##CSS##`, `<style>${css}</style>`);
  const minifyHtml = minify(uncssHtml, { collapseWhitespace: true });
  const declassifyHtml = declassify.process(minifyHtml, {
    ignore: [/perfundo.*/],
  });

  fs.writeFileSync(index, declassifyHtml);
});
