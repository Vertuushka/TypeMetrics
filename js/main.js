import { local_strings } from "./localization.js"
import { translate_page } from "./localization.js"

const storage_keys = {
    "ignore_casing": "casing",
    "save_score": "save_score",
    "animations": "animations",
    "color_scheme": "night_mode",
    "language": "lang",
}

const svg_content = {
    "checkbox_unchecked": `<mask id="mask0_49_334" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                <rect width="24" height="24" fill="#D9D9D9"/>
                            </mask>
                            <g mask="url(#mask0_49_334)">
                                <path d="M12 24C10.34 24 8.78 23.685 7.32 23.055C5.86 22.425 4.59 21.57 3.51 20.49C2.43 19.41 1.575 18.14 0.945 16.68C0.315 15.22 0 13.66 0 12C0 10.34 0.315 8.78 0.945 7.32C1.575 5.86 2.43 4.59 3.51 3.51C4.59 2.43 5.86 1.575 7.32 0.945C8.78 0.315 10.34 0 12 0C13.66 0 15.22 0.315 16.68 0.945C18.14 1.575 19.41 2.43 20.49 3.51C21.57 4.59 22.425 5.86 23.055 7.32C23.685 8.78 24 10.34 24 12C24 13.66 23.685 15.22 23.055 16.68C22.425 18.14 21.57 19.41 20.49 20.49C19.41 21.57 18.14 22.425 16.68 23.055C15.22 23.685 13.66 24 12 24ZM12 21.6C14.68 21.6 16.95 20.67 18.81 18.81C20.67 16.95 21.6 14.68 21.6 12C21.6 9.32 20.67 7.05 18.81 5.19C16.95 3.33 14.68 2.4 12 2.4C9.32 2.4 7.05 3.33 5.19 5.19C3.33 7.05 2.4 9.32 2.4 12C2.4 14.68 3.33 16.95 5.19 18.81C7.05 20.67 9.32 21.6 12 21.6Z" fill="#0A2540"/>
                            </g>`
    ,
    
    "checkbox_checked": `<path d="M10.82 17.52L19.28 9.06L17.6 7.38L10.82 14.16L7.4 10.74L5.72 12.42L10.82 17.52ZM12.5 24C10.84 24 9.28 23.685 7.82 23.055C6.36 22.425 5.09 21.57 4.01 20.49C2.93 19.41 2.075 18.14 1.445 16.68C0.815 15.22 0.5 13.66 0.5 12C0.5 10.34 0.815 8.78 1.445 7.32C2.075 5.86 2.93 4.59 4.01 3.51C5.09 2.43 6.36 1.575 7.82 0.945C9.28 0.315 10.84 0 12.5 0C14.16 0 15.72 0.315 17.18 0.945C18.64 1.575 19.91 2.43 20.99 3.51C22.07 4.59 22.925 5.86 23.555 7.32C24.185 8.78 24.5 10.34 24.5 12C24.5 13.66 24.185 15.22 23.555 16.68C22.925 18.14 22.07 19.41 20.99 20.49C19.91 21.57 18.64 22.425 17.18 23.055C15.72 23.685 14.16 24 12.5 24Z" fill="#0A2540"/>`
    ,

    "night_mode": `<path d="M12.12 24C10.44 24 8.865 23.68 7.395 23.04C5.925 22.4 4.645 21.535 3.555 20.445C2.465 19.355 1.6 18.075 0.96 16.605C0.32 15.135 0 13.56 0 11.88C0 8.96 0.93 6.385 2.79 4.155C4.65 1.925 7.02 0.54 9.9 0C9.54 1.98 9.65 3.915 10.23 5.805C10.81 7.695 11.81 9.35 13.23 10.77C14.65 12.19 16.305 13.19 18.195 13.77C20.085 14.35 22.02 14.46 24 14.1C23.48 16.98 22.1 19.35 19.86 21.21C17.62 23.07 15.04 24 12.12 24Z" fill="#0A2540"/>`
    ,

    "light_mode": `<path d="M10.9091 4.36364V0H13.0909V4.36364H10.9091ZM18.1636 7.36364L16.6636 5.86364L19.7182 2.72727L21.2455 4.28182L18.1636 7.36364ZM19.6364 13.0909V10.9091H24V13.0909H19.6364ZM10.9091 24V19.6364H13.0909V24H10.9091ZM5.83636 7.30909L2.72727 4.28182L4.28182 2.75455L7.36364 5.83636L5.83636 7.30909ZM19.6909 21.2727L16.6636 18.1364L18.1364 16.6636L21.2455 19.6636L19.6909 21.2727ZM0 13.0909V10.9091H4.36364V13.0909H0ZM4.28182 21.2727L2.75455 19.7182L5.80909 16.6636L6.6 17.4L7.39091 18.1636L4.28182 21.2727ZM12 18.5455C10.1818 18.5455 8.63636 17.9091 7.36364 16.6364C6.09091 15.3636 5.45455 13.8182 5.45455 12C5.45455 10.1818 6.09091 8.63636 7.36364 7.36364C8.63636 6.09091 10.1818 5.45455 12 5.45455C13.8182 5.45455 15.3636 6.09091 16.6364 7.36364C17.9091 8.63636 18.5455 10.1818 18.5455 12C18.5455 13.8182 17.9091 15.3636 16.6364 16.6364C15.3636 17.9091 13.8182 18.5455 12 18.5455Z" fill="#F5F5F5"/>`
    ,

    "sv":   `<g clip-path="url(#clip0_123_2)">
            <path d="M0.726074 0.797852H24.7261V24.7979H0.726074V0.797852Z" fill="#005293"/>
            <path d="M7.00732 0.797852V10.3979H0.726074V15.1979H7.00732V24.7979H11.8073V15.1979H24.7261V10.3979H11.8073V0.797852H7.00732Z" fill="#FECB00"/>
            </g>
            <defs>
            <clipPath id="clip0_123_2">
            <rect x="0.726074" y="0.797852" width="24" height="24" rx="12" fill="white"/>
            </clipPath>
            </defs>`
    ,
    
    "en":   `<g clip-path="url(#clip0_102_34)">
            <path d="M0 0H24V24H0V0Z" fill="#012169"/>
            <path d="M24 0V3L15.0938 12L24 20.7656V24H20.8594L11.9062 15.1875L3.1875 24H0V20.8125L8.71875 12.0469L0 3.46875V0H2.90625L11.9062 8.8125L20.625 0H24Z" fill="white"/>
            <path d="M8.625 15.1875L9.14062 16.7812L1.96875 24H0V23.8594L8.625 15.1875ZM14.4375 14.625L16.9688 15L24 21.8906V24L14.4375 14.625ZM24 0L15 9.1875L14.8125 7.125L21.8438 0H24ZM0 0.046875L9.04688 8.90625L6.28125 8.53125L0 2.29688V0.046875Z" fill="#C8102E"/>
            <path d="M8.25 0V24H15.75V0H8.25ZM0 8.25V15.75H24V8.25H0Z" fill="white"/>
            <path d="M0 9.75V14.25H24V9.75H0ZM9.75 0V24H14.25V0H9.75Z" fill="#C8102E"/>
            </g>
            <defs>
            <clipPath id="clip0_102_34">
            <rect width="24" height="24" rx="12" fill="white"/>
            </clipPath>
            </defs>`
    ,

    "ru": `<g clip-path="url(#clip0_123_5)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H24V24H0V0Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 8.00146H24V23.9999H0V8.00146Z" fill="#0039A6"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 15.9985H24V24.0001H0V15.9985Z" fill="#D52B1E"/>
            </g>
            <defs>
            <clipPath id="clip0_123_5">
            <rect width="24" height="24" rx="12" fill="white"/>
            </clipPath>
            </defs>`
    ,
}

