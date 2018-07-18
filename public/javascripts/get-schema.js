const fs = require('fs');

const getFile = (async (file) => {
  const obj = JSON.parse(fs.readFileSync(file, 'utf8'));
  return obj;
})
module.exports.getSchemaList = (async () => {
  let files = fs.readdirSync('./schemas/');
  files = files.map((file) => {
    return `./schemas/${file}`;
  });
  return files;
})

module.exports.getSchema = (async (filepath) => {
  let file = await getFile(filepath);
  return file;
})
