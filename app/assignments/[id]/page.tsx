import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AssignmentDetailContent } from "@/components/assignments/assignment-detail-content"

interface AssignmentDetailPageProps {
  params: {
    id: string
  }
}

export default function AssignmentDetailPage({ params }: AssignmentDetailPageProps) {
  return (
    <DashboardLayout>
      <AssignmentDetailContent assignmentId={params.id} />
    </DashboardLayout>
  )
}
