let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let color = "black";
let brush_width = 30;
let style = "usual";

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

//Добавляем функцию рисования
canvas.onmousedown = (e) => {
    style = document.getElementById("eraser").textContent;
    color = document.getElementById("color").value;
    setTimeout(() => {
        canvas.onmousemove = (event) => {
            if (style == "Eraser"){
                context.fillStyle = color;
                context.fillRect(event.offsetX-brush_width/2, event.offsetY-brush_width/2, brush_width, brush_width);
            }
            else if (style == "Marker"){
                context.clearRect(event.offsetX-brush_width/2, event.offsetY-brush_width/2, brush_width, brush_width);
            }
        };
    }, 1);
    if (style == "Eraser"){
        context.fillStyle = color;
        context.fillRect(e.offsetX-brush_width/2, e.offsetY-brush_width/2, brush_width, brush_width);
    }
    else if (style == "Marker"){
        context.clearRect(e.offsetX-brush_width/2, e.offsetY-brush_width/2, brush_width, brush_width);
    }
    canvas.onmouseup = () => {
        canvas.onmousemove = null;
    };
};

function clear(){
    context.clearRect(0,0,canvas.width, canvas.height);
}

function eraser(){
    if (document.getElementById("eraser").textContent == "Eraser"){
        style = document.getElementById("eraser").textContent = "Marker";
    }
    else{
        style = document.getElementById("eraser").textContent = "Eraser";
    }

}