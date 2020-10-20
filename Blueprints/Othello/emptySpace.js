let allEmptySpaces = [];

class EmptySpace {
    constructor(x ,y) {
        this.position = {'x' : x, 'y' : y};
        this.empty = true;
        this.display = function() {
            rectMode(CENTER);
            fill(0, 255, 0);
            rect(this.position.x * 55 - 30, this.position.y * 55 - 30, 50, 50);
        }
        this.placePiece = function() {
            if (mouseX - this.position.x * 55 + 30 < 25 && mouseX - this.position.x * 55 + 30 > -25 && mouseY - this.position.y * 55 + 30 < 25 && mouseY - this.position.y * 55 + 30 > -25 && this.empty) {
                for(loop2 = 0; loop2 < allPlayers.length; loop2++) {
                    if (allPlayers[loop2].turn === turn % allPlayers.length) {
                        for (loop6 = -1; loop6 <= 1; loop6 += 1) {
                            for (loop7 = -1; loop7 <= 1; loop7 += 1) {
                                if (loop7 != 0 || loop6 != 0) {
                                    condition1 = true;
                                    for (loop3 = {'x' : this.position.x, 'y' : this.position.y}; condition1;) {
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
                        for (loop3 = 0; loop3 < allPieces.length; loop3 += 1) {
                            if (allPieces[loop3].switch) {
                                switchAll(allPlayers[loop2]);
                                new Piece(this.position.x, this.position.y, allPlayers[loop2]);
                                turn += 1;
                                loop3 = allPieces.length;
                                loop2 = allPlayers.length;
                                loop1 = allEmptySpaces.length;
                            }
                        }
                    }
                }
            }
        }
        allEmptySpaces.push(this);
    }
}

function placePieceAll() {
    for(loop1 = 0; loop1 < allEmptySpaces.length; loop1++) {
        allEmptySpaces[loop1].placePiece();
    }
}

function displayAllEmptySpaces() {
    for (loop1 = 0; loop1 < allEmptySpaces.length; loop1++) {
        allEmptySpaces[loop1].display();
    }
}

function EmptyCheck() {
    for (loop1 = 0; loop1 < allEmptySpaces.length; loop1++) {
        allEmptySpaces[loop1].empty = true;
    }
    for (loop1 = 0; loop1 < allEmptySpaces.length; loop1++) {
        for (loop2 = 0; loop2 < allPieces.length; loop2++) {
            if (allPieces[loop2].position.x === allEmptySpaces[loop1].position.x && allPieces[loop2].position.y === allEmptySpaces[loop1].position.y) {
                allEmptySpaces[loop1].empty = false;
            }
        }
    }
}