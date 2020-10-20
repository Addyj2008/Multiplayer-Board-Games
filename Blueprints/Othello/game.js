let turn, boardX, boardY, gameState;
let player1, player2;
let winners = [], basePieces = [];

function setup() {
    boardX = 8;
    boardY = 8;
    player1 = new Player(0, 0, 0, "Player 1");
    player2 = new Player(0, 0, 255, "Player 2");
    basePieces = [new Piece(4, 4, player1), new Piece(4, 5, player2), new Piece(5, 4, player2), new Piece(5, 5, player1)];
    createCanvas(boardX * 55 - 5, boardY * 55 + 25 + allPlayers.length * 15);
    turn = 0;
    for (loop1 = 1; loop1 <= boardX; loop1 += 1) {
        for (loop2 = 1; loop2 <= boardY; loop2 += 1) {
            new EmptySpace(loop1, loop2);
        }
    }
    gameState = "PLAY";
    strokeWeight(0);
}

function draw() {
    background(255, 255, 255);
    displayAllEmptySpaces();
    displayAllPieces();
    EmptyCheck();
    if (gameState === "PLAY") {
        if (!turnPossible(turn)) {
            turn += 1;
        }
        turnTextAll(0, boardY * 55 + 10);
        for (loop1 = 0; loop1 < allPlayers.length; loop1 += 1) {
            allPlayers[loop1].printScore(0,  boardY * 55 + 25 + loop1 * 15);
        }
        if (!anyTurnPossible()) {
            endGame();
        }
    } else if (gameState === "END") {
        fill(0, 255, 0);
        text("Press R to restart", 0, boardY * 55 + 10);
        if (winners.length === 1) {
            fill(winners[0].colour.r, winners[0].colour.g, winners[0].colour.b);
            text("The WINNER is : " + winners[0].name, 0, boardY * 55 + 25);
        } else {
            fill(0, 255, 0);
            text("TIE between :", 0, boardY * 55 + 25);
            for (loop1 = 0; loop1 < allPlayers.length; loop1 += 1) {
                fill(winners[loop1].colour.r, winners[loop1].colour.g, winners[loop1].colour.b);
                text((loop1 + 1) + ". " + winners[loop1].name, 0, boardY * 55 + 40 + loop1 * 15);
            }
        }
        if (keyCode === 114) {
            gameState = "PLAY";
            reset();
        }
    }
}

function mouseReleased() {
    if (gameState === "PLAY") {
        placePieceAll();
    }
}

function reset() {
    turn = 0;
    revertToOrignal();
    allPieces = [];
    for (loop1 = 0; loop1 < basePieces.length; loop1 += 1) {
        allPieces.push(basePieces[loop1]);
    }
    winners = [];
}

function endGame() {
    gameState = "END";
    winners.push(allPlayers[0]);
    for (loop1 = 1; loop1 < allPlayers.length; loop1 += 1) {
        if (allPlayers[loop1].getScore() === winners[0].getScore()) {
            winners.push(allPlayers[loop1]);
        } else if (allPlayers[loop1].getScore() > winners[0].getScore()) {
            winners = [allPlayers[loop1]];
        }
    }
}