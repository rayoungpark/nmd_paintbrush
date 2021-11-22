const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

const INITIAL_COLOR = "black";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.fillStyle = "transparent";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
let painting = false;
let filling = false;

const range = document.getElementById("jsRange");
const colorBtns = document.getElementsByClassName("jsColor");
const modeBtn = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

function handleRangeChange(event) {
  ctx.lineWidth = event.target.value;
}

function stopPainting() {
  painting = false;
}
function startPainting() {
  painting = true;
  ctx.beginPath();
}
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
function handleColorClick(event) {
  ctx.strokeStyle = event.target.style.backgroundColor;
  ctx.fillStyle = event.target.style.backgroundColor;

  [...colorBtns].forEach((btn) => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");
}

function handleModeClick() {
  if (filling) {
    modeBtn.innerText = "fill";
    filling = false;
    canvas.style.cursor = "initial";
  } else {
    modeBtn.innerText = "paint";
    filling = true;
    canvas.style.cursor = "pointer";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(e) {
  e.preventDefault();
}

function saveImage(e) {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "myCanvas.png";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

range?.addEventListener("input", handleRangeChange);
modeBtn?.addEventListener("click", handleModeClick);
saveBtn?.addEventListener("click", saveImage);

[...colorBtns].forEach((v) => v.addEventListener("click", handleColorClick));
