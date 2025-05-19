export interface BookingData {
  id: string
  userId: string
  barber: string
  date: Date | null
  time: string
  service: string
  status: string
}
