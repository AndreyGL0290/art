let display = 0;
let canvas = document.getElementById("canvas");
let canvas_bg = document.getElementById("canvas_bg");
let bg = document.getElementById('background_color');
let context = canvas.getContext("2d");
let context_bg = canvas_bg.getContext("2d");
let color = "black";
let brush_width = document.getElementById("marker_width").value;
let mode = "Marker";
let correctarray = document.getElementsByClassName('correction');

// Определяем девайс с которого открыт сайт
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    display = 'Mobile';
} else {
    display = 'Computer';
}

// Корректируем положение объектов на странице
correctarray[0].height = document.getElementById('eraser').height;
correctarray[0].width = document.getElementById('eraser').width;

correctarray[1].height = document.getElementById('clear_button').height;
correctarray[1].width = document.getElementById('clear_button').width;

// Корректируем размеры холстов
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

canvas_bg.width = canvas_bg.clientWidth;
canvas_bg.height = canvas_bg.clientHeight;

// Устанавливаем цет фона
context_bg.fillStyle = bg.value;
context_bg.fillRect(0, 0, canvas_bg.width, canvas_bg.height);

if (display == 'Computer') {
    // Добавляем функцию рисования на компьютере
    canvas.onmousedown = (e) => {
        // Выбираем режим рисования
        mode = document.getElementById("eraser").textContent;
        // Выбираем цвет маркера
        color = document.getElementById("color").value;
        // Выбираем толщину маркера
        brush_width = document.getElementById("marker_width").value;
        canvas.onmousemove = (event) => {
            // Режим маркера
            if (mode == "Eraser") {
                context.fillStyle = color;
                context.fillRect(event.offsetX - brush_width / 2, event.offsetY - brush_width / 2, brush_width, brush_width);
            }
            // Режим ластика
            else if (mode == "Marker") {
                context.clearRect(event.offsetX - brush_width / 2, event.offsetY - brush_width / 2, brush_width, brush_width);
            }
        };
        // Режим маркера
        if (mode == "Eraser") {
            context.fillStyle = color;
            context.fillRect(e.offsetX - brush_width / 2, e.offsetY - brush_width / 2, brush_width, brush_width);
        }
        // Режим ластика
        else if (mode == "Marker") {
            context.clearRect(e.offsetX - brush_width / 2, e.offsetY - brush_width / 2, brush_width, brush_width);
        }
        canvas.onmouseup = () => {
            canvas.onmousemove = null;
        };
    };
}
// Регестрация касания на сенсорном экране
else if (display == 'Mobile') {
    canvas.addEventListener('touchstart', canvas.touchstart = (e) => {
        // Выбираем режим рисования
        mode = document.getElementById("eraser").textContent;
        // Выбираем цвет маркера
        color = document.getElementById("color").value;
        // Выбираем толщину маркера
        brush_width = document.getElementById("marker_width").value;
        // Режим маркера
        if (mode == "Eraser") {
            context.fillStyle = color;
            context.fillRect(e.touches[0].pageX - canvas.getBoundingClientRect().left - brush_width / 2, e.touches[0].pageY - canvas.getBoundingClientRect().top - brush_width / 2, brush_width, brush_width);
        }
        // Режим ластика
        else if (mode == "Marker") {
            context.clearRect(e.touches[0].pageX - canvas.getBoundingClientRect().left - brush_width / 2, e.touches[0].pageY - canvas.getBoundingClientRect().top - brush_width / 2, brush_width, brush_width);

        }
        canvas.addEventListener('touchmove', canvas.touchmove = (event) => {
            // Режим маркера
            if (mode == "Eraser") {
                context.fillStyle = color;
                context.fillRect(event.touches[0].pageX - canvas.getBoundingClientRect().left - brush_width / 2, event.touches[0].pageY - canvas.getBoundingClientRect().top - brush_width / 2, brush_width, brush_width);
            }
            // Режим ластика
            else if (mode == "Marker") {
                context.clearRect(event.touches[0].pageX - canvas.getBoundingClientRect().left - brush_width / 2, event.touches[0].pageY - canvas.getBoundingClientRect().top - brush_width / 2, brush_width, brush_width);
            }
        }, false);
        canvas.addEventListener('touchend', canvas.touchend = () => {
            canvas.addEventListener('touchmove', canvas.touchmove = () => { null }, false);
        }, false);
    }, false)
}

// Отчистка холста
function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}
// Меняем режим рисования для понимания пользователя
function eraser() {
    if (document.getElementById("eraser").textContent == "Eraser") {
        mode = document.getElementById("eraser").textContent = "Marker";
    }
    else {
        mode = document.getElementById("eraser").textContent = "Eraser";
    }
}

// Делаем плавное изменение цвета
bg.addEventListener('input', bg_color, false);

function bg_color() {
    context_bg.fillStyle = bg.value;
    context_bg.fillRect(0, 0, canvas_bg.width, canvas_bg.height);
}

// Корректируем значение толщины маркера если оно неположительное
function width_marker_correction() {
    if (document.getElementById("marker_width").value <= 0) {
        document.getElementById("marker_width").value = -brush_width;
    }
}

// Сохраняем рисунок путем переноса заднего фона и самого рисунка на третий холст, который не виден юзеру
function save() {
    let canvas_save = document.getElementById("canvas_save");
    let context_save = canvas_save.getContext("2d");
    canvas_save.width = canvas_save.clientWidth;
    canvas_save.height = canvas_save.clientHeight;
    // Переносим на холст сохранения холст заднего фона
    context_save.drawImage(canvas_bg, 0, 0, canvas.width, canvas.height);
    // Переносим на холст сохранения холст рисования
    context_save.drawImage(canvas, 0, 0, canvas.width, canvas.height);
    let image = canvas_save.toDataURL("image/jpg");
    document.getElementById("save_button").href = image;
}