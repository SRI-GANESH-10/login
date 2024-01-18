import { Suspense } from "react"
import UserProfile from "./page"
import Loading from "./loading"
import Image from "next/image"

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        
        <Suspense fallback={<Loading/>}>
        <Image
          alt="construct"
          src="https://app.constructn.ai/_next/static/media/logo-yellow.1fc0a594.svg"
          width={268}
          height={8}
          decoding="async"
          loading="lazy"
          className="absolute top-0 left-0 p-4 pl-6"
        />
        </Suspense>
        {children}
      </section>
    )
  }