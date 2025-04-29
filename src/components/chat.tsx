"use client"

import { ChatState } from "@/models/message"
import { useActionState } from "react"
import { Input } from "./ui/input"
import { sendMessage } from "@/app/(chatPage)/_actions/chat"

export function Chat() {
	const [chatState, action] = useActionState(
		sendMessage,
		{
			messages: [{ message: "risposta", deliveredBy: "you" }]
		} as ChatState
	)

	return (<>
		<div className="flex flex-col items-start justify-end w-full h-full gap-6">
			<div className="flex flex-col items-start justify-end w-full h-full gap-2 px-2">
				{
					chatState.messages?.map((message, index) => (
						<p
							key={`message-chat-${index}`}
							className={
								message.deliveredBy === "me"
									? "self-end"
									: ""
							}
						>
							{message.message}
						</p>
					))
				}
			</div>

			<form
				action={action}
				className="w-full"
			>
				<Input
					name="message"
					placeholder="Write a message..."
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