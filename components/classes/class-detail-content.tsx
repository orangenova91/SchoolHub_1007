"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Users, FileText, Settings, Share2, MessageSquare, Clock, BarChart3 } from "lucide-react"

interface ClassDetailContentProps {
  classId: string
}

export function ClassDetailContent({ classId }: ClassDetailContentProps) {
  const [userRole] = useState<"teacher" | "student">("student")

  // Mock data - would come from API
  const classData = {
    id: classId,
    name: "수학 1학년",
    description:
      "기초 수학 개념과 문제 해결을 위한 수업입니다. 학생들이 수학의 기초를 탄탄히 다질 수 있도록 도와드립니다.",
    teacher: "김선생님",
    students: 25,
    color: "bg-blue-500",
    code: "MATH101",
    schedule: "월, 수, 금 09:00",
    isOwner: userRole === "teacher",
  }

  const recentAnnouncements = [
    {
      id: 1,
      title: "다음 주 시험 안내",
      content: "다음 주 수요일에 중간고사가 있습니다. 1-5단원까지 출제됩니다.",
      author: "김선생님",
      date: "2024년 1월 10일",
      time: "14:30",
    },
    {
      id: 2,
      title: "숙제 제출 마감일 연장",
      content: "3번 과제의 제출 마감일이 금요일로 연장되었습니다.",
      author: "김선생님",
      date: "2024년 1월 8일",
      time: "16:20",
    },
  ]

  const upcomingAssignments = [
    {
      id: 1,
      title: "수학 과제 #3",
      dueDate: "2024년 1월 15일",
      status: "pending",
      points: 100,
    },
    {
      id: 2,
      title: "연습 문제 풀이",
      dueDate: "2024년 1월 12일",
      status: "submitted",
      points: 50,
    },
  ]

  const classMembers = [
    { id: 1, name: "김학생", role: "student", avatar: "/placeholder.svg?height=32&width=32" },
    { id: 2, name: "이학생", role: "student", avatar: "/placeholder.svg?height=32&width=32" },
    { id: 3, name: "박학생", role: "student", avatar: "/placeholder.svg?height=32&width=32" },
    { id: 4, name: "김선생님", role: "teacher", avatar: "/placeholder.svg?height=32&width=32" },
  ]

  return (
    <div className="space-y-6">
      {/* Class header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className={`w-16 h-16 rounded-lg ${classData.color} flex items-center justify-center`}>
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">{classData.name}</h1>
              <p className="text-muted-foreground mb-3">{classData.description}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>교사: {classData.teacher}</span>
                <span>•</span>
                <span>학생: {classData.students}명</span>
                <span>•</span>
                <span>수업 시간: {classData.schedule}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{classData.code}</Badge>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              공유
            </Button>
            {classData.isOwner && (
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                설정
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content tabs */}
      <Tabs defaultValue="stream" className="space-y-6">
        <TabsList>
          <TabsTrigger value="stream">스트림</TabsTrigger>
          <TabsTrigger value="assignments">과제</TabsTrigger>
          <TabsTrigger value="people">사람들</TabsTrigger>
          <TabsTrigger value="grades">성적</TabsTrigger>
        </TabsList>

        <TabsContent value="stream" className="space-y-6">
          {/* Recent announcements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                최근 공지사항
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAnnouncements.map((announcement) => (
                <div key={announcement.id} className="border-l-4 border-primary pl-4 py-2">
                  <h3 className="font-medium text-foreground mb-1">{announcement.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{announcement.content}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{announcement.author}</span>
                    <span>•</span>
                    <span>
                      {announcement.date} {announcement.time}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming assignments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                다가오는 과제
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium text-foreground">{assignment.title}</h4>
                      <p className="text-sm text-muted-foreground">마감: {assignment.dueDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{assignment.points}점</span>
                    <Badge variant={assignment.status === "submitted" ? "default" : "secondary"}>
                      {assignment.status === "submitted" ? "제출완료" : "대기중"}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments">
          <Card>
            <CardHeader>
              <CardTitle>과제 목록</CardTitle>
              <CardDescription>이 수업의 모든 과제를 확인할 수 있습니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">과제 시스템이 구현되어 있습니다.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="people">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                수업 참여자 ({classMembers.length}명)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {classMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{member.name}</p>
                    </div>
                    <Badge variant={member.role === "teacher" ? "default" : "secondary"}>
                      {member.role === "teacher" ? "교사" : "학생"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grades">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                성적 관리
              </CardTitle>
              <CardDescription>과제 및 시험 성적을 확인할 수 있습니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">성적 관리 시스템</h3>
                <p className="text-muted-foreground mb-4">성적 페이지에서 더 자세한 정보를 확인하세요.</p>
                <Button>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  성적 페이지로 이동
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
