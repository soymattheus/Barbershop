import { useState } from 'react'
import { Button } from './button'

const appointments = [
  {
    id: 'appt_004',
    date: '2025-04-20',
    time: '10:30',
    service: 'beard',
    barber: 'Lucas Andrade',
    status: 'booked',
  },
  {
    id: 'appt_003',
    date: '2025-04-15',
    time: '10:30',
    service: 'beard',
    barber: 'Lucas Andrade',
    status: 'completed',
  },
  {
    id: 'appt_002',
    date: '2025-04-10',
    time: '14:00',
    service: 'classic',
    barber: 'Lucas Andrade',
    status: 'completed',
  },
  {
    id: 'appt_001',
    date: '2025-04-05',
    time: '14:00',
    service: 'classic',
    barber: 'Lucas Andrade',
    status: 'completed',
  },
  {
    id: 'appt_000',
    date: '2025-03-27',
    time: '14:00',
    service: 'classic',
    barber: 'Lucas Andrade',
    status: 'completed',
  },
]

const ITEMS_PER_PAGE = 4

export default function Table() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(appointments.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentAppointments = appointments.slice(startIndex, endIndex)

  return (
    <div className="md:p-2">
      <div className="w-full overflow-x-scroll">
        <table className="min-w-full bg-white text-sm rounded-md shadow overflow-hidden">
          <thead className="bg-primary text-white">
            <tr>
              <th className="text-left px-4 py-2">Date</th>
              <th className="text-left px-4 py-2">Time</th>
              <th className="text-left px-4 py-2">Service</th>
              <th className="text-left px-4 py-2">Barber</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-left px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentAppointments.map(appointment => (
              <tr key={appointment.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2 text-text">{appointment.date}</td>
                <td className="px-4 py-2 text-text">{appointment.time}</td>
                <td className="px-4 py-2 text-text">{appointment.service}</td>
                <td className="px-4 py-2 text-text">{appointment.barber}</td>
                <td className="px-4 py-2 text-text">{appointment.status}</td>
                <td className="px-4 py-2">
                  <Button
                    disabled={appointment?.status === 'completed'}
                    onClick={() => alert('Cancel')}
                  >
                    Cancel
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      <div className="flex justify-center md:justify-end gap-2 mt-4">
        <Button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="px-3 py-1 text-gray-700 text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
