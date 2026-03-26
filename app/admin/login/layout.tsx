export default function LoginLayout({ children }: { children: React.ReactNode }) {
  // Simply render the login page without any session checks
  // The login page itself will handle the form submission and redirect
  return <>{children}</>
}
