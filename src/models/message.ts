export type DeliveredBy = "me" | "you"

export type Message = {
	message: string
	deliveredBy: DeliveredBy
}

export type ChatState = {
	messages: Message[],
	errors: Record<string, string[]>
}