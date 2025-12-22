import { ContactSkeleton } from '@/components/loaders/contact'
import { customerTestimonialsSkeleton } from '@/components/loaders/customerTestimonials'
import { ServicesSkeleton } from '@/components/loaders/servicesComponent'
import dynamic from 'next/dynamic'

const CustomerTestimonials = dynamic(
  () => import('@/components/layout/customerTestimonials'),
  { loading: customerTestimonialsSkeleton }
)
const Chat = dynamic(() => import('@/components/layout/Chat'))
const AuthLayout = dynamic(() => import('@/components/layout/authLayout'))
const Banner = dynamic(() => import('@/components/layout/banner'))
const Contact = dynamic(() => import('@/components/layout/contact'), {
  loading: ContactSkeleton,
})
const Services = dynamic(() => import('@/components/layout/services'), {
  loading: ServicesSkeleton,
})

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-gradient-to-b from-white to-gray-100 min-h-screen">
      <AuthLayout>
        <Chat />
        {/* Body */}
        <div className="flex flex-col px-6 gap-4 md:gap-16">
          <Banner showButton />

          {/* Services secssion */}
          <Services />

          {/* Testimonials and Contact */}
          <div className="flex flex-col md:flex-row gap-4">
            <CustomerTestimonials />
            <Contact />
          </div>
        </div>
        {/* End body */}
      </AuthLayout>
    </div>
  )
}
