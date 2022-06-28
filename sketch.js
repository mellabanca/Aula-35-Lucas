var ball;
var database, position;

function setup(){
    database = firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    var bolaPosition = database.ref("ball/position");
    bolaPosition.on("value", readPosition, mostrarErro);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-3,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(3,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-3);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,3);
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref("ball/position").set({
        "x": position.x + x,
        "y": position.y + y,
    })
}

function mostrarErro(){
    console.log("Parece que não deu certo. Número do erro: 404");
}

function readPosition(dados){
    position = dados.val();
    ball.x = position.x;
    ball.y = position.y;
}