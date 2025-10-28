// src/lib/mongodb.ts

// MongoDB 드라이버에서 필요한 클래스들을 import합니다.
// MongoClient: MongoDB 서버에 연결을 생성하고 관리하는 기본 클라이언트
// Db: 특정 데이터베이스를 나타내는 객체
// ServerApiVersion: 안정적인 API 버전을 사용하기 위해 선언
import { MongoClient, Db, ServerApiVersion } from "mongodb";

// TypeScript에서 'global' 객체의 타입을 확장합니다.
// Next.js는 개발 모드에서 HMR(Hot Module Replacement) 기능을 사용하는데,
// 코드가 변경될 때마다 새 연결이 누적되는 것을 방지하기 위해
// 'global' 객체에 MongoDB 연결(client, db)을 캐싱(저장)합니다.
declare global {
  // 전역 범위에 '_mongo' 변수를 선언합니다.
  // eslint-disable-next-line no-var
  var _mongo: { client: MongoClient | null; db: Db | null } | undefined;
}

// .env 파일에서 MongoDB 연결 문자열(URI)을 가져옵니다.
// '!'는 TypeScript에게 이 값이 'undefined'가 아님을 단언합니다.
// (환경 변수가 설정되어 있음을 확신할 때 사용)
const uri = process.env.MONGODB_URI!;

// .env 파일에서 사용할 데이터베이스 이름을 가져옵니다.
const dbName = process.env.MONGODB_DB1!;

// 전역 '_mongo' 변수가 아직 초기화되지 않았다면,
// (즉, 앱이 처음 시작하는 순간이라면)
// 'client'와 'db'를 null로 설정하여 초기화합니다.
if (!global._mongo) {
  global._mongo = { client: null, db: null };
}

/**
 * MongoDB 데이터베이스에 연결하고 연결된 client와 db 객체를 반환합니다.
 * 이미 활성화된 연결이 'global._mongo'에 캐시되어 있다면, 새 연결을 맺지 않고
 * 기존 연결을 즉시 반환하여 효율성을 높입니다.
 */
export async function connectToDB() {
  // 1. 캐시 확인
  // global._mongo.db에 이미 유효한 연결이 존재하는지 확인합니다.
  // HMR로 인해 파일이 다시 로드되더라도, 이전에 맺은 연결이 있다면...
  if (global._mongo?.db) {
    // ...새 연결을 맺지 않고 캐시된 client와 db 객체를 즉시 반환합니다.
    return { client: global._mongo.client!, db: global._mongo.db! };
  }

  // 2. 새 연결 생성 (캐시가 없는 경우)
  // MongoDB 연결 URI와 서버 API 버전 설정을 사용하여 새 MongoClient 인스턴스를 생성합니다.
  const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1, 
        strict: true, 
        deprecationErrors: true 
      },
  });

  // 3. 연결 시도
  // MongoDB 서버에 비동기적으로 연결을 시도합니다. (네트워크 요청 발생)
  await client.connect();
  
  // 4. DB 객체 획득
  // 연결된 클라이언트에서 '.env'에 지정된 'dbName'을 사용하여 DB 객체를 가져옵니다.
  const db = client.db(dbName);

  // 5. 전역 캐시에 저장
  // 다음 호출 시 재사용할 수 있도록 'global._mongo'에 방금 생성한 'client'와 'db'를 저장합니다.
  global._mongo = { client, db };
  
  // 6. 연결 결과 반환
  // 새로 생성된 'client'와 'db' 객체를 반환합니다.
  return { client, db };
}