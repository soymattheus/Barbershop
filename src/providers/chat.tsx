'use client'

import type { ReactNode } from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { toast } from 'react-toastify'

import { useAuth } from '@/hooks/auth'
import chatHook from '@/hooks/chat'
import type { MessageProps } from '@/types/chat'

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

type ChatContextType = {
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleSendMessage: () => Promise<void>
  messages: MessageProps[]
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth()
  const room = user?.user?.id || ''
  const name = user?.user?.name || ''

  const { messages } = chatHook(room)

  const [text, setText] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleSendMessage = useCallback(async () => {
    await fetch(`${apiUrl}/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ room, sender: name, text }),
    })
  }, [room, name, text])

  return (
    <ChatContext.Provider
      value={{
        text,
        setText,
        isOpen,
        setIsOpen,
        handleSendMessage,
        messages,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChatmust be used within an ChatProvider')
  }
  return context
}
