import { error } from '@sveltejs/kit';
import OpenAI from 'openai';

/** @type {import('./$types').PageLoad} */
export async function load({ params, url }) {
    // OPENAI 
	const openai = new OpenAI({
		apiKey: import.meta.env.VITE_OPENAI_API_KEY,
		dangerouslyAllowBrowser: true
	});
	const prompt = await url.searchParams.get('prompt');




	let description;
    let materials;


	try {
		description = await openai.chat.completions.create({
			messages: [{ role: 'system', content: prompt }],
			model: 'gpt-3.5-turbo'
		});



        return { description: description.choices[0]};
	} catch (err) {
		console.error('Error calling OpenAI API:', err);
		error(500, 'Internal Server Error');
		return;
	}
}
