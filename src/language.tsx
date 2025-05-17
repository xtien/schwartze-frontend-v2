import strings from "./strings.tsx";

function language(){

    const languages = ['nl', 'en', 'fr', 'de', 'es'];
    let lang = navigator.language.substring(0, 2);
    if (!languages.includes(lang)) {
        lang = 'nl'
    }
    strings.setLanguage(lang);
    return lang;
}

export default language
