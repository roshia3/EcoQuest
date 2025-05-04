let points = 0;
const dice = document.getElementById("dice");
const questionDialog = document.getElementById("questionDialog");
const questionText = document.getElementById("questionText");
const choicesDiv = document.getElementById("choices");
const resultMessage = document.getElementById("resultMessage");
const hero1 = document.getElementById("hero1");
const hero2 = document.getElementById("hero2");
       
// Get selected character from local storage
const selectedCharacter = localStorage.getItem('selectedCharacter');
let currentHero;

// Set up the selected character
function setupCharacter() {
    hero1.style.display = "none";
    hero2.style.display = "none";

    if (selectedCharacter === "Girl") {
        currentHero = hero1;
    } else if (selectedCharacter === "Boy") {
        currentHero = hero2;
    } //else {
    // currentHero = hero1; // fallback
    //}

    currentHero.style.display = "block";

    const pos = path[currentPos];
    currentHero.style.left = pos.x + "px";
    currentHero.style.top = pos.y + "px";
}

// Coordinates of each box on the board
const path = [
    { x: 365, y: 590 }, // starting
    { x: 198, y: 627 }, // 1st space
    { x: 90, y: 540 }, // 2nd space
    { x: 140, y: 444 }, // 3rd space
    { x: 260, y: 410 }, // 4th space
    { x: 390, y: 420 }, // 5th space
    { x: 557, y: 430 }, // 6th space
    { x: 713, y: 430 }, // 7th space
    { x: 861, y: 415 }, // 8th space
    { x: 975, y: 345 }, // 9th space
    { x: 945, y: 218 }, // 10th space
    { x: 793, y: 200 }, // 11th space
    { x: 651, y: 207 }, // 12th space
    { x: 550, y: 230 }, // 13th space
    { x: 448, y: 245 }, // 14th space
    { x: 320, y: 260}, // 15th space
    { x: 190, y: 255}, // 16th space
    { x: 85, y: 210}, // 17th space
    { x: 65, y: 95}, // 18th space
    { x: 160, y: 20}, // 19th space
    { x: 290, y: -10}, // 20th space
    {x: 415, y: -10}, // 21st space
    {x: 530, y: -3}, // 22nd space
    {x: 650, y: 18}, // 23rd space
    {x: 768, y: 45}, // 24th space
    {x: 920, y: 40}, // 25th space
    {x: 1080, y: 2}, // 26th space
];

let currentPos = 0;
let isMoving = false;

function rollDice() {
    if (isMoving) return; // Prevent rolling while moving
    
    const roll = Math.floor(Math.random() * 4) + 1;

    // Update dice image based on roll
    dice.src = `dice_${roll}.png`;

    // Move the character
    moveCharacter(roll);
}

function moveCharacter(steps) {
    isMoving = true;
    let stepsRemaining = steps;
    const moveInterval = setInterval(() => {
        if (stepsRemaining <= 0) {
            clearInterval(moveInterval);
            isMoving = false;

            checkForX();
            // After moving, check if landed on question block
            checkForQuestion();
            return;
        }
        
        currentPos++;
        if (currentPos >= path.length) {
            currentPos = path.length - 1;
            clearInterval(moveInterval);
            isMoving = false;
            return;
        }
        
        const pos = path[currentPos];
        currentHero.style.left = pos.x + "px";
        currentHero.style.top = pos.y + "px";
        
        // Add pop animation
        currentHero.classList.add("pop-animation");
        setTimeout(() => {
            currentHero.classList.remove("pop-animation");
        }, 300);
        
        stepsRemaining--;
    }, 300); // Move every 300ms
}

function checkForQuestion() {
    if (currentPos == 1 || currentPos == 5 || currentPos == 6 || currentPos == 9 || currentPos == 12 || 
        currentPos == 15 || currentPos == 19 || currentPos == 22 || currentPos == 24 || currentPos == 26) {
        showQuestion(currentPos);
    }
}

function checkForX() {
    if (currentPos == 3 || currentPos == 11 || currentPos == 16 || currentPos == 21 || currentPos == 25) {
        triggerMoveBackwards();
    }
}

