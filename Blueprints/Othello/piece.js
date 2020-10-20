let allPieces = [];

class Piece {
    constructor(x, y, player) {
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
        allPieces.push(this);
    }
}

function displayAllPieces() {
    for (loop1 = 0; loop1 < allPieces.length; loop1++) {
        allPieces[loop1].display();
    }
}

function switchAll(player) {
    for (loop3 = 0; loop3 < allPieces.length; loop3++) {
        if (allPieces[loop3].switch) {
            allPieces[loop3].colour = player.colour;
            allPieces[loop3].switch = false;
        }
    }
}

function switchAllFalse() {
    for (loop3 = 0; loop3 < allPieces.length; loop3++) {
        allPieces[loop3].switch = false;
    }
}

function switchSwitch() {
    for (loop3 = 0; loop3 < allPieces.length; loop3++) {
        if (allPieces[loop3].switching) {
            allPieces[loop3].switch = true;
            allPieces[loop3].switching = false;
        }
    }
}

function switchingAllFalse() {
    for (loop3 = 0; loop3 < allPieces.length; loop3++) {
        allPieces[loop3].switching = false;
    }
}

function revertToOrignal() {
    for (loop1 = 0; loop1 < allPieces.length; loop1++) {
        allPieces[loop1].colour =  allPieces[loop1].orignalColour;
    }
}