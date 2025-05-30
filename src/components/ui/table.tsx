import type { BookingData } from '@/types/booking'
import { useState } from 'react'
import { Button } from './button'

interface TableProps {
  bookingData: BookingData[]
}

const ITEMS_PER_PAGE = 4

export default function Table({ bookingData }: TableProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(bookingData.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentAppointments = bookingData.slice(startIndex, endIndex)

  return (
    <div className="md:p-2">
      {currentAppointments.length === 0 ? (
        <div className="flex justify-center items-center h-32">
          <p className="text-gray-500">No appointments found.</p>
        </div>
      ) : (
        <div>
          <div className="w-full overflow-x-scroll">
            <table className="min-w-full bg-white text-sm rounded-md shadow overflow-hidden">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="text-left px-4 py-2">Date</th>
                  <th className="text-left px-4 py-2">Time</th>
                  <th className="text-left px-4 py-2">Service</th>
                  <th className="text-left px-4 py-2">Price</th>
                  <th className="text-left px-4 py-2">Barber</th>
                  <th className="text-left px-4 py-2">Status</th>
                  <th className="text-left px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentAppointments.map(appointment => (
                  <tr
                    key={appointment.bookingId}
                    className="border-b hover:bg-gray-100"
                  >
                    <td className="px-4 py-2 text-text">
                      {appointment?.date
                        ? new Date(
                            `${appointment?.date}T23:00:00Z`
                          ).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          })
                        : ''}
                    </td>
                    <td className="px-4 py-2 text-text">
                      {appointment?.time || ''}
                    </td>
                    <td className="px-4 py-2 text-text">
                      {appointment?.service || ''}
                    </td>
                    <td className="px-4 py-2 text-text">
                      {appointment?.price
                        ? Number(appointment.price).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          })
                        : ''}
                    </td>
                    <td className="px-4 py-2 text-text">
                      {appointment?.barberName || ''}
                    </td>
                    <td className="px-4 py-2 text-text">
                      {appointment?.status || ''}
                    </td>
                    <td className="px-4 py-2">
                      <Button
                        disabled={appointment?.status === 'completed'}
                        onClick={() =>
                          alert('This feature will be available soon')
                        }
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
      )}
    </div>
  )
}
