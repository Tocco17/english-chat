// app/chat/page.tsx (Next 13+ con App Router)
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

type Message = {
	id: number
	text: string
	sender: 'user' | 'bot'
}

export function Chat() {
	const [messages, setMessages] = useState<Message[]>([])
	const [input, setInput] = useState('')

	const sendMessage = () => {
		if (!input.trim()) return

		const newMessage: Message = {
			id: Date.now(),
			text: input,
			sender: 'user',
		}

		setMessages([...messages, newMessage])
		setInput('')

		// Simula risposta bot
		setTimeout(() => {
			setMessages((prev) => [
				...prev,
				{
					id: Date.now() + 1,
					text: 'Risposta automatica',
					sender: 'bot',
				},
			])
		}, 500)
	}

	return (
		<div className="flex flex-col h-full bg-muted">
			<main className="flex-1 overflow-y-auto p-4 space-y-3">
				{messages.map((msg) => (
					<div
						key={msg.id}
						className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'
							}`}
					>
						<Card className="max-w-sm">
							<CardContent
								className={`p-2 ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : ''
									} rounded-xl`}
							>
								{msg.text}
							</CardContent>
						</Card>
					</div>
				))}
			</main>

			<footer className="p-4 bg-background border-t flex gap-2">
				<Input
					placeholder="Write a message..."
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
				/>
				<Button onClick={sendMessage}>Invia</Button>
			</footer>
		</div>
	)
}
