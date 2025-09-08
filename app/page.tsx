import { LoginForm } from "@/components/auth/login-form"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">ClassroomHub</h1>
          <p className="text-muted-foreground">학습 관리 플랫폼에 오신 것을 환영합니다</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
