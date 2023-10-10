const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        moleHP: document.querySelector("#moleHP"),
        playerHP: document.querySelector("#hitpoints"),
    },
    values: {
        //valores pra Giant Mole
        molePos: 0,
        maxMoleHP: 200,
        currentMoleHP: 200,
        moleMaxHit: 21,
        //valores pra Player
        playerMaxHP: 99,
        playerCurrentHP: 99,
        playerMaxHit: 36,
        bonusDamageDH: 0,
        dh: true,
        //tempo
        tempo: 60,
    },
    actions: {
        countDown: setInterval(speedRunTime, 1000),
        timeId: setInterval(moleSurface, 1000),
        moleIsDead: setInterval(moleKilled, 1000),
    },
};
//determina o tempo que você tem pra matar a Giant Mole
function speedRunTime(){
    state.values.tempo--;
    state.view.timeLeft.textContent = state.values.tempo
    if(state.values.tempo <= 0){
        clearInterval(state.actions.countDown);
        clearInterval(state.actions.timeId);
        //playSound("perdeu")
        alert(`O tempo acabou!, você deu ${state.values.currentMoleHP - state.values.maxMoleHP} de dano na Mole!`)
    }
}

function moleKilled(){
    if(state.values.currentMoleHP <= 0){
        clearInterval(state.actions.countDown);
        clearInterval(state.actions.timeId);
        clearInterval(state.actions.moleIsDead);
        //playSound("ganhou")
        alert('Você matou a Giant Mole! Falador te deve uma!');
    }
}

//indica onde a Giant Mole está no momento
function moleSurface(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });
    let randomNum = Math.floor(Math.random()*9);
    let randomSqr = state.view.squares[randomNum];
    randomSqr.classList.add("enemy");
    state.values.molePos = randomSqr.id;
}

//faz a Giant Mole mudar de lugar (moveEnemy no projeto original vou deixar aqui pois depois pretendo por outros tempos diferentes dependendo da seleção do jogador)
/*function moleDigTime(){
    state.values.timeId = setInterval(moleSurface, state.values.gamespeed);
}*/

//indica o que acontece quando clica na mole
//tem que arrumar como funciona o dano pra ser igual no runescape, e não mostrar dano abaixo de 0. se a vida do jogador chegar a 0 ele também deve perder
function onHit(){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown", ()=>{
            if(square.id === state.values.molePos){
                state.values.currentMoleHP -= Math.floor(Math.random() * dano());
                state.view.moleHP.textContent = state.values.currentMoleHP;
                state.values.molePos = null;
                playSound('hit.mp3');
            }            
        });
    });
};
//tem que arrumar essa função pro jogador perder vida
/*function moleHit(){
}*/

//Arrumar pra quando não tiver usando DHset
function dano(){
    if(state.values.dh === true){
        return state.values.playerMaxHit + state.values.bonusDamageDH
    } else {
        return state.values.playerMaxHit;
    }

}

function playSound(track){
    let audio = new Audio(`./src/audio/${track}`);
    audio.play();
}

function BgMusic(track){
    let bgTrack = new Audio(`./src/audio/${track}`);
    bgTrack.play();
}

function moleDamage(){
    return state.values.moleMaxHit
}

function setDamageDH(){
    return 1+((state.values.playerMaxHP - state.values.playerCurrentHP)/100)*(state.values.playerMaxHP/100);
}

function main() {
    
    setDamageDH();
    onHit();
    //moleHit();
};


main();
BgMusic('The_Mad_Mole.ogg')