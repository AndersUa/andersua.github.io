var canvas;
var cell_height;
var cell_width;
var CELL_BORDER_X = 3;
var CELL_BORDER_Y = 3;
var board_height = 15, board_width = 15;

var paterns =[
        [
            [0,1,0],
            [0,1,0],
            [0,1,0]
        ],
        [
            [1,0,0],
            [1,1,1],
            [0,0,0]
        ],
        [
            [0,0,1],
            [1,1,1],
            [0,0,0]
        ],
        [
            [1,1,0],
            [0,1,1],
            [0,0,0]
        ],
        [
            [0,1,1],
            [1,1,0],
            [0,0,0]
        ],
        [
            [0,1,0],
            [1,1,1],
            [0,0,0]
        ]
    ];

var currentPatern;
var xOffset;
var yOffset;
var updateDelay;
var board;

function init(){
    
    canvas = document.getElementById('canvas');
    cell_height = canvas.height / board_height;
    cell_width = canvas.width / board_width;
    window.addEventListener("keydown", windowKeyDown, false);
    window.addEventListener("keyup", windowKeyUp, false);
    
    currentPatern = paterns[getRandom(paterns.length)];
    yOffset = currentPatern.length*-1;
    xOffset = Math.floor(board_width/2)-Math.floor(currentPatern[0].length/2);
    updateDelay = 500;
    board = createEmptyArray(board_width, board_height);
    console.log(xOffset+","+yOffset);
    updateGame();
    drow();
}

function updateGame(){
    yOffset++;
    if(isCollision()==true){
        yOffset--;
        copyPaternToBoard();
        yOffset = 0;
    }
    setTimeout(updateGame, updateDelay);
}

function isCollision(){
    if(yOffset+findLoweOffset()>=board.length)
        return true;
    for(var i =0; i<currentPatern.length; i++){
        for(var j=0; j<currentPatern[i].length; j++){
            if(currentPatern[i][j] == 1 && board[i+xOffset, j+yOffset] ==1)
                return true;
        }            
    }
    return false;
}

function copyPaternToBoard(){
    for(var i =0; i<currentPatern.length; i++){
        for(var j=0; j<currentPatern[i].length; j++){
            if(currentPatern[i][j] == 1)
                board[i+xOffset, j+yOffset] = 1;
        }            
    }
}

function findLoweOffset(){
    for(var i =currentPater.length - 1; i>=0; i--){
    for(var j =0; j<currentPater[i].length; j++){
        if(currentPater[i][j]==1)
            return i;
        }
    }
    return 0;
}
       
function drow(){
    var buffer = document.createElement('canvas');
    buffer.height = canvas.height;
    buffer.width = canvas.width;
    var buffer_context = buffer.getContext('2d');
    var context = canvas.getContext('2d');
    buffer_context.fillStyle = '#FFDD00';

    
    for(var i =0; i<currentPatern.length; i++){
        for(var j =0; j<currentPatern[i].length; j++){
            if(currentPatern[i][j]==1){
                drawRect(j+xOffset,i+yOffset, buffer_context);
            }
        }
    }
    
    for(var i =0; i<board.length; i++){
        for(var j =0; j<board[i].length; j++){
            if(board[i][j]==1){
                drawRect(j,i, buffer_context);
            }
        }
    }
    
    context.clearRect (0, 0, canvas.width, canvas.height);
    context.drawImage(buffer, 0, 0);  
    setTimeout(drow, 25);
}

function drawRect(x,y,context){
    context.fillRect(x * cell_width + CELL_BORDER_X, 
                     y * cell_height + CELL_BORDER_Y, 
                     cell_width - CELL_BORDER_X * 2, 
                     cell_height - CELL_BORDER_Y * 2);
}

function windowKeyDown(e){
    switch(e.keyCode){
        case 37://left
            if(xOffset>0)
                xOffset--;
            break;
        case 39://right
            if(xOffset<board_width-currentPatern.length)
                xOffset++;
            break;
        case 38://up
            currentPatern = rotatePatern(currentPatern);
            break;
        case 40://down
            //updateDelay = updateDelay /2;
            break;
    }
}

function windowKeyUp(e){
    if(e.keyCode==40){
        //updateDelay = updateDelay * 2;
    }
}

function rotatePatern(m){
    var tmp = new Array(m.length);
    for(var i=0; i<m.length; i++){
        tmp[i] = new Array(m[i].length);
        for(var j=0; j<m.length; j++){
            tmp[i][j]=m[m[i].length-j-1][i];
        }
    }
    return tmp;
}

function getRandom(max){
    return Math.floor(Math.random()*max);
}

function createEmptyMatryx(x,y){
    var tmp = new Array(x);
    for(var i =0; i<x; i++){
        tmp[i] = new Array(y);
        for(var j=0; j<y; j++){
            tmp[i][j]=0;
        }
    }
    return tmp;
}

init();