function triggerMoveBackwards() {
    const stepsBack = Math.floor(Math.random() * 3) + 1; 
    let stepsRemaining = stepsBack;
    
    isMoving = true;

    const moveInterval = setInterval(() => {
        if (stepsRemaining <= 0) {
            clearInterval(moveInterval);
            isMoving = false;
            checkForQuestion();
            return;
        }

        currentPos--;
        if (currentPos < 0) {
            currentPos = 0;
            clearInterval(moveInterval);
            isMoving = false;
            return;
        }

        const pos = path[currentPos];
        currentHero.style.left = pos.x + "px";
        currentHero.style.top = pos.y + "px";

        currentHero.classList.add("pop-animation");
        setTimeout(() => {
            currentHero.classList.remove("pop-animation");
        }, 300);

        stepsRemaining--;
    }, 500);
}


// Initialize the game
window.onload = function() {
    setupCharacter();
};

function showQuestion(position) {
    // Clear previous question and choices
    questionText.innerHTML = '';
    choicesDiv.innerHTML = '';
    resultMessage.style.display = "none";
    
    // Create question and choices based on position
    switch(position) {
        case 1:
            questionText.innerHTML = "Which action would reduce your carbon footprint the most?";
            addChoice("A) Recycling everything you can", "A");
            addChoice("B) Buying only secondhand clothes", "B");
            addChoice("C) Eating a plant-based diet", "C");
            addChoice("D) Switching to LED light bulbs", "D");
            break;
        case 5:
            questionText.innerHTML = "In her environmental science class, Maya learns that fast fashion creates tons of waste and pollution. What is one smart way to reduce your impact when it comes to clothing?";
            addChoice("A) Buy more clothes during sales", "A");
            addChoice("B) Wash clothes in hot water every time", "B");
            addChoice("C) Reuse, repair, or thrift clothing before buying new", "C");
            addChoice("D) Avoid wearing the same outfit twice", "D");
            break;
        case 6:
            questionText.innerHTML = "Which of the following is considered the most sustainable protein source?";
            addChoice("A) Beef", "A");
            addChoice("B) Pork", "B");
            addChoice("C) Crickets", "C");
            addChoice("D) Chicken", "D");
            break;
        case 9:
            questionText.innerHTML = "Alex notices that his family's electricity bill is unusually high during the summer. After researching, he finds out their air conditioner runs almost all day and their windows are usually open. What is the most effective way to lower both energy use and cost?";
            addChoice("A) Turn the A/C to maximum to cool the house faster", "A");
            addChoice("B) Keep windows open for fresh air all day", "B");
            addChoice("C) Close windows and curtains, and use a programmable thermostat", "C");
            addChoice("D) Buy more fans for every room", "D");
            break;
        case 12:
            questionText.innerHTML = "Which organization created the concept of 'carbon footprint' as part of a marketing campaign?";
            addChoice("A) Greenpeace", "A");
            addChoice("B) BP (British Petroleum)", "B");
            addChoice("C) United Nations", "C");
            addChoice("D) World Wildlife Fund (WWF)", "D");
            break;
        case 15:
            questionText.innerHTML = "Which is the leading cause of tropical deforestation?";
            addChoice("A) Illegal logging", "A");
            addChoice("B) Cattle ranching", "B");
            addChoice("C) Urban expansion", "C");
            addChoice("D) Mining operations", "D");
            break;
        case 19:
            questionText.innerHTML = "Meera conducts a school project comparing households that use natural gas for heating to those using electric heat pumps powered by renewable energy. She finds that while the upfront cost of electric systems is higher, the long-term emissions are significantly lower. What's the most accurate environmental takeaway from her findings?";
            addChoice("A) Natural gas is better because it's cheaper now", "A");
            addChoice("B) Electric heat pumps only work in cold climates", "B");
            addChoice("C) Short-term costs shouldn't outweigh long-term environmental impact", "C");
            addChoice("D) Renewable energy is always free and available", "D");
            break;
        case 22:
            questionText.innerHTML = "What is 'greenwashing'?";
            addChoice("A) Growing plants on rooftops", "A");
            addChoice("B) Misleading consumers to think a product is environmentally friendly", "B");
            addChoice("C) Cleaning polluted rivers and lakes", "C");
            addChoice("D) Using green-colored packaging", "D");
            break;
        case 24:
            questionText.innerHTML = "Which of the following types of plastic can be most commonly recycled curbside in the U.S.?";
            addChoice("A) #1 PET (Polyethylene Terephthalate)", "A");
            addChoice("B) #3 PVC (Polyvinyl Chloride)", "B");
            addChoice("C) #6 PS (Polystyrene)", "C");
            addChoice("D) #7 Other", "D");
            break;
        case 26:
            questionText.innerHTML = "What is the estimated time it takes for fishing lines made from nylon to degrade in the ocean?";
            addChoice("A) 10 years", "A");
            addChoice("B) 40 years", "B");
            addChoice("C) 600 years", "C");
            addChoice("D) 1,000 years", "D");
            break;
        default:
            // Default question if position doesn't match any case
            questionText.innerHTML = "Which of these is the most sustainable practice?";
            addChoice("A) Using disposable plastic bottles", "A");
            addChoice("B) Buying new clothes every season", "B");
            addChoice("C) Using a reusable water bottle", "C");
            addChoice("D) Driving short distances alone", "D");
    }
    
    questionDialog.style.display = "block";
    choicesDiv.style.display = "block";
}

