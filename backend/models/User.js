// models/User.js (MongoDB Mongoose 예시)
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }, // 이메일은 필수이며 중복 불가
    password: { type: String, required: true }, // 해시된 비밀번호 저장
    userType: { 
        type: String, 
        enum: ['student', 'teacher'], // 반드시 학생 또는 교사 중 하나여야 함
        default: 'student', 
        required: true 
    },
    // 추가 필드: 이름, 소속 학교/클래스 등
});

// **★ 중요: 비밀번호 저장 전에 해시 처리 ★**
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// 비밀번호 비교 메소드 추가
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);