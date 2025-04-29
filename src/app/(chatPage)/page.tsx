import { Chat } from "@/components/chat";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ChatPage() {
	return (
		<Card className="h-full bg-gray-400">
			<CardHeader>
				<CardTitle>Chat</CardTitle>
			</CardHeader>
			<CardContent className="h-full">
				<Chat />
			</CardContent>
		</Card>
	)
}