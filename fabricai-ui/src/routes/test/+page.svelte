<script>
    let item_list = [
        "dress",
        "shirt",
        "pants",
        "shorts",
        "skirt",
        "jacket",
        "coat",
        "sweater",
        "blouse",
        "suit",
        "tie",
        "blazer",
        "vest",
        "top",
        "jeans",
        "leggings",
        "hoodie",
        "t-shirt",
        "cardigan",
        "romper",
        "jumpsuit",
        "scarf",
        "hat",
        "gloves",
        "boots",
        "heels",
        "sandals",
        "sneakers",
        "flats",
    ];
    let size_list = [
        "short",
        "long",
        "medium",
        "mini",
        "maxi",
        "midi",
        "knee-length",
        "ankle-length",
        "floor-length",
        "petite",
        "tall",
        "regular",
        "plus-size",
        "slim-fit",
        "loose-fit",
        "skinny-fit",
        "wide-leg",
        "straight-leg",
        "bootcut",
        "cropped",
        "oversized",
        "fitted",
        "tailored",
        "athletic",
        "relaxed",
        "flowy",
        "baggy",
        "form-fitting",
        "empire-waist",
    ];
    let color_list = [
        "red",
        "blue",
        "green",
        "yellow",
        "orange",
        "purple",
        "pink",
        "black",
        "white",
        "brown",
        "gray",
        "beige",
        "navy",
        "teal",
        "burgundy",
        "olive",
        "cream",
        "silver",
        "gold",
        "taupe",
        "charcoal",
        "maroon",
        "khaki",
        "turquoise",
        "mustard",
        "lavender",
        "coral",
        "mint",
        "ruby",
        "indigo",
    ];
    let sex_list = [
        "man",
        "woman",
        "boy",
        "girl",
        "male",
        "female",
        "gentleman",
        "lady",
        "guy",
        "gal",
        "gent",
        "lass",
        "dude",
        "chick",
        "fellow",
        "lassie",
        "lad",
        "miss",
        "mister",
        "ms",
        "mr",
    ];
    let material_list = [
        "silk",
        "cotton",
        "wool",
        "leather",
        "linen",
        "denim",
        "satin",
        "velvet",
        "lace",
        "polyester",
        "cashmere",
        "chiffon",
        "rayon",
        "spandex",
        "suede",
        "twill",
        "corduroy",
        "organza",
        "tulle",
        "viscose",
        "modal",
        "bamboo",
        "acrylic",
        "nylon",
        "fleece",
        "fur",
        "faux leather",
        "canvas",
        "satin",
        "silk-blend",
    ];
    let fit_list = [
        "loose",
        "slim",
        "tight",
        "baggy",
        "fitted",
        "flowy",
        "form-fitting",
        "a-line",
        "skinny",
        "wide-leg",
        "bell-bottom",
        "empire",
        "peplum",
        "tailored",
        "crop",
        "oversized",
        "athletic",
        "relaxed",
        "balloon",
        "flared",
        "bootcut",
        "capri",
        "harem",
        "jeggings",
        "cargo",
        "draped",
        "wrap",
        "high-waisted",
        "low-rise",
        "mid-rise",
        "drop-crotch",
        "pleated",
    ];
    let style_list = [
        "classic",
        "casual",
        "elegant",
        "bohemian",
        "vintage",
        "gothic",
        "preppy",
        "retro",
        "sporty",
        "chic",
        "edgy",
        "minimalist",
        "romantic",
        "urban",
        "glamorous",
        "artsy",
        "modern",
        "sophisticated",
        "eclectic",
        "feminine",
        "masculine",
        "formal",
        "business casual",
        "streetwear",
        "hipster",
        "tomboy",
        "punk",
        "rock",
        "country",
        "boho",
        "nautical",
    ];
    let events_list = [
        "formal",
        "casual",
        "business",
        "cocktail",
        "party",
        "beach",
        "wedding",
        "club",
        "prom",
        "birthday",
        "graduation",
        "concert",
        "picnic",
        "barbecue",
        "date",
        "interview",
        "meeting",
        "gala",
        "festival",
        "conference",
        "seminar",
        "workshop",
        "exhibition",
        "trade show",
        "fashion show",
        "award ceremony",
        "charity event",
        "fundraiser",
        "party",
    ];
    let pattern_list = [
        "stripes",
        "plaid",
        "floral",
        "polka dot",
        "geometric",
        "animal print",
        "tie-dye",
        "checkered",
        "houndstooth",
        "paisley",
        "tartan",
        "camouflage",
        "abstract",
        "chevron",
        "gingham",
        "ikat",
        "marble",
        "ombre",
        "patchwork",
        "tribal",
        "zigzag",
        "argyle",
        "damask",
        "brocade",
        "herringbone",
        "jacquard",
        "lace",
        "mesh",
        "seersucker",
    ];
    let fields_names = [
        "item",
        "size",
        "color",
        "sex",
        "fit",
        "material",
        "pattern",
        "event",
        "style",
    ];

    let user_dict = {};
    fields_names.forEach(field => {
        user_dict[field] = "none";
    });
    console.log(user_dict);

    let sampling_dict = {
        "item": item_list,
        "size": size_list,
        "color": color_list,
        "sex": sex_list,
        "fit": fit_list,
        "material": material_list,
        "pattern": pattern_list,
        "event": events_list,
        "style": style_list
    };


    
    let sentence = "A long silk dress for a beach party."
        // Begin tokenizer
    console.log("Printing sentence\n");
    console.log(sentence);


    import nlp from 'compromise';

    let doc = nlp(sentence);
    let taggedTokens = doc.out('tags');
    console.log(taggedTokens)

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
    console.log("Printing user_dict\n")
    console.log(user_dict);


    function getOnlyMissingFields(fieldsDict) {
        let missingFields = [];
        for (let field in fieldsDict) {
            if (fieldsDict[field].length === 0 || fieldsDict[field] === "none") {
                missingFields.push(field);
            }
        }
        return missingFields;
    }

    function getFields(fieldsDict) {
        let chosenFields = [];
        for (let field in fieldsDict){
            if (fieldsDict[field].length >= 0 || fieldsDict[field] !== "none") {
                chosenFields.push({ field, value: fieldsDict[field] });
            }
        }
        return chosenFields;
    }

    console.log("Printing missing fields");
    console.log(getOnlyMissingFields(user_dict));
    console.log("Printing chosen fields");
    console.log(getFields(user_dict));

    function getExamplesForField(fieldName) {
        if (!fields_names.includes(fieldName)) {
            console.log(`Error: field "${fieldName}" does not exist.`);
            return [];
        } else {
            return sampling_dict[fieldName][Math.floor(Math.random() * sampling_dict[fieldName].length)];
        }
    }

    let missingFields = getOnlyMissingFields(user_dict);
    console.log("****************************************")
    console.log("Printing examples for missing fields");
    missingFields.forEach(field => {
        console.log(field + ":", getExamplesForField(field));
    });
    console.log("****************************************")

/********************************************************************************
 * ********************* GPT ****************************************************
 * ******************************************************************************
 */

    import OpenAI from "openai";
    const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

//import.meta.env.VITE_OPENAI_KEY

    let message = 
    `I would like to know if the following sentence is talking about clothes:
    {sentence}\n
    Here is an example so that you know the format I would like the reply to be in:\n
    My sentence: "The long dress she wore at the show.\n"
    Your reply: "Yes"`
    async function main() {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: message }],
        model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0]);
    }

    main(); 


</script>

<div>
    Ciao
</div>