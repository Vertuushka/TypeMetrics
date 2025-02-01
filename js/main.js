// IMPORTANT! the "language" and "night_mode" should always be the last one in this array
let storage_keys = ["casing", "save_score", "animations", "night_mode"];

let checkbox_unchecked_url  = "../img/unchecked_light.svg";
let checkbox_checked_url    = "../img/checked_light.svg";

let night_mode_unchecked_url    = "../img/night_mode_checked.svg";
let night_mode_checked_url      = "../img/night_mode_unchecked.svg";

class Custom_Checkbox {
    constructor(input_element, label_element, img_element, storage_key) {
        this.element = input_element;
        this.label = label_element;
        this.image = img_element;
        this.storage_key = storage_key;

        this.set_initial_state(localStorage.getItem(this.storage_key));

        this.toggle_checkbox = this.toggle_checkbox.bind(this);
        this.element.addEventListener("change", this.toggle_checkbox);
    }

    set_initial_state(state){
        if (state === "true") {
            this.element.checked = true;
            this.toggle_checkbox(true);
        }
    }

    toggle_checkbox(object, visual_only=false) {
        if (this.element.checked) {
            this.image.src = checkbox_checked_url;
        }
        else {
            this.image.src = checkbox_unchecked_url;
        }
        if (visual_only == false) {
            let current_value = this.element.checked;
            localStorage.setItem(this.storage_key, JSON.stringify(current_value));
        }
        
    }
}

class Night_Mode extends Custom_Checkbox {
    constructor(input_element, label_element, img_element, storage_key) {
        super(input_element, label_element, img_element, storage_key)
    }

    toggle_checkbox(object, visual_only=false) {
        if (this.element.checked == true)
            this.image.src = night_mode_unchecked_url;
        else
            this.image.src = night_mode_checked_url;
        if (visual_only == false) {
            let current_value = this.element.checked;
            localStorage.setItem(this.storage_key, JSON.stringify(current_value));
        }
    }
}

class Custom_Select {
    constructor(select_prefix) {
        this.select = document.querySelector(`.${select_prefix}_select`);
        this.icon = document.querySelector(`.${select_prefix}_select_icon`);
        this.label = document.querySelector(`.${select_prefix}_select_label`);
        this.option = document.querySelector(`.${select_prefix}_options`)
        this.options = document.querySelectorAll(`.${select_prefix}_option`);

        this.toggle_options = this.toggle_options.bind(this);
        this.select.addEventListener("click", this.toggle_options)
    }
    

    toggle_options() {
        this.option.classList.toggle("hidden");
        if(this.option.classList.contains("hidden")) 
            this.icon.style.transform = "rotate(0deg)";
        else
            this.icon.style.transform = "rotate(180deg)";
    }
}

function toggle_visibility(element) {
    element.classList.toggle("hidden");
}

function select_onChange(element, class_prefix) {
    let select_label = document.querySelector(`.${class_prefix}_select_label`);
    select_label.innerHTML = element.innerHTML;

    let options = document.querySelector(`.${class_prefix}_options`);
    toggle_visibility(options);

    let select = document.querySelector(`.${class_prefix}_select`);
    select.dispatchEvent(new Event("change", {bubbles: true}));
}

function custom_select_toggle_options(options, class_prefix, specialFn=null) {
    if (specialFn != null) {
        
    } else {
        // let icon = 
    }
    toggle_visibility(options);
}

function setup_custom_select(class_prefix) {
    let select = document.querySelector(`.${class_prefix}_select`);
    let options = document.querySelector(`.${class_prefix}_options`);
    let option = document.querySelectorAll(`.${class_prefix}_option`);

    option.forEach(element => {
        element.addEventListener("click", () => select_onChange(element, class_prefix))
    })

    select.addEventListener("click", () => custom_select_toggle_options(options, class_prefix));
}

function text_change() {
    console.log("text was changed!")
}

function document_init() {

    let custom_checkboxes = document.querySelectorAll(".custom_checkbox");
    let custom_labels = document.querySelectorAll(".custom_checkbox_label");
    let custom_images = document.querySelectorAll(".custom_checkbox_img");

    custom_checkboxes.forEach((element, index) => {
        new Custom_Checkbox(element, custom_labels[index], custom_images[index], storage_keys[index]);
    });

    new Custom_Select("text");

    new Night_Mode(document.querySelector("#color_scheme"), document.querySelector("#color_scheme_label"), document.querySelector("#color_scheme_img"), "night_mode");
}

document.addEventListener("DOMContentLoaded", document_init)