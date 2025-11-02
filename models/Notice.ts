import mongoose, { Document, Schema, Model } from 'mongoose';

// 1. 문서(Document) 인터페이스 정의
export interface INotice extends Document {
  title: string;
  content: string;
  author: string; // MVP. 추후 IUser 인터페이스와 연결
  views: number;
  createdAt: Date;
}

// 2. 스키마(Schema) 정의
const NoticeSchema: Schema<INotice> = new Schema({
  title: {
    type: String,
    required: [true, '제목을 입력해주세요.'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, '내용을 입력해주세요.'],
  },
  author: {
    type: String,
    required: [true, '작성자를 입력해주세요.'],
  },
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 3. 모델(Model) 내보내기
// 이미 컴파일된 모델이 있는지 확인하고, 없으면 새로 만듭니다.
// mongoose.models.Notice가 이미 Model<INotice> 타입임을 알려줍니다.
const Notice: Model<INotice> = mongoose.models.Notice || mongoose.model<INotice>('Notice', NoticeSchema);

export default Notice;