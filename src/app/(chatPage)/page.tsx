import { Chat } from "@/components/chat";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ChatPage() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Chat</CardTitle>
			</CardHeader>
			<CardContent>
				<Chat />
			</CardContent>
		</Card>
	)
}