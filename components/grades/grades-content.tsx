"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Search, TrendingUp, Award, BookOpen, Users, Download } from "lucide-react"

export function GradesContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClass, setSelectedClass] = useState("all")
  const [userRole] = useState<"teacher" | "student">("student")

  const classes = [
    { id: "1", name: "수학 1학년" },
    { id: "2", name: "영어 회화" },
    { id: "3", name: "과학 실험" },
  ]

  const studentGrades = [
    {
      id: "1",
      className: "수학 1학년",
      assignments: [
        { name: "수학 과제 #1", score: 85, maxScore: 100, date: "2024-01-05" },
        { name: "수학 과제 #2", score: 92, maxScore: 100, date: "2024-01-10" },
        { name: "중간고사", score: 88, maxScore: 100, date: "2024-01-15" },
      ],
      average: 88.3,
      grade: "B+",
    },
    {
      id: "2",
      className: "영어 회화",
      assignments: [
        { name: "영어 에세이", score: 45, maxScore: 50, date: "2024-01-08" },
        { name: "발표 평가", score: 38, maxScore: 40, date: "2024-01-12" },
        { name: "듣기 평가", score: 28, maxScore: 30, date: "2024-01-16" },
      ],
      average: 92.5,
      grade: "A",
    },
    {
      id: "3",
      className: "과학 실험",
      assignments: [
        { name: "실험 보고서 #1", score: 72, maxScore: 80, date: "2024-01-06" },
        { name: "실험 보고서 #2", score: 75, maxScore: 80, date: "2024-01-13" },
      ],
      average: 91.9,
      grade: "A",
    },
  ]

  const teacherGrades = [
    {
      studentName: "김학생",
      studentId: "2024001",
      assignments: {
        "수학 과제 #1": 85,
        "수학 과제 #2": 92,
        중간고사: 88,
      },
      average: 88.3,
      grade: "B+",
    },
    {
      studentName: "이학생",
      studentId: "2024002",
      assignments: {
        "수학 과제 #1": 78,
        "수학 과제 #2": 85,
        중간고사: 82,
      },
      average: 81.7,
      grade: "B",
    },
    {
      studentName: "박학생",
      studentId: "2024003",
      assignments: {
        "수학 과제 #1": 95,
        "수학 과제 #2": 98,
        중간고사: 94,
      },
      average: 95.7,
      grade: "A+",
    },
  ]

  const gradeDistribution = [
    { grade: "A+", count: 3, percentage: 15 },
    { grade: "A", count: 5, percentage: 25 },
    { grade: "B+", count: 7, percentage: 35 },
    { grade: "B", count: 3, percentage: 15 },
    { grade: "C+", count: 2, percentage: 10 },
  ]

  const performanceData = [
    { assignment: "과제 #1", average: 82.5 },
    { assignment: "과제 #2", average: 85.2 },
    { assignment: "과제 #3", average: 88.1 },
    { assignment: "중간고사", average: 84.7 },
  ]

  const COLORS = ["#0891b2", "#d97706", "#10b981", "#ef4444", "#8b5cf6"]

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+":
        return "bg-green-100 text-green-800"
      case "A":
        return "bg-blue-100 text-blue-800"
      case "B+":
        return "bg-cyan-100 text-cyan-800"
      case "B":
        return "bg-yellow-100 text-yellow-800"
      case "C+":
        return "bg-orange-100 text-orange-800"
      case "C":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const overallAverage = studentGrades.reduce((sum, cls) => sum + cls.average, 0) / studentGrades.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">성적 관리</h1>
          <p className="text-muted-foreground">
            {userRole === "teacher"
              ? "학생들의 성적을 관리하고 분석하세요"
              : "내 성적을 확인하고 학습 진도를 파악하세요"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            성적표 다운로드
          </Button>
          {userRole === "teacher" && (
            <Button>
              <Award className="h-4 w-4 mr-2" />
              성적 입력
            </Button>
          )}
        </div>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={userRole === "teacher" ? "학생 이름으로 검색..." : "과제 이름으로 검색..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="수업 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 수업</SelectItem>
            {classes.map((cls) => (
              <SelectItem key={cls.id} value={cls.id}>
                {cls.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Student view */}
      {userRole === "student" && (
        <>
          {/* Overview cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">전체 평균</p>
                    <p className="text-xl font-semibold">{overallAverage.toFixed(1)}점</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Award className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">최고 성적</p>
                    <p className="text-xl font-semibold">A</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">수강 과목</p>
                    <p className="text-xl font-semibold">{studentGrades.length}개</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">완료 과제</p>
                    <p className="text-xl font-semibold">
                      {studentGrades.reduce((sum, cls) => sum + cls.assignments.length, 0)}개
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Class grades */}
          <div className="grid gap-6">
            {studentGrades.map((classGrade) => (
              <Card key={classGrade.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{classGrade.className}</CardTitle>
                      <CardDescription>평균: {classGrade.average.toFixed(1)}점</CardDescription>
                    </div>
                    <Badge className={getGradeColor(classGrade.grade)}>{classGrade.grade}</Badge>
                  </div>
                  <Progress value={classGrade.average} className="mt-2" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {classGrade.assignments.map((assignment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border border-border rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium text-foreground">{assignment.name}</h4>
                          <p className="text-sm text-muted-foreground">{assignment.date}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-foreground">
                            {assignment.score}/{assignment.maxScore}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {((assignment.score / assignment.maxScore) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Teacher view */}
      {userRole === "teacher" && (
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="students">학생별 성적</TabsTrigger>
            <TabsTrigger value="analytics">분석</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">총 학생 수</p>
                      <p className="text-xl font-semibold">{teacherGrades.length}명</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">반 평균</p>
                      <p className="text-xl font-semibold">
                        {(
                          teacherGrades.reduce((sum, student) => sum + student.average, 0) / teacherGrades.length
                        ).toFixed(1)}
                        점
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Award className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">A 등급 이상</p>
                      <p className="text-xl font-semibold">
                        {teacherGrades.filter((s) => s.grade.startsWith("A")).length}명
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <BookOpen className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">과제 수</p>
                      <p className="text-xl font-semibold">3개</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance chart */}
            <Card>
              <CardHeader>
                <CardTitle>과제별 평균 성적</CardTitle>
                <CardDescription>각 과제의 반 평균 점수입니다</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="assignment" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="average" fill="#0891b2" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>학생별 성적 현황</CardTitle>
                <CardDescription>수학 1학년 학생들의 성적을 확인하고 관리하세요</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>학생명</TableHead>
                      <TableHead>학번</TableHead>
                      <TableHead>수학 과제 #1</TableHead>
                      <TableHead>수학 과제 #2</TableHead>
                      <TableHead>중간고사</TableHead>
                      <TableHead>평균</TableHead>
                      <TableHead>등급</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teacherGrades.map((student) => (
                      <TableRow key={student.studentId}>
                        <TableCell className="font-medium">{student.studentName}</TableCell>
                        <TableCell>{student.studentId}</TableCell>
                        <TableCell>{student.assignments["수학 과제 #1"]}</TableCell>
                        <TableCell>{student.assignments["수학 과제 #2"]}</TableCell>
                        <TableCell>{student.assignments["중간고사"]}</TableCell>
                        <TableCell>{student.average.toFixed(1)}</TableCell>
                        <TableCell>
                          <Badge className={getGradeColor(student.grade)}>{student.grade}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Grade distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>성적 분포</CardTitle>
                  <CardDescription>학생들의 등급별 분포를 확인하세요</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={gradeDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ grade, percentage }) => `${grade} (${percentage}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {gradeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Grade statistics */}
              <Card>
                <CardHeader>
                  <CardTitle>성적 통계</CardTitle>
                  <CardDescription>상세한 성적 분석 정보입니다</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {gradeDistribution.map((grade, index) => (
                    <div key={grade.grade} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                        <span className="font-medium">{grade.grade} 등급</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{grade.count}명</span>
                        <Progress value={grade.percentage} className="w-20" />
                        <span className="text-sm font-medium">{grade.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Performance insights */}
            <Card>
              <CardHeader>
                <CardTitle>성적 분석 인사이트</CardTitle>
                <CardDescription>AI가 분석한 학급 성적 동향입니다</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">긍정적 동향</h4>
                  <p className="text-sm text-green-700">
                    전체적으로 과제 점수가 상승하는 추세입니다. 특히 수학 과제 #2에서 평균이 2.7점 향상되었습니다.
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">주의 필요</h4>
                  <p className="text-sm text-yellow-700">
                    중간고사 평균이 과제 평균보다 낮습니다. 시험 준비에 더 많은 지원이 필요할 수 있습니다.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">추천 사항</h4>
                  <p className="text-sm text-blue-700">
                    C+ 이하 학생들을 위한 추가 보충 수업이나 개별 지도를 고려해보세요.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
