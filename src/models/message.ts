export type Sender = 'user' | 'bot'

export type MessageType = 'first' | 'message' | 'correction' | 'corrected' | 'response'

/*
Primo messaggio per iniziare la conversazione

Messaggio normale
Risposta su come dovrebbe essere riscritta meglio
Riscrittura corretta
Continuo della conversazione
*/

export type Message = {
	id: number,
	text: string,
	sender: Sender,
	type: MessageType
}

export type ChatState = {
	messages: Message[],
	errors: Record<string, string[]>
}