const axios = require('axios');

const retrieveData = (async (url, param) => {
  const promise = await axios(url);
  let dataArray = promise.data;
  dataArray = dataArray.map((data) => {
    return data[param];
  })
  return dataArray;
})

module.exports.getLatestMigration = (async (url) => {
  let migrationList = await retrieveData(url, 'name');
  migrationList = migrationList.filter((migration) => {
    return migration.indexOf("v") >= 0;
  })
  let res = migrationList.pop();
  res = res.replace('.js', '');
  res = res.replace('v', '');
  return res;
})
