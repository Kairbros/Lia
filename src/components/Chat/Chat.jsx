import React, { forwardRef, useEffect, useRef } from 'react'
import { useChat } from '../../hooks/useChat'
import ChatHeader from './ChatHeader'
import MessageList from './MessageList'
import ChatInput from './ChatInput'

const Chat = forwardRef(({ showChat, setShowChat }, ref) => {
    const { messages, inputValue, setInputValue, isTyping, messagesEndRef, handleSendMessage, initiateChat } = useChat()
    const hasInitiated = useRef(false)

    useEffect(() => {
        if (showChat && messages.length === 0 && !hasInitiated.current) {
            hasInitiated.current = true
            initiateChat("Hola, preséntate brevemente como Asistente LIA")
        }
    }, [showChat, messages.length, initiateChat])

    return (
        <div
            ref={ref}
            className="absolute flex items-center justify-center"
            style={{ opacity: 0, pointerEvents: showChat ? 'auto' : 'none' }}
        >
            <div className="w-[90vw] md:w-[500px] lg:w-[550px] h-[70vh] md:h-[85vh]">
                {/* Chat Container */}
                <div className="w-full h-full bg-black/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white-800 flex flex-col overflow-hidden">
                    <ChatHeader onClose={() => setShowChat(false)} />
                    <MessageList messages={messages} isTyping={isTyping} messagesEndRef={messagesEndRef} />
                    <ChatInput
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        handleSendMessage={handleSendMessage}
                        isTyping={isTyping}
                    />
                </div>
            </div>
        </div>
    )
})

Chat.displayName = 'Chat'
export default Chat
