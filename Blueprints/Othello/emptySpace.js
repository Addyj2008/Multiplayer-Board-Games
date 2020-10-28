OthelloCF.EmptySpace = class {
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
                for(let loop2 = 0; loop2 < Othello.allPlayers.length; loop2++) {
                    if (Othello.allPlayers[loop2].turn === Othello.turn % Othello.allPlayers.length) {
                        for (let loop6 = -1; loop6 <= 1; loop6 += 1) {
                            for (let loop7 = -1; loop7 <= 1; loop7 += 1) {
                                if (loop7 != 0 || loop6 != 0) {
                                    let condition1 = true;
                                    for (let loop3 = {'x' : this.position.x, 'y' : this.position.y}; condition1;) {
                                        loop3.x += loop6;
                                        loop3.y += loop7;
                                        condition1 = false;
                                        for (let loop4 = 0; loop4 < Othello.allPieces.length; loop4++) {
                                            if (Othello.allPieces[loop4].position.x === loop3.x && Othello.allPieces[loop4].position.y === loop3.y) {
                                                if (Othello.allPlayers[loop2].colour.r != Othello.allPieces[loop4].colour.r || Othello.allPlayers[loop2].colour.g != Othello.allPieces[loop4].colour.g || Othello.allPlayers[loop2].colour.b != Othello.allPieces[loop4].colour.b) {
                                                    Othello.allPieces[loop4].switching = true;
                                                }
                                                condition1 = true;
                                                if (Othello.allPlayers[loop2].colour.r === Othello.allPieces[loop4].colour.r && Othello.allPlayers[loop2].colour.g === Othello.allPieces[loop4].colour.g && Othello.allPlayers[loop2].colour.b === Othello.allPieces[loop4].colour.b) {
                                                    OthelloCF.switchSwitch();
                                                    condition1 = false;
                                                }
                                                loop4 = Othello.allPieces.length;
                                            }
                                        }
                                    }
                                    OthelloCF.switchingAllFalse();
                                }
                            }
                        }
                        for (let loop3 = 0; loop3 < Othello.allPieces.length; loop3 += 1) {
                            if (Othello.allPieces[loop3].switch) {
                                OthelloCF.switchAll(Othello.allPlayers[loop2]);
                                new OthelloCF.Piece(this.position.x, this.position.y, Othello.allPlayers[loop2]);
                                Othello.turn += 1;
                                loop3 = Othello.allPieces.length;
                                loop2 = Othello.allPlayers.length;
                                OthelloCF.update();
                            }
                        }
                    }
                }
            }
        }
        Othello.allEmptySpaces.push(this);
    }
}

OthelloCF.placePieceAll = function(){
    if (turn === Othello.turn % Othello.allPlayers.length) {
        for(let loop1 = 0; loop1 < Othello.allEmptySpaces.length; loop1++) {
            Othello.allEmptySpaces[loop1].placePiece();
        }
    }
}

OthelloCF.displayAllEmptySpaces = function() {
    for (let loop1 = 0; loop1 < Othello.allEmptySpaces.length; loop1++) {
        Othello.allEmptySpaces[loop1].display();
    }
}

OthelloCF.EmptyCheck = function() {
    for (let loop1 = 0; loop1 < Othello.allEmptySpaces.length; loop1++) {
        Othello.allEmptySpaces[loop1].empty = true;
    }
    for (let loop1 = 0; loop1 < Othello.allEmptySpaces.length; loop1++) {
        for (let loop2 = 0; loop2 < Othello.allPieces.length; loop2++) {
            if (Othello.allPieces[loop2].position.x === Othello.allEmptySpaces[loop1].position.x && Othello.allPieces[loop2].position.y === Othello.allEmptySpaces[loop1].position.y) {
                Othello.allEmptySpaces[loop1].empty = false;
            }
        }
    }
}