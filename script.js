let canvas = document.getElementById("canvas");
let bg = document.getElementById('background_color');
let context = canvas.getContext("2d");
let color = "black";
let brush_width = document.getElementById("marker_width").value;
let style = "Marker";

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

//Добавляем функцию рисования
canvas.onmousedown = (e) => {
    // Выбираем режим рисования
    style = document.getElementById("eraser").textContent;
    // Выбираем цвет маркера
    color = document.getElementById("color").value;
    // Выбираем толщину маркера
    brush_width = document.getElementById("marker_width").value;
    setTimeout(() => {
        canvas.onmousemove = (event) => {
            // Режим ластика
            if (style == "Eraser"){
                context.fillStyle = color;
                context.fillRect(event.offsetX-brush_width/2, event.offsetY-brush_width/2, brush_width, brush_width);
            }
            // Режим маркера
            else if (style == "Marker"){
                context.clearRect(event.offsetX-brush_width/2, event.offsetY-brush_width/2, brush_width, brush_width);
            }
        };
    }, 1);
    // Режим ластика
    if (style == "Eraser"){
        context.fillStyle = color;
        context.fillRect(e.offsetX-brush_width/2, e.offsetY-brush_width/2, brush_width, brush_width);
    }
    // Режим маркера
    else if (style == "Marker"){
        context.clearRect(e.offsetX-brush_width/2, e.offsetY-brush_width/2, brush_width, brush_width);
    }
    canvas.onmouseup = () => {
        canvas.onmousemove = null;
    };
};
// Отчистка холста
function clear(){
    context.clearRect(0,0,canvas.width, canvas.height);
}
// Меняем режим рисования для понимания пользователя
function eraser(){
    if (document.getElementById("eraser").textContent == "Eraser"){
        style = document.getElementById("eraser").textContent = "Marker";
    }
    else{
        style = document.getElementById("eraser").textContent = "Eraser";
    }

}

bg.addEventListener('input', bg_color, false);

// Меняем задний фон холста
function bg_color(){
    document.getElementById("canvas").style.backgroundColor = document.getElementById("background_color").value;
};

// Корректируем значение толщины маркера если оно неположительное
function width_marker_correction(){
    if (document.getElementById("marker_width").value <= 0){
        document.getElementById("marker_width").value = -brush_width;
    }
}