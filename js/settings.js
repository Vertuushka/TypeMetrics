const unchecked_light = "../img/unchecked_light.svg";
const checked_light = "../img/checked_light.svg";

let checkboxes = [];
let checkbox_imgs = [];

function toggle_custom_checkbox(element, index) {
    console.log(element.checked)
    if (element.checked == true) {
        checkbox_imgs[index].src = checked_light;
    } else {
        checkbox_imgs[index].src = unchecked_light;
    }
}

function settings_init() {
    checkboxes = document.querySelectorAll(".custom_checkbox");
    checkbox_imgs = document.querySelectorAll(".custom_checkbox_img");
    
    checkboxes.forEach((element, index) => {
        element.addEventListener("change", () => toggle_custom_checkbox(element, index))
    });

    checkbox_imgs.forEach(element => {
        element.src = unchecked_light;
    });
}

document.addEventListener("DOMContentLoaded", settings_init);