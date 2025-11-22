import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useMobile } from './hooks/useMobile'
import Chat from './components/Chat/Chat'
import VideoSection from './components/Video/VideoSection'
import Background from './components/Background/Background'

function App() {
  const [showChat, setShowChat] = useState(false)
  const [mobileContentHeight, setMobileContentHeight] = useState(0)

  const isMobile = useMobile()

  // Refs for GSAP
  const videoContainerRef = useRef(null)
  const chatContainerRef = useRef(null)

  // YouTube Video ID
  const YOUTUBE_VIDEO_ID = 'IhBdyEGy3aw'

  // GSAP Animation
  useEffect(() => {
    if (!videoContainerRef.current || !chatContainerRef.current) return

    if (isMobile) {
      // Mobile Animation Logic
      const videoHeight = videoContainerRef.current.offsetHeight
      const chatHeight = chatContainerRef.current.offsetHeight
      const windowHeight = window.innerHeight
      const topPadding = 40
      const gap = 20

      if (showChat) {
        const videoMoveY = topPadding - (windowHeight / 2) + (videoHeight / 2)
        const chatMoveY = (topPadding + videoHeight + gap) - (windowHeight / 2) + (chatHeight / 2)

        setMobileContentHeight(topPadding + videoHeight + gap + chatHeight + 40)

        gsap.to(videoContainerRef.current, {
          y: videoMoveY,
          duration: 0.7,
          ease: 'power2.inOut'
        })

        gsap.to(chatContainerRef.current, {
          y: chatMoveY,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.inOut'
        })
      } else {
        setMobileContentHeight(0)
        gsap.to(videoContainerRef.current, {
          y: 0,
          duration: 0.7,
          ease: 'power2.inOut'
        })

        gsap.to(chatContainerRef.current, {
          y: 0,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.inOut'
        })
      }
    } else {
      // Desktop Animation Logic
      const videoWidth = videoContainerRef.current.offsetWidth
      const chatWidth = chatContainerRef.current.offsetWidth
      const spacing = 40

      const videoTargetX = -(chatWidth + spacing) / 2
      const chatTargetX = (videoWidth + spacing) / 2

      if (showChat) {
        gsap.to(videoContainerRef.current, {
          x: videoTargetX,
          y: 0,
          duration: 0.7,
          ease: 'power2.inOut'
        })

        gsap.to(chatContainerRef.current, {
          x: chatTargetX,
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.inOut'
        })
      } else {
        gsap.to(videoContainerRef.current, {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.inOut'
        })

        gsap.to(chatContainerRef.current, {
          x: 0,
          y: 0,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.inOut'
        })
      }
    }
  }, [showChat, isMobile])

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-x-hidden overflow-y-auto">
      <Background />

      {/* Spacer for Mobile Scrolling */}
      {isMobile && showChat && (
        <div style={{ height: mobileContentHeight, width: '1px' }} className="absolute top-0 left-0 pointer-events-none"></div>
      )}

      {/* Container for both elements */}
      <div className="relative w-full h-full flex items-center justify-center">

        {/* Chat Section */}
        <Chat
          ref={chatContainerRef}
          showChat={showChat}
          setShowChat={setShowChat}
        />

        {/* Video Section */}
        <VideoSection
          ref={videoContainerRef}
          showChat={showChat}
          setShowChat={setShowChat}
          videoId={YOUTUBE_VIDEO_ID}
        />

      </div>

    </div>
  )
}

export default App
