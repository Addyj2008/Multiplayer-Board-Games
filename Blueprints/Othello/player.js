let allPlayers = [], loop1, loop2, loop3, loop4, loop5, loop6, loop7, condition1;

class Player {
    constructor(r, g, b, name) {
        this.name = name;
        this.colour = {'r' : r, 'g' : g, 'b' : b};
        this.turn = allPlayers.length;
        this.turnText = function(x, y) {
            if (turn % allPlayers.length === this.turn) {
                fill(this.colour.r, this.colour.g, this.colour.b);
                text("Turn of : " + this.name, x, y);
            }
        }
        this.score = 0;
        this.getScore = function() {
            this.score = 0;
            for(loop2 = 0; loop2 < allPieces.length; loop2++) {
                if (allPieces[loop2].colour.r === this.colour.r && allPieces[loop2].colour.g === this.colour.g && allPieces[loop2].colour.b === this.colour.b) {
                    this.score++;
                }
            }
            return this.score;
        }
        this.printScore = function(x, y) {
            strokeWeight(0);
            fill(this.colour.r, this.colour.g, this.colour.b);
            text("Score of " + this.name + " = " + this.getScore(), x, y);
        }
        allPlayers.push(this);
    }
}

function turnTextAll(x, y) {
    for(loop1 = 0; loop1 < allPlayers.length; loop1++) {
        allPlayers[loop1].turnText(x, y);
    }
}

function turnPossible(turn) {
    for (loop1 = 0; loop1 < allEmptySpaces.length; loop1 += 1) {
        if (allEmptySpaces[loop1].empty) {
            for(loop2 = 0; loop2 < allPlayers.length; loop2++) {
                if (allPlayers[loop2].turn === turn % allPlayers.length) {
                    for (loop6 = -1; loop6 <= 1; loop6 += 1) {
                        for (loop7 = -1; loop7 <= 1; loop7 += 1) {
                            if (loop7 != 0 || loop6 != 0) {
                                condition1 = true;
                                for (loop3 = {'x' : allEmptySpaces[loop1].position.x, 'y' : allEmptySpaces[loop1].position.y}; condition1;) {
                                    loop3.x += loop6;
                                    loop3.y += loop7;
                                    condition1 = false;
                                    for (loop4 = 0; loop4 < allPieces.length; loop4++) {
                                        if (allPieces[loop4].position.x === loop3.x && allPieces[loop4].position.y === loop3.y) {
                                            if (allPlayers[loop2].colour.r != allPieces[loop4].colour.r || allPlayers[loop2].colour.g != allPieces[loop4].colour.g || allPlayers[loop2].colour.b != allPieces[loop4].colour.b) {
                                                allPieces[loop4].switching = true;
                                            }
                                            condition1 = true;
                                            if (allPlayers[loop2].colour.r === allPieces[loop4].colour.r && allPlayers[loop2].colour.g === allPieces[loop4].colour.g && allPlayers[loop2].colour.b === allPieces[loop4].colour.b) {
                                                switchSwitch();
                                                condition1 = false;
                                            }
                                            loop4 = allPieces.length;
                                        }
                                    }
                                }
                                switchingAllFalse();
                            }
                        }
                    }
                    for (loop4 = 0; loop4 < allPieces.length; loop4 += 1) {
                        if (allPieces[loop4].switch) {
                            switchAllFalse();
                            return true;
                        }
                    }
                }
            }
        }
    }
    return false;
}

function anyTurnPossible() {
    for (loop5 = 0; loop5 < allPlayers.length; loop5 += 1) {
        if (turnPossible(loop5)) {
            return true;
        }
    }
    return false;
}