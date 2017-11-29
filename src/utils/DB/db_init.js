import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';
import lodashId from 'lodash-id';

const adapter = new LocalStorage('JanusOw');
const db = low(adapter);

db.defaults({ users: [], groups: [], settings: { autoLoad: true, preload: false, language: 'en' } })
  .write();

db._.mixin(lodashId);

export default db;
