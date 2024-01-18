import { Suspense } from "react"
import Loading from "./loading"
import Home from "./page"
import Image from "next/image"

export default function DashboardLayout({
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        <Image
          alt="construct"
          src="https://app.constructn.ai/_next/static/media/logo-yellow.1fc0a594.svg"
          width={268}
          height={8}
          decoding="async"
          loading="lazy"
          className="absolute top-0 left-0 p-4 pl-6"
        />
        <Suspense fallback={<Loading/>}>
        
            <Home/>
        </Suspense>
      </section>
    )
  }