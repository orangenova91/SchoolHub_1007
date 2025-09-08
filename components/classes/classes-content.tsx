"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BookOpen, Plus, Search, Users, Calendar, MoreVertical } from "lucide-react"
import { CreateClassDialog } from "./create-class-dialog"
import { JoinClassDialog } from "./join-class-dialog"

export function ClassesContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showJoinDialog, setShowJoinDialog] = useState(false)
  const [userRole] = useState<"teacher" | "student">("student") // This would come from auth context

  const classes = [
    {
      id: 1,
      name: "수학 1학년",
      description: "기초 수학 개념과 문제 해결",
      teacher: "김선생님",
      students: 25,
      color: "bg-blue-500",
      code: "MATH101",
      schedule: "월, 수, 금 09:00",
      isOwner: false,
    },
    {
      id: 2,
      name: "영어 회화",
      description: "실용적인 영어 회화 연습",
      teacher: "이선생님",
      students: 20,
      color: "bg-green-500",
      code: "ENG201",
      schedule: "화, 목 14:00",
      isOwner: false,
    },
    {
      id: 3,
      name: "과학 실험",
      description: "실험을 통한 과학 원리 학습",
      teacher: "박선생님",
      students: 18,
      color: "bg-purple-500",
      code: "SCI301",
      schedule: "수 15:00",
      isOwner: userRole === "teacher",
    },
  ]

  const filteredClasses = classes.filter(
    (classItem) =>
      classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classItem.teacher.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">내 수업</h1>
          <p className="text-muted-foreground">
            {userRole === "teacher" ? "관리 중인 수업들입니다" : "참여 중인 수업들입니다"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowJoinDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            수업 참여
          </Button>
          {userRole === "teacher" && (
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              수업 생성
            </Button>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="수업 또는 교사 이름으로 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Classes grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((classItem) => (
          <Card key={classItem.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 rounded-lg ${classItem.color} flex items-center justify-center mb-3`}>
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              <CardTitle className="text-lg">{classItem.name}</CardTitle>
              <CardDescription className="line-clamp-2">{classItem.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">교사</span>
                <span className="font-medium">{classItem.teacher}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">학생 수</span>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{classItem.students}명</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">수업 시간</span>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span className="text-xs">{classItem.schedule}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Badge variant="secondary" className="text-xs">
                  {classItem.code}
                </Badge>
                {classItem.isOwner && (
                  <Badge variant="default" className="text-xs">
                    관리자
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClasses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">수업이 없습니다</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? "검색 결과가 없습니다" : "새로운 수업을 생성하거나 참여해보세요"}
          </p>
          <div className="flex justify-center gap-2">
            <Button variant="outline" onClick={() => setShowJoinDialog(true)}>
              수업 참여
            </Button>
            {userRole === "teacher" && <Button onClick={() => setShowCreateDialog(true)}>수업 생성</Button>}
          </div>
        </div>
      )}

      {/* Dialogs */}
      <CreateClassDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
      <JoinClassDialog open={showJoinDialog} onOpenChange={setShowJoinDialog} />
    </div>
  )
}
