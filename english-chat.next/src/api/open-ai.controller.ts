'use server';
import { openai } from "@/models/openai"
import { NextResponse } from "next/server";

export default async function openAiHandler(message: string) {
	try {
		if (!message) {
			return NextResponse.json(
				{ error: 'No message provided' },
				{ status: 400 }
			);
		}

		const completion = await openai.chat.completions.create({
			model: process.env.OPENAI_MODEL ?? '',
			messages: [{ role: 'user', content: message }]
		});

		const reply = completion.choices[0]?.message?.content || 'No response.';

		return NextResponse.json({ reply });
	} catch (error) {
		console.error('Error:', error);
		return NextResponse.json(
			{ error: 'Error generating message' },
			{ status: 500 }
		);
	}
}