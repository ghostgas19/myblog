import { redirect } from 'next/navigation'
import { getSession } from '@/lib/actions'

export default async function LoginLayout({ children }: { children: React.ReactNode }) {
  const isAuthenticated = await getSession()

  // If already logged in, redirect to admin dashboard
  if (isAuthenticated) {
    redirect('/admin')
  }

  return <>{children}</>
}
