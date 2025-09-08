"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Plus, Search, Clock, CheckCircle, AlertCircle, Calendar } from "lucide-react"
import { CreateAssignmentDialog } from "./create-assignment-dialog"

export function AssignmentsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [userRole] = useState<"teacher" | "student">("student")

  const assignments = [
    {
      id: 1,
      title: "수학 과제 #3",
      description: "1-3단원 연습문제 풀이",
      className: "수학 1학년",
      dueDate: "2024년 1월 15일",
      dueTime: "23:59",
      points: 100,
      status: "pending",
      submitted: false,
      grade: null,
      createdDate: "2024년 1월 8일",
    },
    {
      id: 2,
      title: "영어 에세이",
      description: "My Dream Job에 대한 200단어 에세이 작성",
      className: "영어 회화",
      dueDate: "2024년 1월 18일",
      dueTime: "23:59",
      points: 50,
      status: "submitted",
      submitted: true,
      grade: 45,
      createdDate: "2024년 1월 5일",
    },
    {
      id: 3,
      title: "과학 실험 보고서",
      description: "물의 상태 변화 실험 결과 정리",
      className: "과학 실험",
      dueDate: "2024년 1월 12일",
      dueTime: "23:59",
      points: 80,
      status: "overdue",
      submitted: false,
      grade: null,
      createdDate: "2024년 1월 1일",
    },
    {
      id: 4,
      title: "역사 발표 준비",
      description: "조선시대 문화에 대한 5분 발표 자료 준비",
      className: "한국사",
      dueDate: "2024년 1월 20일",
      dueTime: "23:59",
      points: 120,
      status: "upcoming",
      submitted: false,
      grade: null,
      createdDate: "2024년 1월 10일",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-green-100 text-green-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "upcoming":
        return "bg-blue-100 text-blue-800"
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
      case "upcoming":
        return "예정"
      default:
        return "알 수 없음"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <CheckCircle className="h-4 w-4" />
      case "overdue":
        return <AlertCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "upcoming":
        return <Calendar className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const filteredAssignments = assignments.filter(
    (assignment) =>
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.className.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const pendingAssignments = filteredAssignments.filter((a) => a.status === "pending" || a.status === "overdue")
  const submittedAssignments = filteredAssignments.filter((a) => a.status === "submitted")
  const upcomingAssignments = filteredAssignments.filter((a) => a.status === "upcoming")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">과제</h1>
          <p className="text-muted-foreground">
            {userRole === "teacher" ? "생성한 과제를 관리하세요" : "제출할 과제를 확인하세요"}
          </p>
        </div>
        {userRole === "teacher" && (
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            과제 생성
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="과제 또는 수업 이름으로 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Assignment tabs */}
      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            대기중 ({pendingAssignments.length})
          </TabsTrigger>
          <TabsTrigger value="submitted" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            제출완료 ({submittedAssignments.length})
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            예정 ({upcomingAssignments.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingAssignments.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">대기 중인 과제가 없습니다</h3>
                <p className="text-muted-foreground">모든 과제를 완료했습니다!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {pendingAssignments.map((assignment) => (
                <Card key={assignment.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{assignment.title}</CardTitle>
                        <CardDescription className="mb-2">{assignment.description}</CardDescription>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{assignment.className}</span>
                          <span>•</span>
                          <span>{assignment.points}점</span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(assignment.status)}>
                        {getStatusIcon(assignment.status)}
                        <span className="ml-1">{getStatusText(assignment.status)}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        마감: {assignment.dueDate} {assignment.dueTime}
                      </div>
                      <Button size="sm" variant={assignment.status === "overdue" ? "destructive" : "default"}>
                        {assignment.status === "overdue" ? "지금 제출" : "과제 보기"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="submitted" className="space-y-4">
          {submittedAssignments.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">제출한 과제가 없습니다</h3>
                <p className="text-muted-foreground">과제를 제출하면 여기에 표시됩니다.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {submittedAssignments.map((assignment) => (
                <Card key={assignment.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{assignment.title}</CardTitle>
                        <CardDescription className="mb-2">{assignment.description}</CardDescription>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{assignment.className}</span>
                          <span>•</span>
                          <span>{assignment.points}점</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(assignment.status)}>
                          {getStatusIcon(assignment.status)}
                          <span className="ml-1">{getStatusText(assignment.status)}</span>
                        </Badge>
                        {assignment.grade && (
                          <div className="text-sm font-medium text-foreground mt-1">
                            {assignment.grade}/{assignment.points}점
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">제출 완료: {assignment.dueDate}</div>
                      <Button size="sm" variant="outline">
                        결과 보기
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingAssignments.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">예정된 과제가 없습니다</h3>
                <p className="text-muted-foreground">새로운 과제가 생성되면 여기에 표시됩니다.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {upcomingAssignments.map((assignment) => (
                <Card key={assignment.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{assignment.title}</CardTitle>
                        <CardDescription className="mb-2">{assignment.description}</CardDescription>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{assignment.className}</span>
                          <span>•</span>
                          <span>{assignment.points}점</span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(assignment.status)}>
                        {getStatusIcon(assignment.status)}
                        <span className="ml-1">{getStatusText(assignment.status)}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">시작 예정: {assignment.dueDate}</div>
                      <Button size="sm" variant="outline">
                        미리보기
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Create assignment dialog */}
      <CreateAssignmentDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </div>
  )
}
