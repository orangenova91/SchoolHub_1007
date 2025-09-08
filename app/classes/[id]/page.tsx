import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ClassDetailContent } from "@/components/classes/class-detail-content"

interface ClassDetailPageProps {
  params: {
    id: string
  }
}

export default function ClassDetailPage({ params }: ClassDetailPageProps) {
  return (
    <DashboardLayout>
      <ClassDetailContent classId={params.id} />
    </DashboardLayout>
  )
}
