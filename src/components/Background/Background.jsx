import React, { useEffect, useRef } from 'react'

const Background = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let animationFrameId

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        window.addEventListener('resize', resizeCanvas)
        resizeCanvas()

        const particles = []
        const particleCount = Math.min(window.innerWidth / 2, 100) // Responsive count
        const connectionDistance = 150
        const mouseDistance = 200

        let mouse = { x: null, y: null }

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x
            mouse.y = e.y
        })

        window.addEventListener('mouseleave', () => {
            mouse.x = null
            mouse.y = null
        })

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width
                this.y = Math.random() * canvas.height
                this.vx = (Math.random() - 0.5) * 0.5
                this.vy = (Math.random() - 0.5) * 0.5
                this.size = Math.random() * 2 + 1
                this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})` // White with varying opacity
            }

            update() {
                this.x += this.vx
                this.y += this.vy

                // Bounce off edges with position correction
                if (this.x < 0) {
                    this.x = 0
                    this.vx *= -1
                } else if (this.x > canvas.width) {
                    this.x = canvas.width
                    this.vx *= -1
                }

                if (this.y < 0) {
                    this.y = 0
                    this.vy *= -1
                } else if (this.y > canvas.height) {
                    this.y = canvas.height
                    this.vy *= -1
                }

                // Mouse interaction
                if (mouse.x != null) {
                    const dx = mouse.x - this.x
                    const dy = mouse.y - this.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < mouseDistance) {
                        const forceDirectionX = dx / distance
                        const forceDirectionY = dy / distance
                        const force = (mouseDistance - distance) / mouseDistance
                        const directionX = forceDirectionX * force * 0.5
                        const directionY = forceDirectionY * force * 0.5
                        this.vx -= directionX
                        this.vy -= directionY
                    }
                }

                // Speed limit / Friction
                const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
                const maxBaseSpeed = 0.5 // The speed we want them to settle at

                if (speed > maxBaseSpeed) {
                    this.vx *= 0.95 // Friction to slow down to base speed
                    this.vy *= 0.95
                }
            }

            draw() {
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fillStyle = this.color
                ctx.shadowBlur = 15 // Bloom effect
                ctx.shadowColor = "white"
                ctx.fill()
                ctx.shadowBlur = 0 // Reset for other elements
            }
        }

        const init = () => {
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle())
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Draw gradient background
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
            gradient.addColorStop(0, '#000000') // Black
            gradient.addColorStop(1, '#1a1a1a') // Very dark gray
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            for (let i = 0; i < particles.length; i++) {
                particles[i].update()
                particles[i].draw()

                // Draw connections
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < connectionDistance) {
                        ctx.beginPath()
                        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / connectionDistance})` // Fading white line
                        ctx.lineWidth = 0.5
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.stroke()
                    }
                }
            }
            animationFrameId = requestAnimationFrame(animate)
        }

        init()
        animate()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10"
        />
    )
}

export default Background
