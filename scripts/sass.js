const fs = require(`fs`);
const sass = require(`node-sass`);
const magicImporter = require(`node-sass-magic-importer`);

const files = [
  {
    file: `scss/index.scss`,
    outFile: `dist/perfundo.css`,
  },
  {
    file: `scss/with-icons.scss`,
    outFile: `dist/perfundo.with-icons.css`,
  },
  {
    file: `demo/scss/index.scss`,
    outFile: `demo/dist/index.css`,
  },
];

files.forEach(({ file, outFile }) => {
  sass.render({
    file,
    outFile,
    importer: magicImporter(),
    sourceMap: true,
  }, (error, result) => {
    if (error) throw error;

    fs.writeFileSync(outFile, result.css);
    fs.writeFileSync(`${outFile}.map`, result.map);
  });
});
