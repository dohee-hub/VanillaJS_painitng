const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); //canvas context 메소드 반환
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c"; //초기 캔버스 배경, 선 색상
const CANVAS_SIZE = 500; //캔버스 사이즈

canvas.widhth = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle ="white"; //캔버스 기본 배경- 투명 -> 화이트로 설정
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); //캔버스 사이즈 전체 화이트로 채움
ctx.strokeStyle = INITIAL_COLOR; //선 색상 
ctx.fillStyle = INITIAL_COLOR; //캔버스 배경 색상
ctx.lineWidth = 2.5; //선 굵기

let painitng = false;
let filling = false;

// 그림을 멈출때
function stopPaninting(){
    painitng = false;
}

// 그림 다시 시작
function startPainting(){
    painitng = true;
}

//캔버스 안에서 마우스 움직일때
function onMouseMove(event){
    const x = event.offsetX; //x좌표 가져옴
    const y = event.offsetY; //y좌표 가져옴
    if(!painitng){ 
        ctx.beginPath(); //경로설정
        ctx.moveTo(x, y); //시작 좌표 
    }else{
        ctx.lineTo(x, y); //끝 좌표
        ctx.stroke(); // 시작, 끝 좌표로 선 연결
    }
}

//색상 버튼 클릭시
function changeColor(event){
    const color = event.target.style.backgroundColor; //누른 색상의 배경색 가져옴 
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

// 선의 굵기 변할때
function handleRange(event){
    const lineSize = event.target.value;
    ctx.lineWidth = lineSize;
}

//fill, paint 버튼 클릭시
function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "paint";
    }
}

//캔버스 위에 클릭시 캔버스 전체 색상 채워줌
function handleCanvasClick(){
    if(filling){
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

//마우스 우클릭 기본값 막아줌 
function handleCM(event){
    event.preventDefault();
}

//save 버튼 클릭시 
function handleSaveClick(event){
    const image = canvas.toDataURL("image/png"); //png형식으로 이미지 저장 
    const link = document.createElement("a");
    link.href = image; //이미지 주소
    link.download = "PaintJS"; //다운로드시 파일명
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove); //캔버스 위에서 마우스 움직일때
    canvas.addEventListener("mousedown", startPainting); //캔버스 위에서 마우스 클릭시
    canvas.addEventListener("mouseup", stopPaninting); //캔버스 위에서 마우스 뗄때
    canvas.addEventListener("mouseleave", stopPaninting); // 마우스가 캔버스 위에 없을때
    canvas.addEventListener("click", handleCanvasClick); //fill, paint 버튼 클릭시
    canvas.addEventListener("contextmenu", handleCM); //마우스 우클릭시 
}

//색상들 배열로 만들고 각각 실행하여 add~ 호출
Array.from(colors).forEach(color => color.addEventListener("click", changeColor));

if(range){
 range.addEventListener("input", handleRange);
}

if(mode){
 mode.addEventListener("click", handleModeClick);
}

if(save){
 save.addEventListener("click", handleSaveClick);
}