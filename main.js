// variables

const cells = document.querySelectorAll('.cell');
const resetbtn = document.querySelector('.rest');
const curentTurn = document.querySelector('.current-turn');
const player1Score = document.querySelector('.score1');
const player2Score = document.querySelector('.score2');
const draw = document.querySelector('.draw');
const messageConent = document.querySelector('.content');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('close');


const winCombos=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
    [0,3,6]

];

let turn = true;

let usedCells =  [];

let winner = false;

let ties = 0;

let player1={
    symbol : '<i class="fa fa-close"></i>',
    played : [],
    score :0 
}
let player2={
    symbol : '<i class="fa-sharp fa-regular fa-circle"></i>',
    played : [],
    score :0 
}

checkTurn();

for(let i =0; i < 9; i++){
    cells[i].addEventListener('click',()=>{
        if (isEmpety(i)){
            if(turn){
                addSymbol(player1,i);
                turn= false;
                checkWin(player1);
                checkTurn();
            }else{
                addSymbol(player2,i);
                turn = true;
                checkWin(player2);
                checkTurn();
            }
        }else{
            alert('chose an empty cell ');
        }
       
       
    })

}


function addSymbol(player,i){
    cells[i].innerHTML= player.symbol;
    player.played.push(i);
    usedCells.push(i);

}


// to cheack the winner
function checkWin(player){

    if (!winner){
        winCombos.some(combo =>{
            if(combo.every(index => player.played.includes(index))){
                // alert('you won');
                winner = true;
                player.score++;
                showScore();
                setTimeout(showMessage, 500, player,winner);
                // overlay.style.display = 'flex';
                // messageConent.innerHTML = player.symbol + ' is the  <h2> winner</h2>';
                reset();
            }
        });
    }

    if(!winner && usedCells.length ==9 ){


        ties++;
        showScore();
        setTimeout(showMessage, 500);

    }

}

// to chose the empty cell
function isEmpety(i){
    if(usedCells.includes(i)){
        return false;
    }
    return true;

}

// to reset the game
function reset(){
    cells.forEach(cell =>{
        cell.innerHTML='';
    })

    winner = false;

    usedCells=[];
    player1.played = [];
    player2.played = [];

    turn = true;
    checkTurn();
}

resetbtn.addEventListener('click',reset);


function checkTurn(){
    if(turn){
        curentTurn.innerHTML = player1.symbol;
    }else{
        curentTurn.innerHTML = player2.symbol;

    }
}


function showScore(){
    player1Score.innerHTML = player1.score; 
    player2Score.innerHTML = player2.score; 
    draw.innerHTML = ties;
}


function showMessage(player, winner){

    overlay.style.display = 'flex';
    if(winner){
        messageConent.innerHTML = player.symbol + ' is the  <h2> winner</h2>';
    }
    else{
        messageConent.innerHTML = 'It is a  <h2> Draw</h2>';

    }
                reset();
}



closeBtn.addEventListener('click',()=>{
    overlay.style.display = 'none';
})