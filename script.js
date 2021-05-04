let canvas = document.getElementById("canvas");
let bg = document.getElementById('background_color');
let context = canvas.getContext("2d");
let color = "black";
let brush_width = document.getElementById("marker_width").value;
let mode = "Marker";
let correctarray = document.getElementsByClassName('correction');

// Корректируем положение объектов на странице
correctarray[0].height = document.getElementById('eraser').height;
correctarray[0].width = document.getElementById('eraser').width;

correctarray[1].height = document.getElementById('clear_button').height;
correctarray[1].width = document.getElementById('clear_button').width;

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

// Задаем задний фон непрозрачный на сохраненной картинке
context.fillStyle = bg.value;
context.fillRect(0, 0, canvas.width, canvas.height);

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
            if (mode == "Eraser"){
                context.fillStyle = color;
                context.fillRect(event.offsetX-brush_width/2, event.offsetY-brush_width/2, brush_width, brush_width);
            }
            // Режим ластика
            else if (mode == "Marker"){
                context.fillStyle = bg.value;
                context.fillRect(event.offsetX-brush_width/2, event.offsetY-brush_width/2, brush_width, brush_width);
            }
        };
    // Режим маркера
    if (mode == "Eraser"){
        context.fillStyle = color;
        context.fillRect(e.offsetX-brush_width/2, e.offsetY-brush_width/2, brush_width, brush_width);
    }
    // Режим ластика
    else if (mode == "Marker"){
        context.fillStyle = bg.value;
        context.fillRect(event.offsetX-brush_width/2, event.offsetY-brush_width/2, brush_width, brush_width);
    }
    canvas.onmouseup = () => {
        canvas.onmousemove = null;
    };
};

// Отчистка холста
function clear(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = bg.value;
    context.fillRect(0, 0, canvas.width, canvas.height);
}
// Меняем режим рисования для понимания пользователя
function eraser(){
    if (document.getElementById("eraser").textContent == "Eraser"){
        mode = document.getElementById("eraser").textContent = "Marker";
    }
    else{
        mode = document.getElementById("eraser").textContent = "Eraser";
    }
}

// Делаем плавное изменение цвета
bg.addEventListener('input', bg_color, false);

function bg_color(){
    context.fillStyle = bg.value;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

// Корректируем значение толщины маркера если оно неположительное
function width_marker_correction(){
    if (document.getElementById("marker_width").value <= 0){
        document.getElementById("marker_width").value = -brush_width;
    }
}

// Сохраняем рисунок
document.getElementById("save_button").onclick = function(){
    let image = canvas.toDataURL("image/jpg");
    this.href = image;
}