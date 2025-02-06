export const local_strings = {
    en: {
        "ignore_casing": "Ignore casing",
        "words": "words",
        "characters": "characters",
        "errors": "Errors",
        "accuracy": "Accuracy",
        "start": "Start",
        "stop": "Stop",
        "light_mode": "Light mode",
        "dark_mode": "Dark mode",
        "save_score": "Save score",
        "animations": "Animations",
        "privacy_policy": "Privacy policy",
        "references": "References",
        "en_tooltip": "English (English)",
        "sv_tooltip": "Swedish (Svenska)",
        "ru_tooltip": "Russian (Русский)",
        "color_scheme": "Dark/light mode"
    },

    sv: {
        "ignore_casing": "Ignorera versaler/gemener",
        "words": "ord",
        "characters": "tecken",
        "errors": "Fel",
        "accuracy": "Noggrannhet",
        "start": "Starta",
        "stop": "Avbryta",
        "light_mode": "Ljusläge",
        "dark_mode": "Mörkt läge",
        "save_score": "Spara resultat",
        "animations": "Animationer",
        "privacy_policy": "Privacy policy",
        "references": "Referenser",
        "en_tooltip": "English",
        "sv_tooltip": "Swedish (Svenska)",
        "ru_tooltip": "Russian (Русский)",
        "color_scheme": "Ljust/Mörkt läge",
    },

    ru: {
        "ignore_casing": "Игнорировать строчные/прописные",
        "words": "(словa)",
        "characters": "(символы)",
        "errors": "Ошибки",
        "accuracy": "Точность",
        "start": "Старт",
        "stop": "Стоп",
        "light_mode": "Светлый режим",
        "dark_mode": "Темный режим",
        "save_score": "Статистика",
        "animations": "Анимации",
        "privacy_policy": "Политика конфиденциальности",
        "references": "Ссылки",
        "en_tooltip": "English",
        "sv_tooltip": "Swedish (Svenska)",
        "ru_tooltip": "Russian (Русский)",
        "color_scheme": "Темный/светлый режим",
    }
}

export function translate_page(lang) {
    document.querySelector(".ignore_casing_label").innerHTML = local_strings[lang]["ignore_casing"];
    
    document.querySelectorAll("._words").forEach(el => {
        el.innerHTML = local_strings[lang]["words"];
    })
    document.querySelectorAll("._characters").forEach(el => {
        el.innerHTML = local_strings[lang]["characters"];
    })
    document.querySelectorAll("._errors").forEach(el => {
        el.innerHTML = local_strings[lang]["errors"];
    })
    document.querySelectorAll("._accuracy").forEach(el => {
        el.innerHTML = local_strings[lang]["accuracy"];
    })

    document.querySelector(".control_button").innerHTML = local_strings[lang]["start"];
    document.querySelector(".stop_button").innerHTML = local_strings[lang]["stop"];
    
    document.querySelector(".color_scheme_label").innerHTML = local_strings[lang]["color_scheme"];

    document.querySelector(".save_score_label").innerHTML = local_strings[lang]["save_score"];

    document.querySelector(".animations_label").innerHTML = local_strings[lang]["animations"];
}
