let form, database, name, score, state, wait = [], oldName, topper = [];

function setup () {
    createCanvas(1000, 1000)
    database = firebase.database();
    form = new Form();
}

function draw() {
    background(255, 255, 255);
    if (state === "Home" && score !== undefined && score !== null) {
        text("Score = " + score.Total, 100, 200);
    } else if (state === "Game Screen" && score !== undefined && score !== null) {
        text("Score = " + score[form.currentGame], 100, 200);   
    }
    if (state === "LeaderBoards") {
        for (loop1 = 0; loop1 < topper.length; loop1++) {
            text((loop1 + 1) + ". " + topper[loop1].name, 150, 150 + loop1 * 15);
            text(topper[loop1].score, 300, 150 + loop1 * 15);
        }
    }
    if (wait[0]) {
        database.ref('Players/' + name).once('value').then((val)=>{
            if (val.val() !== undefined && val.val() !== null) {
                wait[0] = false;
                database.ref('Players/' + oldName).remove();
                form.homePage();
                oldName = null;
            }
        });
    }
    if (wait[1] && form.ls.length > 0) {
        for (let loop0 = 0; loop0 < 10 && loop0 < form.ls.length; loop0++) {
            let highestScore;
            for (let loop1 = 0; loop1 < form.ls.length; loop1++) {
                if (highestScore !== undefined && highestScore !== null) {
                    if (form.ls[loop1].score >= highestScore.score) {
                        let check = true;
                        for (loop2 = 0; loop2 < topper.length; loop2++) {
                            if (topper[loop2].name === form.ls[loop1].name) {
                                check = false;
                            }
                        }
                        if (check) {
                            highestScore = form.ls[loop1];
                        }
                    }
                } else {
                    highestScore = form.ls[loop1]; 
                }
            }
            if (highestScore !== undefined && highestScore !== null) {
                topper.push(highestScore);
            }
        }
        wait[1] = false;
    }
    if (state === "WAIT") {
        text("CODE = " + form.code, 100, 100);
        if (form.games[form.currentGame].form.game !== undefined && form.games[form.currentGame].form.game !== null) {
            if (form.games[form.currentGame].form.game.PlayerCount == form.games[form.currentGame].form.game.PlayerReq) {
                state = form.currentGame;
                form.games[form.currentGame].setup();
            }
        }
    }
    if (state === "Othello") {
        OthelloR = {};
        for (let loop0 in Othello) {
            if (typeof Othello[loop0] == "object") {
                OthelloR[loop0] = {};
                for (let loop1 in Othello[loop0]) {
                    if (typeof Othello[loop0][loop1] == "object") {
                        OthelloR[loop0][loop1] = {};
                        for (let loop2 in Othello[loop0][loop1]) {
                            if (typeof Othello[loop0][loop1][loop2] == "object") {
                                OthelloR[loop0][loop1][loop2] = {};
                                for (let loop3 in Othello[loop0][loop1][loop2]) {
                                    OthelloR[loop0][loop1][loop2][loop3] = Othello[loop0][loop1][loop2][loop3];
                                }
                            } else {
                                OthelloR[loop0][loop1][loop2] = Othello[loop0][loop1][loop2];
                            }
                        }
                    } else {
                        OthelloR[loop0][loop1] = Othello[loop0][loop1];
                    }
                }
            } else {
                OthelloR[loop0] = Othello[loop0];
            }
        }
        for (let loop0 in OthelloR) {
            if (typeof OthelloR[loop0] == "object") {
                for (let loop1 in OthelloR[loop0]) {
                    if (typeof OthelloR[loop0][loop1] == "object") {
                        for (let loop2 in OthelloR[loop0][loop1]) {
                            if (typeof OthelloR[loop0][loop1][loop2] == "function") {
                                OthelloR[loop0][loop1][loop2] = undefined;
                                delete OthelloR[loop0][loop1][loop2];
                            }
                        }
                    }
                }
            }
        }
        database.ref('Games/Othello/' + form.currentGameName + '/Game').update(OthelloR);
        OthelloCF.displayAllEmptySpaces();
        OthelloCF.displayAllPieces();
        OthelloCF.EmptyCheck();
        if (OthelloCF.gameState === "PLAY") {
            if (!OthelloCF.turnPossible(Othello.turn)) {
                Othello.turn += 1;
            }
            OthelloCF.turnTextAll(0, Othello.boardY * 55 + 10);
            for (let loop1 = 0; loop1 < Othello.allPlayers.length; loop1 += 1) {
                Othello.allPlayers[loop1].printScore(0,  Othello.boardY * 55 + 25 + loop1 * 15);
            }
            if (!OthelloCF.anyTurnPossible()) {
                OthelloCF.endGame();
            }
        } else if (Othello.gameState === "END") {
            fill(0, 255, 0);
            text("Press R to restart", 0, Othello.boardY * 55 + 10);
            if (Othello.winners.length === 1) {
                fill(Othello.winners[0].colour.r, Othello.winners[0].colour.g, Othello.winners[0].colour.b);
                text("The WINNER is : " + Othello.winners[0].name, 0, Othello.boardY * 55 + 25);
            } else {
                fill(0, 255, 0);
                text("TIE between :", 0, Othello.boardY * 55 + 25);
                for (let loop1 = 0; loop1 < Othello.allPlayers.length; loop1 += 1) {
                    fill(Othello.winners[loop1].colour.r, Othello.winners[loop1].colour.g, Othello.winners[loop1].colour.b);
                    text((loop1 + 1) + ". " + Othello.winners[loop1].name, 0, Othello.boardY * 55 + 40 + loop1 * 15);
                }
            }
            if (keyCode === 114) {
                Othello.gameState = "PLAY";
                OthelloCF.reset();
            }
        }
    }
}

function mouseReleased() {
    if (state === "Othello") {
        OthelloCF.mouseReleased();
    }
}