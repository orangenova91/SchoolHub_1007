import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, FileText, Clock, Users, Plus } from "lucide-react"

export function People() {
  const recentClasses = [
    {
      id: 1,
      name: "수학 1111학년",
      teacher: "김선생님",
      students: 25,
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "영어 회화",
      teacher: "이선생님",
      students: 20,
      color: "bg-green-500",
    },
    {
      id: 3,
      name: "과학 실험",
      teacher: "박선생님",
      students: 18,
      color: "bg-purple-500",
    },
  ]

  const upcomingAssignments = [
    {
      id: 1,
      title: "수학 과제 #3",
      class: "수학 1학년",
      dueDate: "2024년 1월 15일",
      status: "pending",
    },
    {
      id: 2,
      title: "영어 에세이",
      class: "영어 회화",
      dueDate: "2024년 1월 18일",
      status: "submitted",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">안녕하세요, 김학생님!</h1>
        <p className="text-muted-foreground">오늘도 즐거운 학습 되세요. 새로운 과제 2개가 있습니다.</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">수업</p>
                <p className="text-xl font-semibold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <FileText className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">과제</p>
                <p className="text-xl font-semibold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">완료율</p>
                <p className="text-xl font-semibold">85%</p>
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
                <p className="text-sm text-muted-foreground">동료</p>
                <p className="text-xl font-semibold">63</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent classes */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>내 수업</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                수업 참여
              </Button>
            </div>
            <CardDescription>참여 중인 수업 목록입니다</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentClasses.map((classItem) => (
              <div
                key={classItem.id}
                className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-lg ${classItem.color} flex items-center justify-center`}>
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{classItem.name}</h3>
                  <p className="text-sm text-muted-foreground">{classItem.teacher}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{classItem.students}명</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming assignments */}
        <Card>
          <CardHeader>
            <CardTitle>다가오는 과제</CardTitle>
            <CardDescription>제출 예정인 과제들입니다</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAssignments.map((assignment) => (
              <div key={assignment.id} className="flex items-center gap-4 p-3 rounded-lg border border-border">
                <div className="p-2 bg-muted rounded-lg">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{assignment.title}</h3>
                  <p className="text-sm text-muted-foreground">{assignment.class}</p>
                </div>
                <div className="text-right">
                  <Badge variant={assignment.status === "submitted" ? "default" : "secondary"}>
                    {assignment.status === "submitted" ? "제출완료" : "대기중"}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{assignment.dueDate}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
