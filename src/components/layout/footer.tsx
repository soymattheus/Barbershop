import { Copyright } from 'lucide-react'

export default function Footer() {
  return (
    <div className="flex flex-row w-full h-10 p-4 items-center bg-primary">
      <Copyright className="size-3" />
      <p className="text-xs"> 2025, All rights reserved - Matheus Tavares</p>
    </div>
  )
}
