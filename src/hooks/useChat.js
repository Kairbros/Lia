import { useState, useEffect, useRef } from 'react'

export function useChat() {
    const [messages, setMessages] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [sessionId, setSessionId] = useState('')
    const messagesEndRef = useRef(null)

    // Initialize Session ID
    useEffect(() => {
        let storedSessionId = sessionStorage.getItem('chatSessionId')
        if (!storedSessionId) {
            storedSessionId = crypto.randomUUID()
            sessionStorage.setItem('chatSessionId', storedSessionId)
        }
        setSessionId(storedSessionId)
    }, [])

    // Auto-scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSendMessage = async (e) => {
        e.preventDefault()

        if (inputValue.trim() === '') return

        const userMessage = {
            id: messages.length + 1,
            text: inputValue,
            sender: 'user',
            time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
        }

        setMessages(prev => [...prev, userMessage])
        setInputValue('')
        setIsTyping(true)

        try {
            // REPLACE THIS URL WITH YOUR ACTUAL N8N WEBHOOK URL
            const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook/cursoudemy'

            const response = await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: inputValue,
                    sessionId: sessionId
                }),
            })

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const data = await response.json()

            // Assumes n8n returns { "output": "bot response text" }
            const botText = data.output || "Lo siento, no pude procesar tu respuesta."

            const botMessage = {
                id: messages.length + 2,
                text: botText,
                sender: 'bot',
                time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
            }
            setMessages(prev => [...prev, botMessage])

        } catch (error) {
            console.error('Error sending message:', error)
            const errorMessage = {
                id: messages.length + 2,
                text: "Hubo un error al conectar con el servidor.",
                sender: 'bot',
                time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
            }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setIsTyping(false)
        }
    }

    const initiateChat = async (hiddenPrompt) => {
        setIsTyping(true)
        try {
            // REPLACE THIS URL WITH YOUR ACTUAL N8N WEBHOOK URL
            const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook/cursoudemy'

            const response = await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: hiddenPrompt,
                    sessionId: sessionId
                }),
            })

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const data = await response.json()

            // Assumes n8n returns { "output": "bot response text" }
            const botText = data.output || "Hola, soy tu asistente virtual."

            const botMessage = {
                id: Date.now(),
                text: botText,
                sender: 'bot',
                time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
            }
            setMessages(prev => [...prev, botMessage])

        } catch (error) {
            console.error('Error initiating chat:', error)
        } finally {
            setIsTyping(false)
        }
    }

    return {
        messages,
        inputValue,
        setInputValue,
        isTyping,
        messagesEndRef,
        handleSendMessage,
        initiateChat
    }
}
