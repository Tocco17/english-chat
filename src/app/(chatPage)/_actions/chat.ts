import { ChatState, Message } from "@/models/message";
import { z } from "zod";

const addSchema = z.object({
	message: z.string().min(1),
	deliveredBy: z.enum(["me", "you"])
})

export async function sendMessage(prevState: ChatState, formData: FormData) {
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