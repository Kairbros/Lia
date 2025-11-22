import React, { forwardRef } from 'react'
import { useMobile } from '../../hooks/useMobile'

const VideoSection = forwardRef(({ showChat, setShowChat, videoId }, ref) => {
    const isMobile = useMobile()

    const getRotationClass = () => {
        if (isMobile) {
            return showChat ? '-rotate-90' : 'rotate-90'
        }
        return showChat ? 'rotate-180' : ''
    }

    return (
        <div
            ref={ref}
            className="absolute flex items-center justify-center"
        >
            <div className="w-[90vw] md:w-[500px] lg:w-[800px]">

                {/* Video Card */}
                <div className="bg-black rounded-2xl shadow-2xl border border-gray-900/90 overflow-hidden">
                    <div className="relative w-full pb-[56.25%]">
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>

                {/* Toggle Button */}
                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => setShowChat(!showChat)}
                        className="group relative w-20 h-14 bg-white hover:bg-gray-200 text-black rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center"
                    >
                        <svg
                            className={`w-8 h-8 transition-transform duration-500 ${getRotationClass()}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
})

VideoSection.displayName = 'VideoSection'
export default VideoSection
