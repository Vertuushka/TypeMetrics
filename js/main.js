// IMPORTANT! the "language" and "night_mode" should always be the last one in this array
let storage_keys = ["casing", "save_score", "animations", "night_mode"];

let checkbox_unchecked_url;
let checkbox_checked_url;

let night_mode_unchecked_url;
let night_mode_checked_url;

let storage_handler;

class Storage_handler {
    constructor(storage_keys) {
        storage_keys.forEach(key => {
            if (localStorage.getItem(key) == null)
                this.set_value(key, false);
            this[key] = localStorage.getItem(key);
        });
    }

    get_value(key) {
        return localStorage.getItem(key);
    }

    set_value(key, value) {
        localStorage.setItem(key, value);
        this[key] = localStorage.getItem(key);
    }
}

class Custom_Checkbox {
    constructor(input_element, label_element, img_element, storage_key) {
        this.element = input_element;
        this.label = label_element;
        this.image = img_element;
        this.storage_key = storage_key;

        this.set_initial_state(storage_handler[storage_key]);

        this.toggle_checkbox = this.toggle_checkbox.bind(this);
        this.element.addEventListener("change", this.toggle_checkbox);
    }

    set_initial_state(state){
        if (state == "true") {
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
            let current_value = JSON.parse(storage_handler.get_value(this.storage_key));
            storage_handler.set_value(this.storage_key, !current_value);
        }
        
    }
}

class Night_Mode extends Custom_Checkbox {
    constructor(input_element, label_element, img_element, storage_key) {
        super(input_element, label_element, img_element, storage_key)
    }

    toggle_checkbox(object, visual_only=false) {
        if (this.element.checked) {
            this.image.src = night_mode_checked_url;
        }
        else {
            this.image.src = night_mode_unchecked_url;
        }
        if (visual_only == false) {
            let current_value = JSON.parse(storage_handler.get_value(this.storage_key));
            storage_handler.set_value(this.storage_key, !current_value);
        }
        
    }
}

function document_init() {
    checkbox_unchecked_url = "../img/unchecked_light.svg";
    checkbox_checked_url = "../img/checked_light.svg";

    night_mode_checked_url = "../img/night_mode_checked.svg";
    night_mode_unchecked_url = "../img/night_mode_unchecked.svg";

    // IMPORTANT only simple true-false circle checkboxes should be selected!
    let custom_checkboxes = document.querySelectorAll(".custom_checkbox");
    let custom_labels = document.querySelectorAll(".custom_checkbox_label");
    let custom_images = document.querySelectorAll(".custom_checkbox_img");

    storage_handler = new Storage_handler(storage_keys);

    custom_checkboxes.forEach((element, index) => {
        new Custom_Checkbox(element, custom_labels[index], custom_images[index], storage_keys[index]);
    });

    new Night_Mode(document.querySelector("#color_scheme"), document.querySelector("#color_scheme_label"), document.querySelector("#color_scheme_img"));
}

document.addEventListener("DOMContentLoaded", document_init)