const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); // context(ctx)는 이 canvas의 픽셀들을 컨트롤함
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

//canvas 는 width 와 height값을 조절해 줘야 한다.
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;

function startPainting(e) {
    painting = true;
}

function stopPainting(e) {
    painting = false;
}

function onMouseMove(e) {
    const x = e.offsetX;
    const y = e.offsetY;
    if(painting) {
        ctx.lineTo(x, y);
        ctx.stroke();
        // 내내 발생하는(그려지는) 중 - lineTo, stroke
    } else {
        ctx.beginPath();//path 시작점
        ctx.moveTo(x, y);
    }
}

function handleColorClick(e) {
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(e) {
    const size = e.target.style.value;
    ctx.lineWidth = size;
}

let filling = false;
function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
        ctx.fillStyle = ctx.strokeStyle;
    }
}

function handleCanvasClick(e) {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(e) {
    e.preventDefault();
}

function handleSaveClick(e) {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "Export_paintJS👨🏻‍🎨";
    link.click();
    
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseLeave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextMenu", handleCM);
}

Array.from(colors).forEach(colorPicker =>
    colorPicker.addEventListener("click", handleColorClick)
    //colorPicker는 반복문 안에 들어갈 각각의 div라고 생각하면 돼
);

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}