"use client"

import { ChatState, Message } from "@/models/message"
import { useActionState, useState } from "react"
import { Input } from "./ui/input"
import { useFormState } from "react-dom"
import { sendMessage } from "@/app/(chatPage)/_actions/chat"

export function Chat() {
	const [chatState, action] = useActionState(
		sendMessage,
		{} as ChatState
	)

	return (<>
	<div className="flex flex-col">
		{
			chatState.messages?.map((message, index) => (
				<p key={`message-chat-${index}`}>{message.message}</p>
			))
		}
		
		<form 
			action={action}
		>
			<Input 
				name="message"
			/>
			
			<input 
				name="deliveredBy"
				value="me"
				type="hidden"
			/>
		</form>
	</div>
	</>)
}