const lang = {
    'sv': "Svenska",
    'en': "English",
    'ru': "Русский",
}

const document_colors = {
    dark: {
        "--dark": "#F5F5F5",
        "--light": "#202020",
        "--text_bg": "#333333",
        "--shadow": "rgba(225, 225, 225, 0.25)"
    },
    light: {
        "--dark": "#0A2540",
        "--light": "#F5F5F5",
        "--text_bg": "#FFFFFF",
        "--shadow": "rgba(0, 0, 0, 0.25)"
    }
}

// GLOBAL OBJECTS

let ignore_casing;
let color_scheme;
let save_score;
let animations;

let text_wrapper;
let language;
let text_select;

let game_controller;

let texts_sv = [];
let texts_en = [];
let texts_ru = [];

let selected_text;

// CLASSES
class Custom_Checkbox {
    constructor(prefix, checked_icon, unchecked_icon, storage_key) {
        this.prefix = prefix;
        this.checkbox = document.querySelector(`.${prefix}_checkbox`);
        this.icon = document.querySelector(`.${prefix}_icon`);
        this.label = document.querySelector(`.${prefix}_label`);

        this.checked_icon = checked_icon;
        this.unchecked_icon = unchecked_icon;
        this.storage_key = storage_key;

        this.checkbox.addEventListener("change", this.on_click.bind(this));
        this.set_value = this.get_value;
        this.on_load();
    }

