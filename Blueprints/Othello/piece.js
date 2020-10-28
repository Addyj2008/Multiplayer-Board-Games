OthelloCF.Piece = class {
    constructor(x, y, player, boolean = true) {
        this.position = {'x' : x, 'y' : y};
        this.orignalColour = player.colour;
        this.colour = player.colour;
        this.switching = false;
        this.switch = false;
        this.display = function() {
            fill(this.colour.r, this.colour.g, this.colour.b)
            ellipseMode(RADIUS);
            ellipse(this.position.x * 55 - 30, this.position.y * 55 - 30, 25, 25);
        }
        if (boolean) {
            Othello.allPieces.push(this);
        }
    }
}

OthelloCF.displayAllPieces = function() {
    for (let loop1 = 0; loop1 < Othello.allPieces.length; loop1++) {
        Othello.allPieces[loop1].display();
    }
}

OthelloCF.switchAll = function(player) {
    for (let loop3 = 0; loop3 < Othello.allPieces.length; loop3++) {
        if (Othello.allPieces[loop3].switch) {
            Othello.allPieces[loop3].colour = player.colour;
            Othello.allPieces[loop3].switch = false;
        }
    }
}

OthelloCF.switchAllFalse = function() {
    for (let loop3 = 0; loop3 < Othello.allPieces.length; loop3++) {
        Othello.allPieces[loop3].switch = false;
    }
}

OthelloCF.switchSwitch = function() {
    for (loop3 = 0; loop3 < Othello.allPieces.length; loop3++) {
        if (Othello.allPieces[loop3].switching) {
            Othello.allPieces[loop3].switch = true;
            Othello.allPieces[loop3].switching = false;
        }
    }
}

OthelloCF.switchingAllFalse = function() {
    for (loop3 = 0; loop3 < Othello.allPieces.length; loop3++) {
        Othello.allPieces[loop3].switching = false;
    }
}

OthelloCF.revertToOrignal = function() {
    for (loop1 = 0; loop1 < Othello.allPieces.length; loop1++) {
        Othello.allPieces[loop1].colour =  Othello.allPieces[loop1].orignalColour;
    }
}