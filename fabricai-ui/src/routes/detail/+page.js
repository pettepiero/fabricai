import { error } from '@sveltejs/kit';
import OpenAI from 'openai';
import nlp from 'compromise';

/** @type {import('./$types').PageLoad} */
export async function load({ params, url }) {
    // OPENAI 
	const openai = new OpenAI({
		apiKey: import.meta.env.VITE_OPENAI_API_KEY,
		dangerouslyAllowBrowser: true
	});
	const prompt = await url.searchParams.get('prompt');

	let fields_names = [
        "item",
        "size",
        "color",
        "sex",
        "fit",
        // "material",
        // "pattern",
        "event",
        "style",
    ];

    let user_dict = {};
    fields_names.forEach(field => {
        user_dict[field] = "none";
    });


    let doc = nlp(prompt);
    let taggedTokens = doc.out('tags');

    let adjectives = [];
    let names = [];

    for (let token in taggedTokens[0]) {
        if (taggedTokens[0][token].includes("Adjective")) {
            adjectives.push(token);
        }
        if (taggedTokens[0][token].includes("Noun")) {
            names.push(token);
        }
    }

    function getUserChoices(tokens, userDict) {
        for (let field in userDict) {
            for (let token of tokens) {
                if (sampling_dict[field].includes(token)) {
                    userDict[field] = token;
                }
            }
        }
    }

    getUserChoices(adjectives.concat(names), user_dict);

	function getOnlyMissingFields(fieldsDict) {
        let missingFields = [];
        for (let field in fieldsDict) {
            if (fieldsDict[field].length === 0 || fieldsDict[field] === "none") {
                missingFields.push(field);
            }
        }
        return missingFields;
    }

	function getExamplesForField(fieldName) {
        if (!fields_names.includes(fieldName)) {
            console.log(`Error: field "${fieldName}" does not exist.`);
            return [];
        } else {
            return sampling_dict[fieldName][Math.floor(Math.random() * sampling_dict[fieldName].length)];
        }
    }

	function fillMissingValues(userDict, missingFields) {
		missingFields.forEach(field => {
			if (userDict[field] === "none") {
				userDict[field] = getExamplesForField(field);
			}
		});
	}
	
	let missing_fields = getOnlyMissingFields(user_dict);
	fillMissingValues(user_dict, missing_fields);


	function substituteValues(user_dict, intro) {
        let result = intro;
        for (let key in user_dict) {
            let placeholder = `{${key}}`;
            if (result.includes(placeholder)) {
                result = result.replace(placeholder, user_dict[key]);
            }
        }
        return result;
    }

	let prompt1 = "I am a stylist and i want you to help me develop some sketches. Keeping always the same drawing style, generate only the sketch for  a {style} {color} {item} - do not generate the final product, just a draft on a neutral background that seems hand drawn and be sure that there is only one sketch per page. Imagine an item, with {fit} fit, that is suitable for a {event}. The item is meant to be worn by a {sex}.";
    let filledIntro = substituteValues(user_dict, prompt1);

	let prompt_description = "Consider the following text '" + filledIntro +"'. Imagine the final product and give me a description of the item, without mentioning the material, that can be used as a caption for the product. It should be a brief description, with some technical details. The generated text must not include anything apart from the caption, so no title, no bullet points and no fancy adjective." 
    let prompt_materials = "Consider the following text: '" + filledIntro + "'.Propose a list of 6 possible materials that are suitable for producing the item and return just the name of the materials, without titles or explanations."
    let prompt2 = "Given this text '" + filledIntro + "', can you give me a textual description (no bullet point) of a pattern that uses {color} and can be used for the fabric of the item\? The output must be only the description of the pattern, avoid any additional text"
    let prompt_patterns = substituteValues(user_dict, prompt2)
	

	let description;
    let materials;
	let patterns;
	let title;

	let title_prompt = "Given the following description: '" + description + "', create a short title for the described item\n.";
	let generated_sketch_url;
	

	try {
		description = await openai.chat.completions.create({
			messages: [{ role: 'system', content: prompt_description }],
			model: 'gpt-3.5-turbo'
		});

		materials = await openai.chat.completions.create({
			messages: [{ role: "system", content: prompt_materials }],
			model: "gpt-3.5-turbo",
		});

		patterns = await openai.chat.completions.create({
			messages: [{ role: "system", content: prompt_patterns }],
			model: "gpt-3.5-turbo",
		});

		title = await openai.chat.completions.create({
			messages: [{ role: "system", content: title_prompt }],
			model: "gpt-3.5-turbo",
		});

		response = await openai.images.generate({
			     model: "dall-e-3",
			     prompt: filledIntro,
			     n: 1,
			     size: "1024x1024"
		});
		let generated_sketch_url = response.data[0].url;
		



        return { description: description.choices[0].message.content, materials: materials.choices[0].message.content, patterns: patterns.choices[0].message.content, title: title.choices[0].message.content, generated_sketch_url: sketch.data[0].url};
	} catch (err) {
		console.error('Error calling OpenAI API:', err);
		error(500, 'Internal Server Error');
		return;
	}
}
