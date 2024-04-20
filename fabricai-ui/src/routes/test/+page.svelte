<script>
    let item_list = [
        "dress",
        "shirt",
        "pants",
        "shorts",
    ];
    let size_list = [
        "short",
        "long",
        "medium",
        "mini",
    ];
    let color_list = [
        "red",
        "blue",
        "green",
        "yellow",
    ];
    let sex_list = [
        "man",
        "woman",
        "boy",
        "girl",
        "male",
    ];
    let material_list = [
        "silk",
        "cotton",
        "wool",
        "leather",
    ];
    let fit_list = [
        "loose",
        "slim",
        "tight",
    ];
    let style_list = [
        "classic",
        "casual",
    ];
    let events_list = [
        "formal",
        "casual",
        "business",
        "cocktail",
    ];
    let pattern_list = [
        "stripes",
        "plaid",
        "floral",
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


    function getMissingFields(fieldsDict) {
        let missingFields = [];
        for (let field in fieldsDict) {
            if (fieldsDict[field].length === 0 || fieldsDict[field] === "none") {
                missingFields.push(field);
            }
        }
        return missingFields;
    }

    function getMissingFieldsTxt(fieldsDict) {
        let missingFields = getMissingFields(fieldsDict);
        if (missingFields.length === 0) {
            return "All fields are filled.";
        } else {
            return "Missing fields: " + missingFields.join(", ");
        }
    }

    function getChosenFields(fieldsDict) {
        let chosenFields = [];
        for (let field in fieldsDict){
            if (fieldsDict[field].length >= 0 || fieldsDict[field] !== "none") {
                
            }
        }
    }



    console.log("Printing missing fields");
    console.log(getMissingFields(user_dict));

</script>

<div>
    Ciao
</div>