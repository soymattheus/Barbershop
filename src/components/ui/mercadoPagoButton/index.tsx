'use client'
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react'

interface MercadoPagoButtonProps {
  preferenceId: string
}
export default function MercadoPagoButton({
  preferenceId,
}: MercadoPagoButtonProps) {
  const mercadoPagoPublicKey = process.env.NEXT_PUBLIC_MERCADO_PAGO_KEY || ''
  initMercadoPago(mercadoPagoPublicKey)
  return (
    <div>
      <Wallet
        initialization={{
          preferenceId: preferenceId,
          redirectMode: 'blank',
        }}
      />
    </div>
  )
}
