let titles      = [];
let authors     = [];
let languages   = [];
let texts       = [];

let text_select_element;
let swedish_radio;
let english_radio;
let ignore_casing_element;

let text_info;
let text_window;

let text_options = [];
let eng_opt;
let swe_opt;

let text_input;
let controls;

let is_started;
let document_lang;

let current_text;
let current_char;

let wrappers;

let errors;
let stat_gross;
let stat_net;
let stat_acc;
let stat_err;
let start_timestamp;

let stat_canvas;
let canvas_context;

let last_crd = [];
let wpm_data = [];

let sound_controller;

const graph_help_color = "#ECDAB6";
const graph_data_color = "#524342";
const canvas_width = 300;
const canvas_height = 100;

const ALLOWED_CHARS = "abcdefghijklmnopqrstuvwxyzöäåABCDEFGHIJKLMNOPQRSTUVWXYZÖÄÅ.,!;:\"-' ";

const ERROR_SOUND_PATH = "../audio/click.mp3";

const TRANSLATION = {
    en: {
        ignore_casing: "Ignore Casing",
        select_text: "Choose text",
        words: "words",
        characters: "characters",
        type_here: "Type here..."
    },
    sv: {
        ignore_casing: "Ignorera versaler/gemener",
        select_text: "Välj text",
        words: "ord",
        characters: "tecken",
        type_here: "Skriv här..."
    }
}

function toggle_class(object, class_name) {
    object.classList.toggle(class_name);
}

function toggle_class_array(objects, class_name) {
    for (let i = 0; i < objects.length; i++) {
        toggle_class(objects[i], class_name);
    }
}

function toggle_input_state(object) {
    object.toggleAttribute("disabled");
}

function draw_line(color, startX, startY, endX, endY) {
    canvas_context.beginPath();
    canvas_context.strokeStyle = color;
    canvas_context.moveTo(startX, startY);
    canvas_context.lineTo(endX, endY);
    canvas_context.stroke();
    last_crd[0] = endX;
    last_crd[1] = endY;
}

function current_text_index() {
    let title = text_select_element.value;
    let textId = titles.indexOf(title);
    return textId;
}

function reset_text() {
    wrappers = []; 

    text_window.innerHTML = ''; 

    let text = texts[current_text];

    for(let i = 0; i < text.length; i++) {
        let span = document.createElement('span');
        span.innerHTML = text[i];
        text_window.appendChild(span); 
        wrappers.push(span);
    }

    toggle_class(wrappers[0], "current_symbol");
}

function calculate_characters(str) {
    return str.length;
}

function calculate_words(str) {
    return str.trim().split(' ').length;
}

function select_update() {
    if (is_started == true) {
        text_options[current_text].selected = true;
        return;
    }

    current_text = current_text_index(); 
    text_title.innerHTML = titles[current_text]; 
    text_info.innerHTML = `${authors[current_text]} (${calculate_words(texts[current_text])} ${TRANSLATION[document_lang].words}, ${calculate_characters(texts[current_text])} ${TRANSLATION[document_lang].characters})`;
    reset_text(); 
}

function translate_page() {
    document.querySelector("html").setAttribute("lang", document_lang)
    document.querySelector("#ignore_casing_label").innerHTML = TRANSLATION[document_lang].ignore_casing;
    document.querySelector("#select_text_label").innerHTML = TRANSLATION[document_lang].select_text;
    text_input.setAttribute("placeholder", TRANSLATION[document_lang].type_here);
}

function language_update() {
    document_lang = this.value;

    toggle_class_array(eng_opt, "hidden");
    toggle_class_array(swe_opt, "hidden");

    if (this.value == "en") {
        eng_opt[0].selected = true;
    }
    else {
        swe_opt[0].selected = true;   
    }

    select_update();
    translate_page();
}

function select_init() {
    text_select_element = document.querySelector("#select_text");

    swedish_radio = document.querySelector("#lang_swedish");
    english_radio = document.querySelector("#lang_english");
    swedish_radio.addEventListener("change", language_update);
    english_radio.addEventListener("change", language_update);

    swedish_radio.checked = true;
    english_radio.checked = false;

    for(let i = 0; i < titles.length; i++) {
        let new_option = document.createElement('option');
        new_option.setAttribute('value', titles[i]);
        new_option.innerHTML = titles[i];
        text_select_element.appendChild(new_option);
        text_options.push(new_option);

        if (languages[i] === "swedish")
            new_option.setAttribute('class', 'sv');
        else 
            new_option.setAttribute('class', 'en');
    }

    eng_opt = document.querySelectorAll('.en');
    swe_opt = document.querySelectorAll('.sv');

    toggle_class_array(eng_opt, "hidden");
    document_lang = 'sv';
    translate_page();

    text_select_element.addEventListener("change", select_update);

    select_update();
}

function draw_helpers() {
    draw_line(graph_help_color, 0, canvas_height/4, canvas_width, canvas_height/4);
    draw_line(graph_help_color, 0, canvas_height/4*2, canvas_width, canvas_height/4*2);
    draw_line(graph_help_color, 0, canvas_height/4*3, canvas_width, canvas_height/4*3);

    last_crd[0] = 0;
    last_crd[1] = 0;
}