function addChoice(text, value) {
    const button = document.createElement("button");
    button.innerHTML = text;
    button.onclick = function() { submitAnswer(value); };
    choicesDiv.appendChild(button);
    choicesDiv.appendChild(document.createElement("br"));
    choicesDiv.appendChild(document.createElement("br"));
}

function submitAnswer(choice) {
    choicesDiv.style.display = "none"; 
    resultMessage.style.display = "block";
    
    let correctAnswer = "";
    let isCorrect = false;
    
    // Determine correct answer based on current position
    switch(currentPos) {
        case 1:
            correctAnswer = "C";
            isCorrect = (choice === "C");
            break;
        case 5:
        case 6:
        case 9:
            correctAnswer = "C";
            isCorrect = (choice === "C");
            break;
        case 12:
            correctAnswer = "C";
            isCorrect = (choice === "C");
            break;
        case 15:
        case 19:
            correctAnswer = "B";
            isCorrect = (choice === "B");
            break;
        case 22:
            correctAnswer = "B";
            isCorrect = (choice === "B");
            break;
        case 24:
            correctAnswer = "A";
            isCorrect = (choice === "A");
            break;
        case 26:
            correctAnswer = "C";
            isCorrect = (choice === "C");
            break;
        default:
            correctAnswer = "C";
            isCorrect = (choice === "C");
    }
    
    if (isCorrect) {
        resultMessage.innerText = "✅ Correct!\n" + getExplanation(currentPos);
        resultMessage.style.color = "green";
        points++;
        updatePoints();
    } else {
        resultMessage.innerText = `❌ Incorrect. \nCorrect answer: ${correctAnswer}. ` + getExplanation(currentPos);
        resultMessage.style.color = "red";
    }
    if (!isCorrect) {
        moveBackwardsOneStep();
    }

}

function moveBackwardsOneStep() {
if (currentPos > 0) {
currentPos--;

const pos = path[currentPos];
currentHero.style.left = pos.x + "px";
currentHero.style.top = pos.y + "px";

// Pop animation
currentHero.classList.add("pop-animation");
setTimeout(() => {
    currentHero.classList.remove("pop-animation");
}, 500);
}
}

function getExplanation(position) {
    switch(position) {
        case 1:
            return "Eating a plant-based diet cuts emissions much more significantly by reducing the demand for carbon-intensive livestock farming.";
        case 2:
            return "Reusing, repairing, or thrifting clothing reduces waste and pollution from the fashion industry.";
        case 3:
            return "Insects like crickets use very little land, water, and feed to produce high amounts of protein.";
        case 4:
            return "Closing windows and using a programmable thermostat reduces energy waste from air conditioning.";
        case 5:
            return "BP popularized the idea of personal carbon footprints to shift focus onto individual responsibility.";
        case 6:
            return "Most tropical deforestation is driven by clearing land for cattle grazing.";
        case 7:
            return "While electric systems have higher upfront costs, their long-term environmental benefits are significant.";
        case 8:
            return "Greenwashing happens when companies falsely advertise products as environmentally friendly.";
        case 9:
            return "#1 PET plastics are widely accepted in curbside recycling programs for making new products.";
        case 10:
            return "Nylon fishing lines can take up to 600 years to decompose in ocean conditions.";
        default:
            return "Sustainable practices reduce environmental impact in the long term.";
    }
}

function updatePoints() {
const pointsCounter = document.getElementById("pointsCounter");
pointsCounter.innerText = `Points: ${points}`;

// Add pop animation
pointsCounter.classList.add("pop-animation-points");

// Remove animation class after it plays so it can play again next time
setTimeout(() => {
pointsCounter.classList.remove("pop-animation-points");
}, 400); // Match the animation time
}



function closeQuestionDialog() {
    questionDialog.style.display = "none";
}