const fs = require('fs');

const getFile = (async (file) => {
  let res = {};
  const obj = JSON.parse(fs.readFileSync(file, 'utf8'));
  const fileName = file.replace('.json', '');

  res[fileName] = obj;
  return res;
})
module.exports = (async () => {
  let files = fs.readdirSync('./schemas/');
  files = files.map((file) => {
    return `./schemas/${file}`;
  });
  console.log(files);
  let objArray = [];
  for (let i = 0; i < files.length; i++) {
    const object = await getFile(files[i]);
    objArray.push(object);
  }
  return objArray;
})
