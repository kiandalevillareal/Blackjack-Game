var isAlive = false
var sum = 0
var cash = 100
var currentCash = 0
var winCash = 0
var cards = []
var screenEl = document.getElementById("screen")
var bankersCardEl = document.getElementById("bankersCard-el")
var headerEl = document.getElementById("h1-el")
var messageEl = document.getElementById("message-el")
var cardsEl = document.getElementById("cards-el")
var sumEl = document.querySelector("#sum-el")
var startBtn = document.getElementById("start-btn")
var hitBtn = document.getElementById("hit-btn")
var resetBtn = document.getElementById("reset-btn")
var cashEl = document.getElementById("cash-el")
var playerEl = document.getElementById("player-el")
var betAmount = document.getElementById("bet-el")
var betBtn = document.getElementById("bet-btn")
var standBtn = document.getElementById("stand-btn")

currentCash = cash
cashEl.textContent = "CASH: $" + currentCash

var player = {
    name: "Bet: $",
    bet: 0
}

playerEl.textContent = player.name + " " + player.bet
bankersCardEl.textContent = "?"

function disable(x){
    x.disabled = true
}

function enable(x){
    x.disabled = false
}

disable(hitBtn)
disable(resetBtn)
disable(startBtn)
disable(standBtn)
disable(revealBtn)

function reset(){
    sum = 0
    cards = []
    isAlive = false
    sumEl.textContent = "Sum: "
    cardsEl.textContent = "Cards: "
    disable(startBtn)
    disable(hitBtn)
    disable(resetBtn)
    disable(standBtn)
    playerEl.textContent = player.name + " " + 0
    enable(betBtn)
    messageEl.style.color = "white"
    messageEl.style.fontSize = "35px"
    bankersCardEl.textContent = "?"
    messageEl.textContent = "Want to play?"
    betAmount.value = 0
}

function randomCard(){
    var playerRandom = Math.floor(Math.random()*13) + 1 
    if(playerRandom === 1){
        return 11
    }
    else if(playerRandom > 10){
        return 10
    }
    return playerRandom
}

function start(){
    //alert("GOODLUCK!")
    //prompt("Wish")
    isAlive = true
    var card1 = randomCard()
    cards.push(card1)
    var card2 = randomCard()
    cards.push(card2)
    sum = card1 + card2
    if(sum === 21){
        disable(startBtn)
        disable(hitBtn)
        disable(standBtn)
        enable(resetBtn)
        messageEl.textContent = "YOU'VE GOT BLACKJACK"
        win()
        messageEl.style.color = "goldenrod"
        messageEl.style.fontSize = "60px"
    }
    else if(sum > 21){
        disable(startBtn)
        disable(hitBtn)
        disable(standBtn)
        enable(resetBtn)
        disable(betBtn)
    }
    else{
        render()
        disable(startBtn)
        enable(resetBtn)
        enable(hitBtn)
        enable(standBtn)
        disable(betBtn)
    }
}

function render(){
    cardsEl.textContent = "Cards: "
    for(var i=0; i<cards.length; i++){
        cardsEl.textContent += cards[i] + ", "
    }
    sumEl.textContent = "Sum: " + sum
    if(sum < 21){
        messageEl.textContent = "Do you want to draw a new card?"
    }
    else if(sum === 21){
        messageEl.textContent = "YOU'VE GOT BLACKJACK"
        win()
        messageEl.style.color = "green"
        messageEl.style.fontSize = "60px"
        disable(hitBtn)
        disable(standBtn)
    }
    else{
        messageEl.textContent = "YOU LOST TO THE BANKER"
        messageEl.style.color = "red"
        messageEl.style.fontSize = "60px"
        disable(hitBtn)
        disable(standBtn)
    }
}

function hit(){  
    //confirm("Are you sure?")
    if(isAlive === true && sum < 21){ 
    var card3 = randomCard()
    sum += card3
    cards.push(card3)
    render()
    }
}

function stand(){
    var minimum = 17
    var maximum = 21
    var bankerRandom = Math.floor(Math.random()* (maximum-minimum + 1)) + minimum
    bankersCardEl.textContent = bankerRandom
    if(sum > bankerRandom){
        messageEl.textContent = "YOU WON OVER THE BANKER!"
        win()
        messageEl.style.color = "green"
        messageEl.style.fontSize = "60px"
        disable(hitBtn)
        disable(standBtn)
    }
    else if(sum === bankerRandom){
        messageEl.textContent = "DRAW"
        messageEl.style.color = "goldenrod"
        messageEl.style.fontSize = "60px"
        currentCash = currentCash + (betAmount.value * 1)
        cashEl.textContent = "CASH: $" + currentCash
        disable(hitBtn)
        disable(standBtn)
    }
    else{
        messageEl.textContent = "YOU LOST TO THE BANKER"
        messageEl.style.color = "red"
        messageEl.style.fontSize = "60px"
        disable(hitBtn)
        disable(standBtn)
    }
    disable(hitBtn)
    disable(standBtn)
}

function bet(){
    if(currentCash === 0){
        alert("Insufficient funds")
    }
    else{
        if(betAmount.value <= 0){
            alert("Add a bet")
        }
        else{
            enable(startBtn)
            disable(betBtn)
            player.bet = betAmount.value
            playerEl.textContent = player.name + player.bet
            currentCash = currentCash - (betAmount.value * 1)
            cashEl.textContent = "CASH: $" + currentCash
        }
    }
}

function win(){
    winCash = currentCash + (betAmount.value * 2)
    cashEl.textContent = "CASH: $" + winCash
    currentCash = winCash
}

