import type { MessageProps } from '@/types/chat'
import { useCallback, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export default function useChat(room: string) {
  const [messages, setMessages] = useState<MessageProps[]>([])

  const handleGetMessages = useCallback(async () => {
    try {
      if (room) {
        const url = `${apiUrl}/messages/${room}`

        const res = await fetch(url)
        if (!res.ok) {
          return
        }

        const data = await res.json()
        setMessages(data)
      }
    } catch (err) {
      console.error('💥 Failed to fetch messages', err)
    }
  }, [room])

  useEffect(() => {
    handleGetMessages()
    const socket = io(`${apiUrl}`)

    socket.emit('join_room', { room })

    socket.on('new_message', msg => {
      if (msg.room === room) {
        setMessages(prev => [...prev, msg])
      }
    })

    return () => {
      socket.emit('leave_room', { room })
      socket.disconnect()
    }
  }, [room, handleGetMessages])

  return { messages }
}
