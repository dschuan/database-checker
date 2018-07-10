const axios = require('axios');
const renderUrl = require('./renderUrl');
const MongoClient = require('mongodb').MongoClient;

const getDBVer = (async (dbData) => {
  const url = renderUrl(dbData);
  const dbName = dbData.name;
  try {
    client = await MongoClient.connect(url, {useNewUrlParser: true});

    const db = client.db(dbName);
    const col = await db.collection('migrations');
    const migration = await col.find({}).sort({'version': -1}).limit(1).toArray();
    console.log(migration[0]);
    return migration[0].version;

  } catch (err) {
    throw err;
    res = -1;
  } finally {
    if (client) {
      client.close();
    }
    return res;
  }
});

const getMigratedVer = (async (info) => {
  const {url} = info;
  //get the current version
  axios.get(`${url}/api/v1`).then((res) => {
    const version = res.info.version;
    return version.split('-')[0];
  })
})
module.exports.checkVersion = (async (info, dbData) => {
  const {user, password} = info;
  try {
    const dbVer = await getDBVer(dbData);
    const migratedVer = await getMigratedVer(info);
  } catch (err) {
    throw err;
   finally {
     return true;
   }
})
