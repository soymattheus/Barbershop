export interface Service {
  serviceId: string
  name: string
  description?: string
  price: number
}

export interface ServiceGroup {
  title: string
  services: Service[]
}
