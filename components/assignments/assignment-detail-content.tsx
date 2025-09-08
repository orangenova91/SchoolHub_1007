"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { FileText, Clock, CheckCircle, Upload, Download, MessageSquare, ArrowLeft } from "lucide-react"
import { FileUpload } from "@/components/ui/file-upload"

interface AssignmentDetailContentProps {
  assignmentId: string
}

export function AssignmentDetailContent({ assignmentId }: AssignmentDetailContentProps) {
  const [userRole] = useState<"teacher" | "student">("student")
  const [submissionText, setSubmissionText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock data - would come from API
  const assignment = {
    id: assignmentId,
    title: "수학 과제 #3",
    description: "1-3단원 연습문제 풀이",
    className: "수학 1학년",
    teacher: "김선생님",
    dueDate: "2024년 1월 15일",
    dueTime: "23:59",
    points: 100,
    status: "pending",
    submitted: false,
    grade: null,
    createdDate: "2024년 1월 8일",
    instructions: `다음 문제들을 풀어서 제출하세요:

1. 교과서 45-48페이지 연습문제 1-10번
2. 각 문제의 풀이 과정을 자세히 작성하세요
3. 답만 적지 말고 어떻게 풀었는지 설명하세요
4. 모르는 문제가 있으면 어디까지 풀었는지 적어주세요

제출 방법:
- 손으로 쓴 답안지를 사진으로 찍어서 업로드하거나
- 아래 텍스트 박스에 직접 입력해서 제출하세요`,
    attachments: [
      { id: 1, name: "연습문제_해설.pdf", size: "2.3 MB" },
      { id: 2, name: "참고자료.docx", size: "1.1 MB" },
    ],
  }

  const submissions = [
    {
      id: 1,
      studentName: "김학생",
      submittedAt: "2024년 1월 14일 15:30",
      grade: 85,
      feedback: "잘 풀었습니다. 다만 3번 문제에서 계산 실수가 있었네요.",
      files: ["답안지_김학생.jpg"],
    },
    {
      id: 2,
      studentName: "이학생",
      submittedAt: "2024년 1월 15일 20:15",
      grade: null,
      feedback: null,
      files: ["수학과제_이학생.pdf"],
    },
  ]

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      // TODO: Add success toast
    }, 1000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-green-100 text-green-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "submitted":
        return "제출완료"
      case "overdue":
        return "기한초과"
      case "pending":
        return "대기중"
      default:
        return "알 수 없음"
    }
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Button variant="ghost" className="mb-4" onClick={() => window.history.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        과제 목록으로
      </Button>

      {/* Assignment header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2">{assignment.title}</CardTitle>
              <CardDescription className="text-base mb-4">{assignment.description}</CardDescription>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{assignment.className}</span>
                <span>•</span>
                <span>{assignment.teacher}</span>
                <span>•</span>
                <span>{assignment.points}점</span>
              </div>
            </div>
            <Badge className={getStatusColor(assignment.status)}>
              {assignment.status === "submitted" ? (
                <CheckCircle className="h-4 w-4 mr-1" />
              ) : (
                <Clock className="h-4 w-4 mr-1" />
              )}
              {getStatusText(assignment.status)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium text-foreground">마감일</p>
              <p className="text-sm text-muted-foreground">
                {assignment.dueDate} {assignment.dueTime}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium text-foreground">생성일</p>
              <p className="text-sm text-muted-foreground">{assignment.createdDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assignment instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            과제 지시사항
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="whitespace-pre-wrap text-foreground">{assignment.instructions}</div>

          {assignment.attachments.length > 0 && (
            <>
              <Separator className="my-4" />
              <div>
                <h4 className="font-medium text-foreground mb-3">첨부 파일</h4>
                <div className="space-y-2">
                  {assignment.attachments.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">{file.name}</p>
                          <p className="text-sm text-muted-foreground">{file.size}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        다운로드
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Student submission section */}
      {userRole === "student" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              과제 제출
            </CardTitle>
            <CardDescription>
              {assignment.submitted ? "과제를 이미 제출했습니다. 수정하려면 다시 제출하세요." : "과제를 제출하세요."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="submission">답안 작성</Label>
              <Textarea
                id="submission"
                placeholder="여기에 답안을 작성하거나 파일을 업로드하세요..."
                value={submissionText}
                onChange={(e) => setSubmissionText(e.target.value)}
                rows={8}
              />
            </div>

            <FileUpload
              onFilesSelected={(files) => console.log("Assignment files:", files)}
              maxFiles={3}
              maxSize={5}
              acceptedTypes={["image/*", "application/pdf", ".doc", ".docx", ".txt"]}
            />

            <div className="flex justify-end gap-2">
              <Button variant="outline">임시저장</Button>
              <Button onClick={handleSubmit} disabled={isSubmitting || !submissionText.trim()}>
                {isSubmitting ? "제출 중..." : assignment.submitted ? "다시 제출" : "제출하기"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Teacher grading section */}
      {userRole === "teacher" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              학생 제출물 ({submissions.length}개)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {submissions.map((submission) => (
              <div key={submission.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-foreground">{submission.studentName}</h4>
                    <p className="text-sm text-muted-foreground">제출일: {submission.submittedAt}</p>
                  </div>
                  <div className="text-right">
                    {submission.grade ? (
                      <div className="text-lg font-semibold text-foreground">
                        {submission.grade}/{assignment.points}점
                      </div>
                    ) : (
                      <Badge variant="secondary">채점 대기</Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  {submission.files.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>{file}</span>
                      <Button size="sm" variant="ghost">
                        보기
                      </Button>
                    </div>
                  ))}
                </div>

                {submission.feedback && (
                  <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-foreground">{submission.feedback}</p>
                  </div>
                )}

                <div className="flex justify-end gap-2 mt-3">
                  <Button size="sm" variant="outline">
                    피드백 작성
                  </Button>
                  <Button size="sm">채점하기</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
