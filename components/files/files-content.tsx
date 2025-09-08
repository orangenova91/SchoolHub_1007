"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUpload } from "@/components/ui/file-upload"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  File,
  Folder,
  Upload,
  Search,
  MoreVertical,
  Download,
  Share2,
  Trash2,
  Eye,
  ImageIcon,
  FileText,
  Video,
} from "lucide-react"

export function FilesContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [showUploadDialog, setShowUploadDialog] = useState(false)

  const files = [
    {
      id: "1",
      name: "수학_과제_해답.pdf",
      type: "pdf",
      size: "2.3 MB",
      uploadedAt: "2024년 1월 10일",
      uploadedBy: "김선생님",
      className: "수학 1학년",
      shared: true,
      downloads: 15,
    },
    {
      id: "2",
      name: "영어_발표자료.pptx",
      type: "presentation",
      size: "5.1 MB",
      uploadedAt: "2024년 1월 8일",
      uploadedBy: "이선생님",
      className: "영어 회화",
      shared: false,
      downloads: 3,
    },
    {
      id: "3",
      name: "실험_사진.jpg",
      type: "image",
      size: "1.8 MB",
      uploadedAt: "2024년 1월 5일",
      uploadedBy: "김학생",
      className: "과학 실험",
      shared: true,
      downloads: 8,
    },
    {
      id: "4",
      name: "과제_제출.docx",
      type: "document",
      size: "856 KB",
      uploadedAt: "2024년 1월 3일",
      uploadedBy: "박학생",
      className: "국어",
      shared: false,
      downloads: 1,
    },
  ]

  const folders = [
    {
      id: "1",
      name: "수학 1학년",
      fileCount: 12,
      lastModified: "2024년 1월 10일",
    },
    {
      id: "2",
      name: "영어 회화",
      fileCount: 8,
      lastModified: "2024년 1월 8일",
    },
    {
      id: "3",
      name: "과학 실험",
      fileCount: 15,
      lastModified: "2024년 1월 5일",
    },
  ]

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-5 w-5 text-blue-500" />
      case "pdf":
      case "document":
        return <FileText className="h-5 w-5 text-red-500" />
      case "video":
        return <Video className="h-5 w-5 text-purple-500" />
      case "presentation":
        return <FileText className="h-5 w-5 text-orange-500" />
      default:
        return <File className="h-5 w-5 text-gray-500" />
    }
  }

  const filteredFiles = files.filter(
    (file) =>
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.className.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const myFiles = filteredFiles.filter((file) => file.uploadedBy === "김학생")
  const sharedFiles = filteredFiles.filter((file) => file.shared && file.uploadedBy !== "김학생")

  const handleFilesSelected = (files: File[]) => {
    console.log("Selected files:", files)
    // TODO: Handle file upload
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">파일</h1>
          <p className="text-muted-foreground">수업 자료와 과제 파일을 관리하세요</p>
        </div>
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              파일 업로드
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>파일 업로드</DialogTitle>
              <DialogDescription>수업에서 사용할 파일을 업로드하세요.</DialogDescription>
            </DialogHeader>
            <FileUpload onFilesSelected={handleFilesSelected} />
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                취소
              </Button>
              <Button onClick={() => setShowUploadDialog(false)}>업로드 완료</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="파일 또는 수업 이름으로 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <File className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">전체 파일</p>
                <p className="text-xl font-semibold">{files.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Share2 className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">공유 파일</p>
                <p className="text-xl font-semibold">{files.filter((f) => f.shared).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Folder className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">폴더</p>
                <p className="text-xl font-semibold">{folders.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Download className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">총 다운로드</p>
                <p className="text-xl font-semibold">{files.reduce((sum, f) => sum + f.downloads, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* File tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">전체 파일 ({filteredFiles.length})</TabsTrigger>
          <TabsTrigger value="my">내 파일 ({myFiles.length})</TabsTrigger>
          <TabsTrigger value="shared">공유 파일 ({sharedFiles.length})</TabsTrigger>
          <TabsTrigger value="folders">폴더 ({folders.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {filteredFiles.map((file) => (
              <Card key={file.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">{getFileIcon(file.type)}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">{file.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <span>{file.size}</span>
                        <span>•</span>
                        <span>{file.uploadedAt}</span>
                        <span>•</span>
                        <span>{file.uploadedBy}</span>
                        <span>•</span>
                        <span>{file.className}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {file.shared && (
                        <Badge variant="secondary" className="text-xs">
                          공유됨
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">{file.downloads} 다운로드</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            미리보기
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            다운로드
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="h-4 w-4 mr-2" />
                            공유
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            삭제
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my" className="space-y-4">
          <div className="grid gap-4">
            {myFiles.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <File className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">업로드한 파일이 없습니다</h3>
                  <p className="text-muted-foreground mb-4">첫 번째 파일을 업로드해보세요.</p>
                  <Button onClick={() => setShowUploadDialog(true)}>
                    <Upload className="h-4 w-4 mr-2" />
                    파일 업로드
                  </Button>
                </CardContent>
              </Card>
            ) : (
              myFiles.map((file) => (
                <Card key={file.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">{getFileIcon(file.type)}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground truncate">{file.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <span>{file.size}</span>
                          <span>•</span>
                          <span>{file.uploadedAt}</span>
                          <span>•</span>
                          <span>{file.className}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {file.shared && (
                          <Badge variant="secondary" className="text-xs">
                            공유됨
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">{file.downloads} 다운로드</span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              미리보기
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              다운로드
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="h-4 w-4 mr-2" />
                              공유 설정
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              삭제
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="shared" className="space-y-4">
          <div className="grid gap-4">
            {sharedFiles.map((file) => (
              <Card key={file.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">{getFileIcon(file.type)}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">{file.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <span>{file.size}</span>
                        <span>•</span>
                        <span>{file.uploadedAt}</span>
                        <span>•</span>
                        <span>{file.uploadedBy}</span>
                        <span>•</span>
                        <span>{file.className}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="default" className="text-xs">
                        공유됨
                      </Badge>
                      <span className="text-xs text-muted-foreground">{file.downloads} 다운로드</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            미리보기
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            다운로드
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="folders" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {folders.map((folder) => (
              <Card key={folder.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Folder className="h-8 w-8 text-primary" />
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{folder.name}</h3>
                      <p className="text-sm text-muted-foreground">{folder.fileCount}개 파일</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          열기
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="h-4 w-4 mr-2" />
                          공유
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          삭제
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="text-xs text-muted-foreground">최근 수정: {folder.lastModified}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
