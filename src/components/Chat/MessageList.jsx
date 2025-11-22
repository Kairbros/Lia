import React from 'react'
import Markdown from 'react-markdown'

export default function MessageList({ messages, isTyping, messagesEndRef }) {
    return (
        <div className="font-semibold flex-1 overflow-y-auto p-3 md:p-4 space-y-3 bg-black">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                    <div className={`flex items-start gap-2 max-w-[85%] md:max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${message.sender === 'bot'
                            ? 'bg-black border border-white/30'
                            : 'bg-white border border-black/30'
                            }`}>
                            {message.sender === 'bot' ? (
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            )}
                        </div>

                        {/* Message Bubble */}
                        <div>
                            <div className={`rounded-xl p-3 ${message.sender === 'bot'
                                ? 'bg-black text-white border border-white/30'
                                : 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                                }`}>
                                <p className="text-sm leading-relaxed"><Markdown>{message.text}</Markdown></p>
                            </div>
                            <span className={`text-xs text-black mt-1 block ${message.sender === 'user' ? 'text-right' : ''}`}>
                                {message.time}
                            </span>
                        </div>
                    </div>
                </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
                <div className="flex justify-start animate-fade-in">
                    <div className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 border border-white/20">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <div className="bg-black border border-white/30 rounded-xl p-3 flex gap-1">
                            <span className="w-2 h-2 bg-white rounded-full animate-typing-dot"></span>
                            <span className="w-2 h-2 bg-white rounded-full animate-typing-dot" style={{ animationDelay: '0.2s' }}></span>
                            <span className="w-2 h-2 bg-white rounded-full animate-typing-dot" style={{ animationDelay: '0.4s' }}></span>
                        </div>
                    </div>
                </div>
            )}

            <div ref={messagesEndRef} />
        </div>
    )
}
