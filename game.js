window.addEventListener('load', function(){
	var canvas;
	var scoreText;
	var score=0;
	var cell_height;
	var cell_width;
	var CELL_BORDER_X = 3;
	var CELL_BORDER_Y = 3;
	var head = null;
	var direction = null;
	var board_height = 15, board_width = 15;
	var food = {x:-1,y:-1};

	function init(){
		scoreText = document.getElementById('score');
		canvas = document.getElementById('canvas');
		cell_height = canvas.height / board_height;
		cell_width = canvas.width / board_width;
		window.addEventListener("keydown", windowKeyDown, false);
		head = createNode(Math.floor(board_width/2),Math.floor(board_height/2),null);
		direction = null;
		score = 0;
		setScore(score);
		generateFood();    
		drow();
		updateGame();
		}
	

	function updateGame(){
		if(updateLogic()){
			drow();
			setTimeout(updateGame, 125);
		}
		else{
			alert('Game over. Your score is '+score);
			init();
		}
	}

	function updateLogic(){
		if(direction != null){
			head = createNode(head.x+direction.x, head.y+direction.y, head);
			head.x = (head.x+board_width)%board_width;
			head.y = (head.y+board_height)%board_height;
			var tmp = head.next;
			do{
				if(head.x==tmp.x && head.y == tmp.y)
					return false;
				tmp = tmp.next;
			}while(tmp !=null && tmp.next!=null);
			if(head.x==food.x && head.y==food.y){
				setScore(score++);
				generateFood();
			}
			else{
				var tmp = head;
				while(tmp.next.next!=null){
					tmp = tmp.next;
				}
				tmp.next =null;
			}
		}
		return true;
	}

	function drow(){
		var buffer = document.createElement('canvas');
		buffer.height = canvas.height;
		buffer.width = canvas.width;
		var buffer_context = buffer.getContext('2d');
		var context = canvas.getContext('2d');
		buffer_context.fillStyle = 'red';
		drawRect(food.x,food.y, buffer_context);    
		buffer_context.fillStyle = '#FFDD00';
		var tmp = head;    
		drawRect(tmp.x,tmp.y, buffer_context);    
		do{
			drawRect(tmp.x,tmp.y, buffer_context);    
			tmp=tmp.next;
		}while(tmp!=null);
		context.clearRect (0, 0, canvas.width, canvas.height);
		context.drawImage(buffer, 0, 0);    
	}


	function drawRect(x,y,context){
		context.fillRect(x * cell_width + CELL_BORDER_X, 
						 y * cell_height + CELL_BORDER_Y, 
						 cell_width - CELL_BORDER_X * 2, 
						 cell_height - CELL_BORDER_Y * 2);
	}

	function windowKeyDown(e){
		switch(e.keyCode){
			case 37:
				direction = { x:-1,y:0 };
				break;
			case 39:
				direction = { x:1,y:0 };
				break;
			case 38:
				direction = { x:0,y:-1 };
				break;
			case 40:
				direction = { x:0,y:1 };      
				break;
		}
	}

	function createNode(x,y,next){
		return {x:x,y:y, next:next};
	}

	function getRandom(max){
		return Math.floor(Math.random()*max);
	}

	function generateFood(){
		var tmp_loc ={};
		tmp_loc.x = getRandom(board_width);
		tmp_loc.y = getRandom(board_height);
		var tmp = head;
		do{
			if(tmp.x == tmp_loc.x && tmp.y == tmp_loc.y){
				generateFood();
				return;
			}
			tmp=tmp.next;
		}while(tmp!=null && tmp.next!=null);
		food = tmp_loc;
	}

	function setScore(score){
		scoreText.innerHTML = "Score: " + score;
	}

	init();
});