'use client'

import { useAuth } from '@/hooks/auth'
import { MessageSquare, MessageSquareDot, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { useChat } from '@/providers/chat'
import { Button } from '../ui/button'
import { IconButton } from '../ui/iconButton'
import { InputField, InputRoot } from '../ui/input'

export default function Chat() {
  const bottomRef = useRef<HTMLDivElement | null>(null)
  const { text, setText, isOpen, setIsOpen, messages, handleSendMessage } =
    useChat()
  const { user } = useAuth()

  async function handleSend() {
    if (!text.trim()) return
    await handleSendMessage()
    setText('')
  }

  useEffect(() => {
    console.log(messages, isOpen)
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isOpen])

  useEffect(() => {
    const isMobile = window.innerWidth < 640 // sm breakpoint do Tailwind

    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <div
      className={`${user?.token ? 'fixed' : 'hidden'} bottom-6 right-6 w-3xs z-50`}
    >
      {!isOpen ? (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 rounded-full p-4 shadow-lg bg-primary hover:bg-primary/90 hover:text-white transition-all duration-200"
          >
            <MessageSquare size={20} />
            <span className="font-medium hidden sm:block">Messages</span>
          </Button>
        </div>
      ) : (
        <div
          className="
          fixed
          bottom-0
          right-0
          inset-0
          w-full 
          h-12/12 
          bg-white
          shadow-xl 
          rounded-none 
          md:inset-auto 
          md:bottom-6 
          md:right-6 
          md:w-80 
          md:h-8/12 
          md:max-h-8/12 
          md:rounded-lg 
          border 
          border-primary 
          flex 
          flex-col 
          overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-primary/90 p-3">
            <h2 className="text-sm font-semibold text-white">
              {user?.user?.name?.split(' ')[0]} — Chat
            </h2>
            <Button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-red-300 transition"
            >
              <X size={20} />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 bg-gray-50 p-3 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent">
            {messages.map(msg => {
              const isMine = msg.sender === user?.user?.name

              return (
                <div
                  key={msg.id}
                  className={`relative max-w-[80%] p-2 rounded-xl text-sm leading-snug shadow-sm
          ${isMine ? 'ml-auto bg-primary text-white rounded-br-none' : 'bg-white text-gray-700 rounded-bl-none'}
        `}
                >
                  {!isMine && (
                    <span className="block text-xs font-semibold text-primary mb-0.5">
                      {msg.sender}
                    </span>
                  )}

                  <p className="break-words">{msg.text}</p>

                  <span className="text-[10px] opacity-70 text-right block mt-1">
                    {msg.created_at}
                  </span>
                </div>
              )
            })}

            {/* Div para scroll automático caso use scrollIntoView */}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-2 flex gap-2 border-t border-gray-200 bg-white items-center">
            <InputRoot>
              <InputField
                className="text-gray-900"
                type="text"
                placeholder="Type your message..."
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleSend()
                  }
                }}
              />
            </InputRoot>

            <Button className="text-sm px-3" type="button" onClick={handleSend}>
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
