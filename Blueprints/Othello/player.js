let Othello = {
    'allPlayers' : [],
    'allPieces' : [],
    'allEmptySpaces' : [],
    'winners' : [],
    'basePieces' : [],
}

let OthelloCF = {};

let OthelloR = {};

OthelloCF.Player = class {
    constructor(r, g, b, name, boolean = true) {
        this.name = name;
        this.colour = {'r' : r, 'g' : g, 'b' : b};
        this.turn = Othello.allPlayers.length;
        this.turnText = function(x, y) {
            if (Othello.turn % Othello.allPlayers.length === this.turn) {
                fill(this.colour.r, this.colour.g, this.colour.b);
                text("Turn of : " + this.name, x, y);
            }
        }
        this.score = 0;
        this.getScore = function() {
            this.score = 0;
            for(let loop2 = 0; loop2 < Othello.allPieces.length; loop2++) {
                if (Othello.allPieces[loop2].colour.r === this.colour.r && Othello.allPieces[loop2].colour.g === this.colour.g && Othello.allPieces[loop2].colour.b === this.colour.b) {
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
        if (boolean) {
            Othello.allPlayers.push(this);
        }
    }
}

OthelloCF.turnTextAll = function(x, y) {
    for(let loop1 = 0; loop1 < Othello.allPlayers.length; loop1++) {
        Othello.allPlayers[loop1].turnText(x, y);
    }
}

OthelloCF.turnPossible = function(turn) {
    for (let loop1 = 0; loop1 < Othello.allEmptySpaces.length; loop1 += 1) {
        if (Othello.allEmptySpaces[loop1].empty) {
            for(let loop2 = 0; loop2 < Othello.allPlayers.length; loop2++) {
                if (Othello.allPlayers[loop2].turn === turn % Othello.allPlayers.length) {
                    for (let loop6 = -1; loop6 <= 1; loop6 += 1) {
                        for (let loop7 = -1; loop7 <= 1; loop7 += 1) {
                            if (loop7 != 0 || loop6 != 0) {
                                let condition1 = true;
                                for (let loop3 = {'x' : Othello.allEmptySpaces[loop1].position.x, 'y' : Othello.allEmptySpaces[loop1].position.y}; condition1;) {
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
                    for (let loop4 = 0; loop4 < Othello.allPieces.length; loop4 += 1) {
                        if (Othello.allPieces[loop4].switch) {
                            OthelloCF.switchAllFalse();
                            return true;
                        }
                    }
                }
            }
        }
    }
    return false;
}

OthelloCF.anyTurnPossible = function() {
    for (let loop5 = 0; loop5 < Othello.allPlayers.length; loop5 += 1) {
        if (OthelloCF.turnPossible(loop5)) {
            return true;
        }
    }
    return false;
}