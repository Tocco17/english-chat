"use client"

import { ChatState, Message } from "@/models/message"
import { useState } from "react"
import { Input } from "./ui/input"
import { useFormState } from "react-dom"
import { sendMessage } from "@/app/(chatPage)/_actions/chat"

export function Chat() {
	const [messages, action] = useFormState(
		sendMessage,
		{} as ChatState
	)

	return (<>
	<p>hi</p>
	</>)
}