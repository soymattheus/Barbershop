export interface BookingData {
  bookingId: string
  userId: string
  barberName: string
  date: string | null
  time: string
  service: string
  price: string
  status: string
}

export interface ResponseBookingData {
  userName: string
  userId: string
  barberName: string
  date: string | null
  time: string
  service: string
}
