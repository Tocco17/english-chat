'use server';


import { openai, openaiModel } from "@/models/openai"
import { NextResponse } from "next/server";

export default async function openAiHandler(message: string) {
	try {
		console.log('start api')
		
		if (!message) {
			return NextResponse.json(
				{ error: 'No message provided' },
				{ status: 400 }
			);
		}

		console.log('called open api')

		const completion = await openai.chat.completions.create({
			model: openaiModel,
			messages: [{ role: 'user', content: message }]
		});

		console.log('completion open api')

		const reply = completion.choices[0]?.message?.content || 'No response.';

		console.log('reply open api')

		return NextResponse.json({ reply });
	} catch (error) {
		console.error('Error open api:', error);
		return NextResponse.json(
			{ error: 'Error generating message' },
			{ status: 500 }
		);
	}
}