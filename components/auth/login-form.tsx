"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Users, GraduationCap } from "lucide-react"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState<"student" | "teacher">("student")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      // TODO: Implement actual authentication
      window.location.href = "/dashboard"
    }, 1000)
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl">로그인</CardTitle>
        <CardDescription>계정에 로그인하여 학습을 시작하세요</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={userType} onValueChange={(value) => setUserType(value as "student" | "teacher")}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="student" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              학생
            </TabsTrigger>
            <TabsTrigger value="teacher" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              교사
            </TabsTrigger>
          </TabsList>

          <TabsContent value="student">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="student-email">이일</Label>
                <Input id="student-email" type="email" placeholder="student@school.edu" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="student-password">비밀번호</Label>
                <Input id="student-password" type="password" required />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "로그인 중..." : "학생으로 로그인"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="teacher">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="teacher-email">이메일</Label>
                <Input id="teacher-email" type="email" placeholder="teacher@school.edu" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teacher-password">비밀번호</Label>
                <Input id="teacher-password" type="password" required />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "로그인 중..." : "교사로 로그인"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          계정이 없으신가요? <button className="text-primary hover:underline">회원가입</button>
        </div>
      </CardContent>
    </Card>
  )
}
