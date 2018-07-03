const fs = require('fs');

module.exports = (data) => {
  let {filepath, schema} = data;
  const fileExists = fs.existsSync(filepath);
  console.log(fs.existsSync(filepath))
  schema = JSON.stringify(schema, null, 2);
  console.log(filepath);
  console.log(schema);

  if (fileExists) {
    fs.writeFileSync(filepath, schema, {flag: 'w'});
    console.log('success');
    return 'success';
  }
}
