import AuthLayout from '@/components/layout/authLayout'

export default function AboutUs() {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center w-full text-gray-800 px-6">
        <h1 className="text-4xl font-bold mb-4 text-primary">About Us</h1>
        <p className="text-lg text-center max-w-2xl mb-10">
          At <span className="font-semibold">The Barrio Barbers</span>, we’re
          more than just a barbershop – we’re a place of tradition, style, and
          community.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {/* Card 1 - Mission */}
          <div className="bg-gray-100 rounded-lg p-6 shadow-md text-center">
            <h2 className="text-2xl font-semibold text-primary mb-2">
              💼 Our Mission
            </h2>
            <p>
              To provide exceptional grooming experiences with a focus on
              precision, style, and customer satisfaction.
            </p>
          </div>

          {/* Card 2 - Our Team */}
          <div className="bg-gray-100 rounded-lg p-6 shadow-md text-center">
            <h2 className="text-2xl font-semibold text-primary mb-2">
              ✂️ Our Team
            </h2>
            <p>
              Our skilled barbers combine classic techniques with modern trends
              to ensure you always look your best.
            </p>
          </div>

          {/* Card 3 - Why Choose Us */}
          <div className="bg-gray-100 rounded-lg p-6 shadow-md text-center">
            <h2 className="text-2xl font-semibold text-primary mb-2">
              🌟 Why Choose Us
            </h2>
            <p>
              Premium products, personalized service, and a vibe that makes you
              feel right at home — that’s the Barber Bros way.
            </p>
          </div>
        </div>

        {/* Optional: Team section with photos */}
        <div className="mt-12 w-full max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-primary mb-6">
            Meet Our Barbers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Example barber card */}
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className="flex flex-col items-center bg-white shadow rounded p-4"
              >
                <img
                  src={`/images/barber${i}.jpg`}
                  alt={`Barber ${i}`}
                  className="w-24 h-24 rounded-full object-cover mb-2"
                />
                <p className="font-semibold text-lg">Barber {i}</p>
                <p className="text-sm text-gray-500">Fade Specialist</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