    get get_value() {
        return JSON.parse(localStorage.getItem(this.storage_key));
    }

    set set_value(value) {
        let new_value = JSON.stringify(value);
        localStorage.setItem(this.storage_key, new_value);
        this.update_state(value);
    }

    on_load() {
        switch (this.prefix) {
            case "color_scheme":
                this.color_scheme_onLoad();
            break;
            case "animations":
                this.animations_onLoad();
            break;
            case "save_score":
                if (this.get_value == null) 
                    this.set_value = true;
                text_wrapper.change_stat_visibility(this.get_value);
            break;
            default:
            break;
        }
    }

    on_click(override=null) {
        this.set_value = this.checkbox.checked;
        if (this.prefix == "color_scheme")
            change_color_scheme(this.get_value);
        if(this.prefix == "animations")
            change_animations(this.get_value);
        if (this.prefix == "save_score")
            text_wrapper.change_stat_visibility(this.get_value);
    }

    toggle_icon() {
        if (this.get_value == true) 
            this.icon.innerHTML = this.checked_icon;
        else
            this.icon.innerHTML = this.unchecked_icon;
    }
    
    update_state(value){
        this.checkbox.checked = value;
        this.toggle_icon();
    }

    color_scheme_onLoad() {
        if (this.get_value == null) {
            if(window.matchMedia('(prefers-color-scheme: dark)').matches == true)
                this.set_value = true;
            else
                this.set_value = false;
        }
        change_color_scheme(this.get_value);
    }

    animations_onLoad() {
        if (this.get_value == null) {
           this.set_value = true;
        }
        change_animations(this.get_value);
    }

    disable() {
        this.checkbox.removeEventListener("change", this.on_click.bind(this));
    }

    enable() {
        this.checkbox.addEventListener("change", this.on_click.bind(this));
    }

}

function change_color_scheme(is_night=false) {
    if (is_night == true) {
        for (let key in document_colors.dark) {
            document.documentElement.style.setProperty(key, document_colors.dark[key]);
        }
    } else {
        for(let key in document_colors.light) {
            document.documentElement.style.setProperty(key, document_colors.light[key]);
        }
    }
}

function change_animations(override=null) {
    if (override == true) {
        document.querySelectorAll(".text_wrapper").forEach(el => {
            el.classList.remove("paused");
        })
        return;
    } 
    if (override == false) {
        document.querySelectorAll(".text_wrapper").forEach(el => {
            el.classList.add("paused");
        })
        return;
    }    
    document.querySelectorAll(".text_wrapper").forEach(el => {
        el.classList.toggle("paused");
    })
}

class Custom_Select {
    constructor(prefix, storage_key=null) {
        this.prefix = prefix;
        this.select = document.querySelector(`.${prefix}_select`);
        this.container = this.select.parentElement;
        this.icon = document.querySelector(`.${prefix}_select_icon`);
        this.label = document.querySelector(`.${prefix}_select_label`);
        this.options = document.querySelector(`.${prefix}_options`);
        this.text;

        if (storage_key != null)
            this.storage_key = storage_key;
        
        this.container.addEventListener("click", this.toggle_options.bind(this));
        document.addEventListener("click", this.toggle_options.bind(this));

        this.on_load();
    }

    get value() {
        if (this.prefix == "text") {
            return this.text;
        }
        if (this.prefix == "language") {
            return JSON.parse(localStorage.getItem(this.storage_key));
        }
    }

    set update_value(value) {
        if (this.prefix == "text") {
            this.text = value;
        }
        if (this.prefix == "language") {
            switch (value) {
                case local_strings.en["en_tooltip"]:
                    value = "en";
                break;
                case local_strings.en["sv_tooltip"]:
                    value = "sv";
                break;
                case local_strings.en["ru_tooltip"]:
                    value = "ru"
                break;
                default:
                break;
            }
            localStorage.setItem(this.storage_key, JSON.stringify(value));
            this.update_icon();
        }
    }

