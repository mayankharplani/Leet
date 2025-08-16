function getLanguageName(LanguageId){
    const LANGUAGE_NAMES = {
        74: "TypeScript",
        63: "JavaScript",
        71: "Python",
        62: "Java",
        54: "Cpp"
    };
    return LANGUAGE_NAMES[LanguageId] || "Unknown";
}

export {getLanguageName}



export function getLanguageId(language){
    const languageMap = {
        "PYTHON": 71,
        "JAVASCRIPT": 63,
        "TypeScript": 74,
        "JAVA": 62,
        "Cpp": 54,
    }
    return languageMap[language.toUpperCase()]
}