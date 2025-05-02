export type Sender = 'user' | 'bot'

export type Message = {
	id: number,
	message: string,
	sender: Sender,
}

export type ChatState = {
	messages: Message[],
	errors: Record<string, string[]>
}