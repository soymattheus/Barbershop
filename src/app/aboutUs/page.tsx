import AuthLayout from '@/components/layout/authLayout'
import Contact from '@/components/layout/contact'
import CustomerTestimonials from '@/components/layout/customerTestimonials'

const barbers = [
  {
    id: '1',
    name: 'José Hernandez',
    specialty: 'Fade Specialist',
    img: '/images/barber01.avif',
  },
  {
    id: '2',
    name: 'Don Corte',
    specialty: 'Beard Expert',
    img: '/images/barber02.avif',
  },
  {
    id: '3',
    name: 'Carlos El Caballero',
    specialty: 'Hair Color Specialist',
    img: '/images/barber03.webp',
  },
  {
    id: '4',
    name: 'Miguel El Artista',
    specialty: 'Creative Styles',
    img: '/images/barber04.png',
  },
]

export default function AboutUs() {
  return (
    <div className="flex flex-col w-full bg-gradient-to-b from-white to-gray-100 min-h-screen">
      <AuthLayout>
        <div className="flex flex-col items-center justify-center w-full px-6 gap-10">
          <h1 className="text-4xl font-bold mb-4 text-primary">About Us</h1>
          <p className="text-lg text-center max-w-2xl mb-10 text-gray-800 ">
            At <span className="font-semibold">The Barrio Barbers</span>, we’re
            more than just a barbershop – we’re a place of tradition, style, and
            community.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
            {/* Card 1 - Mission */}
            <div className="bg-gray-100 rounded-lg p-6 shadow-md text-center text-gray-800">
              <h2 className="text-2xl font-semibold text-primary mb-2">
                💼 Our Mission
              </h2>
              <p>
                To provide exceptional grooming experiences with a focus on
                precision, style, and customer satisfaction.
              </p>
            </div>

            {/* Card 2 - Our Team */}
            <div className="bg-gray-100 rounded-lg p-6 shadow-md text-center text-gray-800">
              <h2 className="text-2xl font-semibold text-primary mb-2">
                ✂️ Our Team
              </h2>
              <p>
                Our skilled barbers combine classic techniques with modern
                trends to ensure you always look your best.
              </p>
            </div>

            {/* Card 3 - Why Choose Us */}
            <div className="bg-gray-100 rounded-lg p-6 shadow-md text-center text-gray-800">
              <h2 className="text-2xl font-semibold text-primary mb-2">
                🌟 Why Choose Us
              </h2>
              <p>
                Premium products, personalized service, and a vibe that makes
                you feel right at home — that’s the Barrio Barber's way.
              </p>
            </div>
          </div>

          {/* Optional: Team section with photos */}
          <div className="mt-12 w-full max-w-6xl text-gray-800">
            <h2 className="text-3xl font-bold text-center text-primary mb-6">
              Meet Our Barbers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {/* Example barber card */}
              {barbers.map(i => (
                <div
                  key={i?.id}
                  className="flex flex-col items-center bg-white shadow rounded p-4"
                >
                  <img
                    src={i?.img}
                    alt={`Barber ${i?.name}`}
                    className="w-24 h-24 rounded-full object-cover mb-2"
                  />
                  <p className="font-semibold text-lg">{i?.name}</p>
                  <p className="text-sm text-gray-500">{i?.specialty}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <CustomerTestimonials />
            <Contact />
          </div>
        </div>
      </AuthLayout>
    </div>
  )
}
