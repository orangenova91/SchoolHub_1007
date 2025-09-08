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

interface CreateAssignmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateAssignmentDialog({ open, onOpenChange }: CreateAssignmentDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    classId: "",
    points: "",
    dueDate: "",
    dueTime: "23:59",
    instructions: "",
  })

  const classes = [
    { id: "1", name: "수학 1학년" },
    { id: "2", name: "영어 회화" },
    { id: "3", name: "과학 실험" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      onOpenChange(false)
      setFormData({
        title: "",
        description: "",
        classId: "",
        points: "",
        dueDate: "",
        dueTime: "23:59",
        instructions: "",
      })
      // TODO: Add success toast
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>새 과제 생성</DialogTitle>
          <DialogDescription>학생들에게 새로운 과제를 배정하세요.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="assignment-title">과제 제목 *</Label>
            <Input
              id="assignment-title"
              placeholder="예: 수학 과제 #4"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignment-description">간단한 설명</Label>
            <Input
              id="assignment-description"
              placeholder="과제에 대한 간단한 설명"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="class-select">수업 선택 *</Label>
              <Select value={formData.classId} onValueChange={(value) => setFormData({ ...formData, classId: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="수업 선택" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((classItem) => (
                    <SelectItem key={classItem.id} value={classItem.id}>
                      {classItem.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="points">배점 *</Label>
              <Input
                id="points"
                type="number"
                placeholder="100"
                min="1"
                max="1000"
                value={formData.points}
                onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="due-date">마감 날짜 *</Label>
              <Input
                id="due-date"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="due-time">마감 시간</Label>
              <Input
                id="due-time"
                type="time"
                value={formData.dueTime}
                onChange={(e) => setFormData({ ...formData, dueTime: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">상세 지시사항</Label>
            <Textarea
              id="instructions"
              placeholder="과제에 대한 상세한 지시사항을 입력하세요..."
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              rows={4}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              취소
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !formData.title || !formData.classId || !formData.points || !formData.dueDate}
            >
              {isLoading ? "생성 중..." : "과제 생성"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