function clear_graph() {
    canvas_context.clearRect(0, 0, canvas_width, canvas_height);
    draw_helpers(); 
}

function reset_game() {
    current_char = 0;
    stat_gross.innerHTML = '0';
    stat_net.innerHTML = '0';
    stat_acc.innerHTML = '100%';
    stat_err.innerHTML = '0';
    errors = 0;
    start_timestamp = 0;
    text_input.value = '';
    wpm_data = [];
    reset_text();
    clear_graph();
}

function toggle_game_state() {
    toggle_class_array(controls, "hidden");
    toggle_input_state(swedish_radio);
    toggle_input_state(english_radio);
    toggle_input_state(ignore_casing_element);
    
    is_started = !is_started;
    if (is_started == true) {
        reset_game();
        start_timestamp = Date.now();
        text_input.focus();        
    } else {
        text_input.value = '';
        text_input.blur();
    }
}

function controls_init() {
    controls = document.querySelectorAll(".control_button");
    toggle_class(controls[1], "hidden");
    is_started = false;

    controls.forEach(element => {
        element.addEventListener('click', toggle_game_state); 
    });
}

function canvas_init() {
    stat_canvas = document.querySelector("#stat_canvas");
    canvas_context = stat_canvas.getContext("2d");
    
    stat_canvas.width = canvas_width;
    stat_canvas.height = canvas_height;

    draw_helpers();
}

function update_canvas() {
    clear_graph();

    let scaleX = canvas_width / current_char;

    wpm_data.forEach((wpm, index) => {
        let endX = index * scaleX;
        let endY = canvas_height - wpm;
        draw_line(graph_data_color, last_crd[0], last_crd[1], endX, endY);
    });
}

function update_stat(is_correct) {
    let current_timestamp = Date.now();

    if (is_correct == false) {
        errors++;
        stat_err.innerHTML = errors;
    }

    stat_acc.innerHTML = `${Math.round(100-errors/(current_char+1)*100)}%`;

    let time_elapsed = (current_timestamp - start_timestamp) / (1000 * 60);
    let grossWPM = Math.round(((current_char+1)/5) / time_elapsed);
    let netWPM = Math.round(grossWPM - errors / time_elapsed);

    if (netWPM < 0 )
        netWPM = 0;

    stat_gross.innerHTML = grossWPM;
    stat_net.innerHTML = netWPM;

    wpm_data.push(grossWPM);
    update_canvas();
}

function handle_text_input(event) {
    if (is_started == false)
        return;

    if(ALLOWED_CHARS.includes(event.key))
    {
        let user_input = event.key;
        let char_to_compare = texts[current_text][current_char];

        if(ignore_casing_element.checked == true) {
            user_input = user_input.toLowerCase();
            char_to_compare = char_to_compare.toLowerCase();
        }

        if(user_input == char_to_compare){
            toggle_class(wrappers[current_char], "right_symbol")
        } else {
            sound_controller.play();
            if (char_to_compare == ' ')
                toggle_class(wrappers[current_char], "wrong_space")
            else
                toggle_class(wrappers[current_char], "wrong_symbol")
        }

        update_stat(user_input == char_to_compare);

        if(event.key == ' ') {
            event.target.value = '';
        }

        if (current_char == texts[current_text].length-1) {
            toggle_game_state();
            return;
        }

        current_char++;

        toggle_class(wrappers[current_char], "current_symbol");
    }        
}

function document_init(is_xml_connected) {
    text_window = document.querySelector("#text_window");

    if (is_xml_connected == false) {
        text_window.innerHTML = "Unable to load texts...";
        return;
    }
    
    text_title = document.querySelector("#text_title");
    text_info = document.querySelector("#text_info");
    stat_gross = document.querySelector("#gross_wpm");
    stat_net = document.querySelector("#net_wpm");
    stat_acc = document.querySelector("#accuracy");
    stat_err = document.querySelector("#errors");
    text_input = document.querySelector("#text_input");
    ignore_casing_element = document.querySelector("#ignore_casing");
    
    text_input.addEventListener("keydown", handle_text_input);

    sound_controller = new Audio(ERROR_SOUND_PATH);

    select_init();
    controls_init();
    // canvas_init();
    reset_game();
}

function xml_connection_fail() {
    document_init(false);
}

function parse_xml() {
    if (this.status != 200) {
        xml_connection_fail();
        return;
    }

    let doc = this.responseXML;
    let title_elements = doc.getElementsByTagName("title");
    let author_elements = doc.getElementsByTagName("author");
    let language_elements = doc.getElementsByTagName("language");
    let text_elements = doc.getElementsByTagName("text");

    for(let i = 0; i < title_elements.length; i++) {
        titles.push(title_elements[i].textContent);
        authors.push(author_elements[i].textContent);
        languages.push(language_elements[i].textContent);
        texts.push(text_elements[i].textContent.trim());
    }

    document_init(true);
}

function get_texts() {
    let req = new XMLHttpRequest();
    req.addEventListener("load", parse_xml);
    req.addEventListener("error", xml_connection_fail)

    req.open("GET", 'texts.xml');
    req.send();
}

document.addEventListener('DOMContentLoaded', get_texts);