    setup_options() {
        this.options_list = document.querySelectorAll(`.${this.prefix}_option`);
        this.options_list.forEach(option => {
            option.addEventListener("click", this.select_option.bind(this));
        })
        if (this.prefix == "text") {
            this.update_value = this.options_list[0].innerHTML;
            this.label.innerHTML = this.value;
            selected_text = get_text(this.value);
            text_wrapper.update_text_info();
        }
    }

    on_load() {
        if (this.prefix == "text") {
            // this.setup_options();
        }
        if (this.prefix == "language") {
            this.setup_options();
            if (this.value == null) {
                if (navigator.language in lang) 
                    this.update_value = navigator.language;
                else
                    this.update_value = "en";

                this.label.innerHTML = lang[this.value]; 
            }
            translate_page(this.value);
            this.update_icon();
        }
    }

    select_option() {
        if (this.prefix == "language") {
            this.update_value = event.target.innerHTML;
            this.label.innerHTML = lang[this.value];
            translate_page(this.value);
            update_text_options(this.value);
        } else {
            selected_text = get_text(event.target.innerHTML);
            text_wrapper.update_text_info();
            this.update_value = event.target.innerHTML;
            this.label.innerHTML = this.value;
        }
    }

    toggle_options() {
        if (!this.container.contains(event.target)) {
            this.options.classList.add("hidden"); 
        } else {
            event.stopPropagation();
            this.options.classList.toggle("hidden");
        }
    }

    update_icon() {
        if (this.prefix != "language") {
            if(this.options.classList.contains("hidden")) 
                this.icon.style.transform = "rotate(0deg)";
            else
                this.icon.style.transform = "rotate(180deg)";
        } else 
            this.icon.innerHTML = svg_content[this.value];
    }

    remove_options() {
        this.options.innerHTML = "";
    }

    add_option(label) {
        let new_option = create_option(this.prefix, label);
        this.options.appendChild(new_option);
        this.setup_options();
    }
}

function create_option(class_prefix, label) {
    let new_option = document.createElement("p");
    new_option.classList.add(`${class_prefix}_option`);
    new_option.classList.add(`option`);
    new_option.innerHTML = label;
    return new_option;
}

class Text {
    constructor(title, author, text) {
        this.title = title;
        this.author = author;
        this.text = text;

        this.words = text.trim().split(" ").length;
        this.characters = text.length;
    }
}

function update_text_options(lang) {
    text_select.remove_options();
    let texts = get_lang_texts(lang);
    for(let i=0; i < texts.length; i++) 
        text_select.add_option(texts[i].title);
}

class Game_Controller {
    constructor(start_btn, stop_btn) {
        this.start_btn = document.querySelector(`.${start_btn}`);
        this.stop_btn = document.querySelector(`.${stop_btn}`);

        this.stop_btn.classList.add("hidden");
    }
}

class Text_Wrapper{
    constructor() {
        this.wrapper = document.querySelectorAll(".text_wrapper");
        this.text_title = document.querySelectorAll(".text_title");
        this.text_author = document.querySelectorAll(".text_author");
        this.text_words = document.querySelectorAll(".text_words");
        this.text_chars = document.querySelectorAll(".text_chars");

        this.live_wpm = document.querySelector(".live_wpm");
        this.live_nwpm = document.querySelector(".live_nwpm");
        this.live_errors = document.querySelector(".live_errors");
        this.live_accuracy = document.querySelector(".live_accuracy");

        this.text_window = document.querySelector("#text_window");
        this.input = document.querySelector("#overlay_input");

        this.stat = document.querySelector(".text_stat");
        this.best_wpm = document.querySelectorAll(".scoreboard_best_value")[0];
        this.best_nwpm = document.querySelectorAll(".scoreboard_best_value")[1];
        this.best_errors = document.querySelectorAll(".scoreboard_best_value")[2];
        this.best_accuracy = document.querySelectorAll(".scoreboard_best_value")[3];

        this.last_wpm = document.querySelectorAll(".scoreboard_last_value")[0];
        this.last_nwpm = document.querySelectorAll(".scoreboard_last_value")[1];
        this.last_errors = document.querySelectorAll(".scoreboard_last_value")[2];
        this.last_accuracy = document.querySelectorAll(".scoreboard_last_value")[3];
    }

