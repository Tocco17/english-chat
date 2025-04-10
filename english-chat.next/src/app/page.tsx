'use client';

import openAiHandler from '@/api/open-ai.controller';
import { useState } from 'react';

interface ApiResponse {
    reply: string;
    error?: string;
}

export default function Home() {
	const [message, setMessage] = useState('');
	const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!message.trim()) return;

		setIsLoading(true);
		const userMessage = message;
		setMessage('');
		setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);

		try {
			const response = await openAiHandler(userMessage)

			const data: ApiResponse = await response.json();
			if (response.ok) {
				setChatHistory(prev => [...prev, { role: 'assistant', content: data.reply }]);
			} else {
				throw new Error(data.error || 'Failed to get response');
			}
		} catch (error) {
			console.error('Error:', error);
			setChatHistory(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong.' }]);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col w-full max-w-2xl gap-[32px] row-start-2">
				<div className="flex flex-col gap-4 flex-1 min-h-[400px] bg-gray-800 p-4 rounded-lg overflow-y-auto">
					{chatHistory.map((msg, index) => (
						<div
							key={index}
							className={`p-3 rounded-lg ${
								msg.role === 'user' ? 'bg-blue-600 text-white ml-auto' : 'bg-gray-700 text-gray-100'
							} max-w-[80%]`}
						>
							{msg.content}
						</div>
					))}
					{isLoading && (
						<div className="text-gray-300 italic">Thinking...</div>
					)}
				</div>
				<form onSubmit={handleSubmit} className="flex gap-2">
					<input
						type="text"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder="Type your message..."
						className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white border-gray-600 placeholder-gray-400"
						disabled={isLoading}
					/>
					<button
						type="submit"
						disabled={isLoading}
						className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-800 disabled:text-gray-300"
					>
						Send
					</button>
				</form>
			</main>
		</div>
	);
}
