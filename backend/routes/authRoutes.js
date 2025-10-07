// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// JWT 토큰을 생성하는 헬퍼 함수
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // 토큰 만료 기간 설정
    });
};

// @route POST /api/auth/login
// @desc 사용자 로그인 및 JWT 토큰 발급
router.post('/login', async (req, res) => {
    // 1. 요청 본문(Body)에서 데이터 추출
    const { email, password, userType } = req.body;

    try {
        // 2. 이메일과 userType으로 사용자 찾기
        const user = await User.findOne({ email, userType });

        if (!user) {
            // 사용자가 존재하지 않거나 userType이 일치하지 않을 경우
            return res.status(401).json({ message: '자격 증명이 유효하지 않습니다.' });
        }

        // 3. 비밀번호 검증
        if (await user.matchPassword(password)) {
            // 비밀번호 일치 시
            res.json({
                _id: user._id,
                email: user.email,
                userType: user.userType,
                token: generateToken(user._id), // ★ JWT 토큰 발급
                message: '로그인 성공'
            });
        } else {
            // 비밀번호 불일치 시
            res.status(401).json({ message: '자격 증명이 유효하지 않습니다.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

module.exports = router;