"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface JoinClassDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function JoinClassDialog({ open, onOpenChange }: JoinClassDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [classCode, setClassCode] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      onOpenChange(false)
      setClassCode("")
      // TODO: Add success toast
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>수업 참여</DialogTitle>
          <DialogDescription>교사로부터 받은 수업 코드를 입력하여 수업에 참여하세요.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="class-code">수업 코드 *</Label>
            <Input
              id="class-code"
              placeholder="예: MATH101"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value.toUpperCase())}
              required
              className="text-center text-lg font-mono"
            />
            <p className="text-xs text-muted-foreground">수업 코드는 대소문자를 구분하지 않습니다.</p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              취소
            </Button>
            <Button type="submit" disabled={isLoading || !classCode}>
              {isLoading ? "참여 중..." : "수업 참여"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
