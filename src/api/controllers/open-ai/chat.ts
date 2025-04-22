'use server';

import { openai, openaiModel } from "@/models/openai"
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	console.log('called')
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' })
	}

	try {
		const { message } = req.body
		
		if (!message) {
			return NextResponse.json(
				{ error: 'No message provided' },
				{ status: 400 }
			);
		}

		const completion = await openai.chat.completions.create({
			model: openaiModel,
			messages: [{ role: 'user', content: message }]
		});

		const reply = completion.choices[0]?.message?.content || 'No response.';

		return NextResponse.json({ reply });
	} catch (error) {
		console.error('Error open api:', error);
		return NextResponse.json(
			{ error: 'Error generating message' },
			{ status: 500 }
		);
	}
}