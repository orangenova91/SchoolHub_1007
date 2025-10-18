// testHash.js
const bcrypt = require('bcryptjs');

async function generateHash(password) {
    // salt rounds는 User.js에서 사용한 것과 동일하게 10으로 설정
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log(`Original Password: ${password}`);
    console.log(`Generated Hash: ${hash}`);
    return hash;
}

// 사용할 비밀번호를 넣어주세요.
generateHash('password123');