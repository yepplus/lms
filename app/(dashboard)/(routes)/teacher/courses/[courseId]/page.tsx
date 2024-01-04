import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { IconBadge } from '@/components/icon-badge'
import { LayoutDashboardIcon } from 'lucide-react'
import { TitleForm } from './_components/title-form'
import { DescriptionForm } from './_components/description-form'
import { ImageForm } from './_components/image-form'
import { CategoryForm } from './_components/category-form'

const Page = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth()
  if (!userId) {
    return redirect('/')
  }
  const course = await db.course.findUnique({
    where: {
      id: params.courseId
    }
  })
  if (!course) {
    return redirect('/')
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc'
    }
  })

  const requiredField = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId
  ]
  const totalFields = requiredField.length
  const completedFields = requiredField.filter(Boolean).length
  const completionText = `(${completedFields}/${totalFields})`
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course setup</h1>
          <span className="text-sm text-slate-700">
            Complete all fields {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboardIcon} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          <TitleForm initialData={course} courseId={course.id} />
          <DescriptionForm initialData={course} courseId={course.id} />
          <ImageForm initialData={course} courseId={course.id} />
          <CategoryForm
            initialData={course}
            courseId={course.id}
            options={categories.map((c) => ({ label: c.name, value: c.id }))}
          />
        </div>
      </div>
    </div>
  )
}

export default Page
