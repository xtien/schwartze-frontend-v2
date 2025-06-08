import strings from "./strings.tsx";

function language(){

    const languages = ['NL', 'EN', 'FR', 'DE', 'ES'];
    let lang = navigator.language.substring(0, 2).toUpperCase();
    if (!languages.includes(lang)) {
        lang = 'NL'
    }
    strings.setLanguage(lang);
    return lang;
}

export default language
