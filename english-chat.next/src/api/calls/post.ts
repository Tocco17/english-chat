'use client'

export default async function Post<TBody>(url: string, body: TBody) {
	const response = await fetch(
		`api/controllers/${url}`,
		{
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ body }),
			method: 'POST',
		}
	)

	return response
}