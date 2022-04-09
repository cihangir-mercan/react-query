import Dexie from "dexie";

const db = new Dexie("ReactReduxDB");
db.version(1).stores({texts: "++id"});

db.open();

export default db;
