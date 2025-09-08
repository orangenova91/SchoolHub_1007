"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, File, ImageIcon, FileText, Video } from "lucide-react"

interface FileUploadProps {
  onFilesSelected?: (files: File[]) => void
  maxFiles?: number
  maxSize?: number // in MB
  acceptedTypes?: string[]
  className?: string
}

export function FileUpload({
  onFilesSelected,
  maxFiles = 5,
  maxSize = 10,
  acceptedTypes = ["image/*", "application/pdf", ".doc", ".docx", ".txt"],
  className = "",
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return <ImageIcon className="h-4 w-4" />
    if (file.type.startsWith("video/")) return <Video className="h-4 w-4" />
    if (file.type.includes("pdf") || file.type.includes("document")) return <FileText className="h-4 w-4" />
    return <File className="h-4 w-4" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleFiles = useCallback(
    (files: FileList) => {
      const fileArray = Array.from(files)
      const validFiles = fileArray.filter((file) => {
        // Check file size
        if (file.size > maxSize * 1024 * 1024) {
          alert(`파일 "${file.name}"이 너무 큽니다. 최대 ${maxSize}MB까지 업로드 가능합니다.`)
          return false
        }
        return true
      })

      if (uploadedFiles.length + validFiles.length > maxFiles) {
        alert(`최대 ${maxFiles}개의 파일만 업로드할 수 있습니다.`)
        return
      }

      const newFiles = [...uploadedFiles, ...validFiles]
      setUploadedFiles(newFiles)

      // Simulate upload progress
      validFiles.forEach((file) => {
        const fileName = file.name
        let progress = 0
        const interval = setInterval(() => {
          progress += Math.random() * 30
          if (progress >= 100) {
            progress = 100
            clearInterval(interval)
          }
          setUploadProgress((prev) => ({ ...prev, [fileName]: progress }))
        }, 200)
      })

      onFilesSelected?.(newFiles)
    },
    [uploadedFiles, maxFiles, maxSize, onFilesSelected],
  )

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFiles(e.dataTransfer.files)
      }
    },
    [handleFiles],
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      if (e.target.files && e.target.files[0]) {
        handleFiles(e.target.files)
      }
    },
    [handleFiles],
  )

  const removeFile = (fileName: string) => {
    const newFiles = uploadedFiles.filter((file) => file.name !== fileName)
    setUploadedFiles(newFiles)
    setUploadProgress((prev) => {
      const newProgress = { ...prev }
      delete newProgress[fileName]
      return newProgress
    })
    onFilesSelected?.(newFiles)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept={acceptedTypes.join(",")}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground mb-2">파일을 드래그하거나 클릭하여 업로드하세요</p>
        <p className="text-xs text-muted-foreground mb-4">
          최대 {maxFiles}개 파일, 각각 {maxSize}MB 이하
        </p>
        <Button variant="outline" size="sm">
          파일 선택
        </Button>
      </div>

      {/* Uploaded files list */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">업로드된 파일 ({uploadedFiles.length})</h4>
          {uploadedFiles.map((file) => (
            <Card key={file.name}>
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className="text-muted-foreground">{getFileIcon(file)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                    {uploadProgress[file.name] !== undefined && uploadProgress[file.name] < 100 && (
                      <Progress value={uploadProgress[file.name]} className="mt-1 h-1" />
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.name)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
