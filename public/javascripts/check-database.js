const assert = require('assert');
const SimpleSchema = require('simpl-schema').default;
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

const renderUrl = require('./renderUrl');
const getCollectionName = require('./handle-collection-data');
const getSchema = require('./format-schema').toSchema;

const validateFromSchema = (async (db, path, colName) => {
  let schema = getSchema(colName, path);
  schema = new SimpleSchema(schema).newContext();
  const col = db.collection(colName);
  const r = await col.find({}).toArray();
  const results = r.map((doc) => {
    schema.validate(doc);
    const res = {};
    res['isValid'] = schema.isValid();
    if (!schema.isValid()) {
      res['errors'] = schema.validationErrors();
    }
    return res;
  });
  console.log(`${colName} complete`);
  return results;
});

const exportResults = (async (dir, results) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const content = JSON.stringify(results, null, 2);
  const filePath = `${dir}/results.json`;
  await fs.writeFile(filePath, content, (err) => {
    assert.equal(err);
    console.log('Results saved');
  });
});
module.exports = (async (credentials) => {
  const url = renderUrl(credentials);
  const dbName = credentials.name;
  const path = './schemas';

  let client;
  let documents = {date: new Date().toISOString()};

  try {
    client = await MongoClient.connect(url, {useNewUrlParser: true});

    const db = client.db(dbName);
    collections = await db.command({'listCollections': 1});
    collections = getCollectionName(collections);
    // console.log(collections);
    for (let i = 0; i < collections.length; i++) {
      const res = await validateFromSchema(db, path, collections[i]);
      documents[collections[i]] = res;
    }
    await exportResults('./res', documents);
  } catch (error) {
    if (error) {
      throw error;
      documents = error;
    }

  } finally {
    if (client) {
      client.close();
    };
    console.log(documents);
    return documents;
  }

});
