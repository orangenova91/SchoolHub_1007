"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface CreateClassDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateClassDialog({ open, onOpenChange }: CreateClassDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    subject: "",
    grade: "",
    schedule: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      onOpenChange(false)
      setFormData({
        name: "",
        description: "",
        subject: "",
        grade: "",
        schedule: "",
      })
      // TODO: Add success toast
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>새 수업 생성</DialogTitle>
          <DialogDescription>새로운 수업을 생성하고 학생들을 초대하세요.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="class-name">수업 이름 *</Label>
            <Input
              id="class-name"
              placeholder="예: 수학 1학년"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="class-description">수업 설명</Label>
            <Textarea
              id="class-description"
              placeholder="수업에 대한 간단한 설명을 입력하세요"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">과목</Label>
              <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="과목 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="math">수학</SelectItem>
                  <SelectItem value="english">영어</SelectItem>
                  <SelectItem value="science">과학</SelectItem>
                  <SelectItem value="korean">국어</SelectItem>
                  <SelectItem value="social">사회</SelectItem>
                  <SelectItem value="art">미술</SelectItem>
                  <SelectItem value="music">음악</SelectItem>
                  <SelectItem value="pe">체육</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="grade">학년</Label>
              <Select value={formData.grade} onValueChange={(value) => setFormData({ ...formData, grade: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="학년 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1학년</SelectItem>
                  <SelectItem value="2">2학년</SelectItem>
                  <SelectItem value="3">3학년</SelectItem>
                  <SelectItem value="4">4학년</SelectItem>
                  <SelectItem value="5">5학년</SelectItem>
                  <SelectItem value="6">6학년</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="schedule">수업 시간</Label>
            <Input
              id="schedule"
              placeholder="예: 월, 수, 금 09:00"
              value={formData.schedule}
              onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              취소
            </Button>
            <Button type="submit" disabled={isLoading || !formData.name}>
              {isLoading ? "생성 중..." : "수업 생성"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
