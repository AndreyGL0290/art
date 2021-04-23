let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let color = "black";
let brush_width = 30;

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
//Добавляем функцию рисования
canvas.onmousedown = (e) => {
    setTimeout(() => {
        canvas.onmousemove = (event) => {
            context.fillStyle = color;
            context.fillRect(event.offsetX-brush_width/2, event.offsetY-brush_width/2, brush_width, brush_width);
        };
    }, 50);
    context.fillStyle = color;
    context.fillRect(e.offsetX-brush_width/2, e.offsetY-brush_width/2, brush_width, brush_width);
    canvas.onmouseup = () => {
        canvas.onmousemove = null;
    };
};
function clear(){
    context.clearRect(0,0,canvas.width, canvas.height);
}