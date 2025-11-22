import React from 'react'

export default function ChatHeader({ onClose }) {
    return (
        <div className="bg-black p-4 md:p-5 flex items-center justify-between border-b border-white/30">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center border border-white/30">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-white font-semibold text-base md:text-lg">Asistente LIA</h2>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]"></span>
                        <span className="text-gray-400 text-xs">En línea</span>
                    </div>
                </div>
            </div>

            <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
            >
                <svg className="w-5 h-5 text-gray-400 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    )
}
