const easy = cardList.slice(0, 12);
const normal = cardList.slice(0, 20);
const hard = cardList;

let cardArray = '';
cardArray = easy; // Start with easy level
cardArray.sort(() => 0.5 - Math.random()); // Shuffle the cards

const container = document.querySelector('.container');
const result = document.querySelector('.result');
let score = 0;
result.textContent = score;

// Create a board
function createBoard(){
    cardArray.forEach(() => {
        const card = document.createElement('div');
        card.classList = 'card';
    
        const cardFront = document.createElement('div'); // Card front
        cardFront.classList = 'front';
    
        const cardBack = document.createElement('div'); // Card back
        cardBack.classList = 'back';
    
        card.appendChild(cardFront);
        card.appendChild(cardBack);
        container.appendChild(card);
    });
};
createBoard();



let chosenCardsName = [];
let chosenCardsIndex = [];

// Check the 2 flipped cards
function checkForMatch(){
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.addEventListener('click', (e)=>{
            e.currentTarget.classList.add('flipped'); // Flip the clicked card
            e.currentTarget.querySelector('.front').style.backgroundImage = `url(${cardArray[index].img})`; // Add an emoji when it's flipped (so that user can't cheat using F12 key)
    
            chosenCardsName.push(cardArray[index].name);
            chosenCardsIndex.push(index);
            const firstCardIndex = chosenCardsIndex[0]; // Index of the first flipped card
            const secondCardIndex = chosenCardsIndex[1]; // Index of the second flipped card
            
            if(chosenCardsName.length === 2 && chosenCardsName[0] === chosenCardsName[1]){ // If there are 2 flipped cards and they have the same names
                setTimeout(function(){
                    cards[firstCardIndex].classList.add('correct'); // Remove the cards on the screen
                    cards[secondCardIndex].classList.add('correct');
    
                    score++;
                    result.textContent = score;
    
                    if(score === cardArray.length/2){ // If there is no more cards to flip
                        container.innerHTML = '<p class="finished">FINISHED!</p>';
                    };
                }, 500);
    
                chosenCardsName = [];
                chosenCardsIndex = [];
    
            }else if(chosenCardsName.length === 2 && chosenCardsName[0] != chosenCardsName[1]){ // If there are 2 flipped cards and they have the different names
                setTimeout(function(){
                    cards[firstCardIndex].classList.remove('flipped'); // Relip the cards
                    cards[secondCardIndex].classList.remove('flipped');
                    cards[firstCardIndex].querySelector('.front').style.backgroundImage = ''; // Remove the card's img src
                    cards[secondCardIndex].querySelector('.front').style.backgroundImage = '';
                }, 500);

                chosenCardsName = [];
                chosenCardsIndex = [];
            };
        });
    });
};
checkForMatch();



// Select the levels
const levelBtns = document.querySelectorAll('.level_box button');
levelBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
        if(btn.classList.contains('easy')){ // Easy level
            cardArray = easy;
            container.classList.remove('normal', 'hard');
            resetBoard();
        }else if(btn.classList.contains('normal')){ // Normal level
            cardArray = normal;
            container.classList.add('normal');
            container.classList.remove('hard');
            resetBoard();
        }else if(btn.classList.contains('hard')){ //Hard level
            cardArray = hard;
            container.classList.add('hard');
            container.classList.remove('normal');
            resetBoard();
        };
    });
});



// Reset the board
function resetBoard(){
    container.innerHTML = '';
    chosenCardsName = [];
    chosenCardsIndex = [];
    score = 0;
    result.textContent = score;
    cardArray.sort(() => 0.5 - Math.random()); // Shuffle the cards
    createBoard(); // Recreate the board with a new array(level)
    checkForMatch();
};