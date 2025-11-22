import React from 'react'

export default function ChatInput({ inputValue, setInputValue, handleSendMessage, isTyping }) {
    return (
        <div className="p-3 md:p-4 bg-black/80 border-t border-white/10">
            <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                    disabled={isTyping}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                    className={`flex-1 bg-black text-white rounded-lg px-3 md:px-4 py-2 md:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white border border-white/90 transition-all duration-200`}
                />
                <button
                    type="submit"
                    disabled={inputValue.trim() === ''}
                    className="bg-white hover:bg-gray-200 text-black p-2 md:p-3 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                </button>
            </form>
        </div>
    )
}
