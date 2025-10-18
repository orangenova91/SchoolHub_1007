// server.js (예시)
require('dotenv').config(); // 환경 변수 로드

const express = require('express');
const mongoose = require('mongoose'); // MongoDB 예시

const app = express();
const PORT = process.env.PORT || 3001; // 프론트엔드와 포트 충돌 방지를 위해 3001 사용

// 미들웨어 설정
app.use(express.json()); // 요청 본문(req.body)을 JSON 형태로 파싱

// TODO: CORS 설정 (프론트엔드와 통신을 위해 필수)
// const cors = require('cors');
// app.use(cors({ origin: 'http://localhost:3000' })); // Next.js 개발 포트 허용

// DB 연결
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('DB connection error:', err));

// 라우터 설정 (인증 API를 연결할 위치)
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});