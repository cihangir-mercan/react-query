const API_KEY = process.env.GOOGLE_API_KEY;
const FROM_LANG = 'en';
const TO_LANG = 'tr';
let BASE_URL = `https://translation.googleapis.com/language/translate/v2?format=text&key=${API_KEY}`;
BASE_URL += `&source=${FROM_LANG}`;
BASE_URL += `&target=${TO_LANG}`;

// it gets text, returns translated text after some response time
export const translateHelper = (text)  =>{
    const url = `${BASE_URL}&q=${encodeURI(text)}`
    return fetch(url, {  // Return promise
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(res => res.json())
        .then((response) => {
            return response.data.translations.map((elem) =>{
                return elem.translatedText;
            }).join("\n");
        })
        .catch(error => {
            console.error("There was an error with the translation request: ", error);
        });
}

export const autoResize = (leftTextArea, rightTextArea) => {
    leftTextArea.style.height = "auto";
    leftTextArea.style.height = (leftTextArea.scrollHeight) + "px";
    rightTextArea.style.height = "auto";
    rightTextArea.style.height = (leftTextArea.scrollHeight) + "px";
}