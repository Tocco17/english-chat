'use server'

import { ChatState, Message, MessageType } from "@/models/message";
import { openai } from "@/models/openai";
import { z } from "zod";

const addSchema = z.object({
	text: z.string().min(1),
	sender: z.enum(["user", "bot"]),
})

export async function sendMessageForm(prevState: ChatState, formData: FormData) {
	const result = addSchema.safeParse(Object.fromEntries(formData.entries()))

	if (result.success === false) {
		return {
			messages: prevState.messages,
			errors: result.error.formErrors.fieldErrors,
		} as ChatState
	}

	const data = result.data as Message

	const messages = !prevState.messages?.length
		? [data]
		: [...prevState.messages, data]

	return {
		...prevState,
		messages: messages
	} as ChatState
}


export async function sendMessageToAI(request: Message){
	const message = valorizeCorrectMessage(request)
	
	const response = await openai.responses.create({
		model: "gpt-4o-mini",
		input: message
	});

	const answer: Message = {
		id: request.id + 1, 
		sender: "user",
		type: getTypeOfAnswer(request),
		text: response.output_text
	}

	return answer
}

const getTypeOfAnswer: (message: Message) => MessageType = (message) => 
	message.type === 'first' || message.type === 'message'
		? 'correction'
		: 'response'

function valorizeCorrectMessage(message: Message)  {
	const action = (() => {
		if(message.type === 'first')
			return firstConversation
		
		if(message.type === 'message')
			return normalMessage
		
		if(message.type === 'corrected')
			return correctedMessage

		throw new Error("Message type action not implemented")
	})()
	
	return action(message.text)
}

const firstConversation = (text: string) => `
	Voglio imparare l'inglese. Voglio fare quindi questo esercizio di conversazione.
	Voglio conversare con te in inglese in questo modo:
	1) Io ti scrivo un messaggio in inglese. Il messaggio inizia con il flag [normal message]
	2) Mi rispondi come avrei dovuto scrivere il messaggio
	3) Riscrivo il messaggio nella forma corretta, con il flag [correct message]
	4) Mi rispondi normalmente
	5) Riparto dal punto 1).

	Ecco il primo messaggio:
	${normalMessage(text)}
`

const normalMessage = (text: string) => `[normal message] ${text}`

const correctedMessage = (text: string) => `[correct message] ${text}`