import strings from "./strings.tsx";
import Cookies from "universal-cookie";

function language() {

    const languages = ['nl', 'en', 'fr', 'de', 'es'];
    let lang = navigator.language.substring(0, 2).toUpperCase();
    if (!languages.includes(lang)) {
        lang = 'nl'
    }

    const cookies = new Cookies();
    const cookieLang = cookies.get('language');
    if (cookieLang) {
        strings.setLanguage(cookieLang);
        return cookieLang;
    } else {
        strings.setLanguage(lang);
        return lang;
    }
 }

export default language