    get value(){
        return this.wrapper[0].classList.contains("hidden");
    }

    change_tab(value){
        this.wrapper[0].classList.toggle("hidden");
        this.wrapper[1].classList.toggle("hidden");
    }

    change_stat_visibility(override=null) {
        if (override != null) {
            if (override == true) {
                this.stat.classList.remove("hidden");
            } else {
                this.stat.classList.add("hidden");
            }
            return;
        }
        this.stat.classList.toggle("hidden");
    }

    update_text_info() {
        this.text_title.forEach(element => {element.innerHTML = selected_text.title});
        this.text_author.forEach(element => {element.innerHTML = selected_text.author});
        this.text_words.forEach(element => {element.innerHTML = selected_text.words});
        this.text_chars.forEach(element => {element.innerHTML = selected_text.characters});

        if (save_score.get_value == true) {
            let statistics = JSON.parse(localStorage.getItem(selected_text.title));
            if (statistics != null) {
                this.best_wpm.innerHTML = statistics["best_wpm"];
                this.best_nwpm.innerHTML = statistics["best_nwpm"];
                this.best_errors.innerHTML = statistics["best_errors"];
                this.best_accuracy.innerHTML = statistics["best_accuracy"];
    
                this.last_wpm.innerHTML = statistics["last_wpm"];
                this.last_nwpm.innerHTML = statistics["last_nwpm"];
                this.last_errors.innerHTML = statistics["last_errors"];
                this.last_accuracy.innerHTML = statistics["last_accuracy"];
            }
        }
    }

    save_stat(data) {
        if (save_score.get_value == true) {
            localStorage.setItem(selected_text.title, JSON.stringify(data));
        }
    }
}

function get_lang_texts(lang) {
    switch (lang) {
        case "sv":
            return texts_sv;
        break;
        case "en":
            return texts_en;
        break;
        case "ru":
            return texts_ru;
        break;
        default:
        break;
    }
}

function get_text(title){
    let texts = get_lang_texts(language.value);
    return Object.values(texts).find(text => text.title === title);
}

function document_init() {
    
    language = new Custom_Select("language", storage_keys["language"]);

    text_wrapper = new Text_Wrapper();

    ignore_casing = new Custom_Checkbox("ignore_casing", 
        svg_content["checkbox_checked"], 
        svg_content["checkbox_unchecked"],
        storage_keys["ignore_casing"]);

    color_scheme = new Custom_Checkbox("color_scheme",
        svg_content["light_mode"],
        svg_content["night_mode"],
        storage_keys["color_scheme"]
    )

    save_score = new Custom_Checkbox("save_score",
        svg_content["checkbox_checked"],
        svg_content["checkbox_unchecked"],
        storage_keys["save_score"]
    )

    animations = new Custom_Checkbox("animations",
        svg_content["checkbox_checked"],
        svg_content["checkbox_unchecked"],
        storage_keys["animations"]
    )
    
    text_select = new Custom_Select("text");
    update_text_options(language.value);

    game_controller = new Game_Controller("control_button", "stop_button");
}

function parse_xml() {

    let doc = this.responseXML;
    let title_elements = doc.getElementsByTagName("title");
    let author_elements = doc.getElementsByTagName("author");
    let language_elements = doc.getElementsByTagName("language");
    let text_elements = doc.getElementsByTagName("text");

    for(let i = 0; i < title_elements.length; i++) {
        switch(language_elements[i].innerHTML) {
            case "sv":
                texts_sv.push(new Text(title_elements[i].innerHTML, 
                                       author_elements[i].innerHTML, 
                                       text_elements[i].innerHTML))
            break;
            case "en":
                texts_en.push(new Text(title_elements[i].innerHTML, 
                    author_elements[i].innerHTML, 
                    text_elements[i].innerHTML))
            break;
            case "ru":
                texts_ru.push(new Text(title_elements[i].innerHTML, 
                    author_elements[i].innerHTML, 
                    text_elements[i].innerHTML))
            break;
            default:
            break;
        }
    }
    document_init();
}

function text_request() {
    let req = new XMLHttpRequest();
    req.addEventListener("load", parse_xml);

    req.open("GET", "texts.xml");
    req.send();
}

document.addEventListener("DOMContentLoaded", text_request)