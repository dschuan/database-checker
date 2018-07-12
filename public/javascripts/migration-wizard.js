const axios = require('axios');
const renderUrl = require('./renderUrl');
const MongoClient = require('mongodb').MongoClient;

const GitHubHandler = require('./github-api-handler').getLatestMigration;

const getDBVer = (async (dbData) => {
  const url = renderUrl(dbData);
  const dbName = dbData.name;
  let res = -1;
  try {
    client = await MongoClient.connect(url, {useNewUrlParser: true});

    const db = client.db(dbName);
    const col = await db.collection('migrations');
    const migration = await col.find({}).sort({'version': -1}).limit(1).toArray();
    console.log(migration[0]);
    res = migration[0].version;

  } catch (err) {
    console.log(err.message);
    res = err.message;
  } finally {
    if (client) {
      client.close();
    }
    return res;
  }
});

const getMigratedVer = (async (info) => {
  const {url} = info;
  let res;
  //get the current version
  const verPromise = await axios(`${url}/api/v1/info`);
  res = verPromise.data.info.version;
  res = res.split('-')[0];
  res = res.replace('v', '');
  const githubUrl = `https://api.github.com/repos/RocketChat/Rocket.Chat/contents/server/startup/migrations?ref=${res}`;
  res = await GitHubHandler(githubUrl);

  return res;
})
module.exports.checkVersion = (async (info, dbData) => {
  const {user, password} = info;
  let res = null;
  try {
    const dbVer = await getDBVer(dbData);
    const migratedVer = await getMigratedVer(info);
    res = (dbVer === migratedVer) ? 'true' : 'false'
  } catch (err) {
    console.log(err.message);
  }
   finally {
     return res;
   }
})
