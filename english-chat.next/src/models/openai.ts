'use server';

import OpenAI from "openai"

export const openaiModel = process.env.OPENAI_MODEL ?? ''

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})