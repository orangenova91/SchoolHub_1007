// src/lib/mongodb.ts
import { MongoClient, Db, ServerApiVersion } from "mongodb";

declare global {
  // Next.js hot-reload에서 커넥션 재사용
  // eslint-disable-next-line no-var
  var _mongo: { client: MongoClient | null; db: Db | null } | undefined;
}

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB!;

if (!global._mongo) {
  global._mongo = { client: null, db: null };
}

export async function connectToDB() {
  if (global._mongo?.db) return { client: global._mongo.client!, db: global._mongo.db! };

  const client = new MongoClient(uri, {
    serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
  });

  await client.connect();
  const db = client.db(dbName);

  global._mongo = { client, db };
  return { client, db };
}
