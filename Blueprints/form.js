class Form {
    constructor () {
        this.code = 0;
        this.currentGame = "";
        this.currentGameName = "";
        this.ls = [];
        this.signUp = createButton('Sign Up');
        this.signUp.position(100, 100);
        this.signUp.mousePressed(()=>{
            this.hideAll()
            this.back.show();
            this.checkUsername.show();
            this.enterUsername.show();
        });
        this.signIn = createButton('Sign In');
        this.signIn.position(200, 100);
        this.signIn.mousePressed(()=>{
            this.hideAll();
            this.back.show();
            this.enterPassword.show();
            this.enterUsername.show();
            this.enter.show()
        });
        this.back = createButton('Back');
        this.back.position(100, 100);
        this.back.mousePressed(()=>{this.signUpPage();});
        this.backHome = createButton('Back');
        this.backHome.position(100, 100);
        this.backHome.mousePressed(()=>{this.homePage();});
        this.backPlay = createButton('Back');
        this.backPlay.position(100, 100);
        this.backPlay.mousePressed(()=>{this.gameScreen(this.currentGame);});
        this.enterUsername = createInput('Username');
        this.enterUsername.position(100, 200);
        this.enterPassword = createInput('Password');
        this.enterPassword.position(300, 200);
        this.incorrect = createElement('h5');
        this.incorrect.position(100, 400);
        this.incorrect.hide();
        this.incorrect.html('Username or password incorrect');
        this.enter = createButton('Enter');
        this.enter.position(100, 300);
        this.enter.mousePressed(()=>{
            database.ref('Players').once('value').then((val)=>{
                if (!checkUsername(val.val(), this.enterUsername.value())) {
                    database.ref('Players/' + this.enterUsername.value() + '/Password').once('value').then((val2)=>{
                        if (val2.val() == this.enterPassword.value()) {
                            this.homePage();
                        } else {
                            this.incorrect.show(); 
                        }
                    })
                } else {
                    this.incorrect.show();
                }
            });
        })
        this.create = createButton('Create Account');
        this.create.position(100, 300);
        this.create.mousePressed(()=>{
            this.homePage();
            database.ref('Players/' + name).update({
                'Password' : this.enterPassword.value(),
                'Score' : {
                    'Total' : 0
                }
            });
        })
        this.usernameTaken = createElement('h5');
        this.usernameTaken.position(100, 400);
        this.usernameTaken.html('This Username is already taken');
        this.usernameSize = createElement('h5');
        this.usernameSize.position(100, 400);
        this.usernameSize.html('Username Must be between 3 to 21 Characters Long');
        this.checkUsername = createButton('Next');
        this.checkUsername.position(100, 300);
        this.checkUsername.mousePressed(()=>{
            if (this.enterUsername.value().length <= 3 || this.enterUsername.value().length >= 21) {
                this.usernameTaken.hide();
                this.usernameSize.show();
            } else {
                database.ref('Players').once('value').then((val)=>{
                    if (checkUsername(val.val(), this.enterUsername.value())) {
                        this.hideAll()
                        this.enterPassword.show();
                        this.create.show();;
                        this.back.show();
                    } else {
                        this.usernameTaken.show();
                        this.usernameSize.hide();
                    }
                });
            }
        });
        this.signOut = createButton('Sign Out');
        this.signOut.position(100, 100);
        this.signOut.mousePressed(()=>{this.signUpPage();});
        this.delete = createButton('Delete Account');
        this.delete.position(100, 700);
        this.delete.mousePressed(()=>{
            this.hideAll()
            this.deleteSure.show()
            this.deleteYes.show();
            this.deleteNo.show();
        });
        this.deleteYes = createButton('Yes');
        this.deleteYes.position(100, 300);
        this.deleteYes.mousePressed(()=>{
            database.ref('Players/' + name).remove();
            this.signUpPage();
        });
        this.deleteNo = createButton('No');
        this.deleteNo.position(100, 200);
        this.deleteNo.mousePressed(()=>{this.homePage();});
        this.deleteSure = createElement('h3');
        this.deleteSure.position(100, 100);
        this.deleteSure.html('ARE YOU SURE YOU WANT TO DELETE YOUR ACCOUNT. IT WILL BE GONE FOREVER');
        this.changePassword = createButton('Change Password');
        this.changePassword.position(100, 500);
        this.changePassword.mousePressed(()=>{
            this.hideAll();
            this.enterPassword.show();
            this.confirmPassword.show();
            this.backHome.show();
        });
        this.confirmPassword = createButton('Confirm');
        this.confirmPassword.position(300, 300);
        this.confirmPassword.mousePressed(()=>{
            database.ref('Players/' + name).update({'Password' : this.enterPassword.value()});
            this.homePage();
        });
        this.changeUsername = createButton('Change Username');
        this.changeUsername.position(100, 600);
        this.changeUsername.mousePressed(()=>{
            this.hideAll();
            this.enterUsername.show();
            this.confirmUsername.show();
            this.backHome.show();
        });
        this.confirmUsername = createButton('Confirm');
        this.confirmUsername.position(100, 300);
        this.confirmUsername.mousePressed(()=>{
            database.ref('Players').once('value').then((val)=>{
                if (checkUsername(val.val(), this.enterUsername.value())) {
                    database.ref('Players/' + name).once('value').then((val)=>{
                        database.ref('Players/' + this.enterUsername.value()).update({
                            'Password' : val.val().Password,
                            'Score' : val.val().Score
                        });
                    });
                    oldName = name;
                    this.homePage();
                    wait[0] = true;
                } else {
                    this.usernameTaken.show();
                }
            });
        });
        this.leaderBoards = createButton('Leader Boards');
        this.leaderBoards.position(100, 400);
        this.leaderBoards.mousePressed(()=>{
            this.hideAll();
            this.leaderBoardsF('Total');
            this.backHome.show();
        });
        this.play = createButton('Play');
        this.play.position(100, 300);
        this.play.mousePressed(()=>{this.playF()});
        this.rulesText = createElement('h4');
        this.rulesText.position(100, 200);
        this.rules = createButton('Rules');
        this.rules.position(100, 300);
        this.rules.mousePressed(() => {
            this.hideAll();
            this.backPlay.show();
            this.rulesText.show();
            for (let loop in this.games) {
                if (this.games[loop].name === this.currentGame) {
                    this.rulesText.html(this.games[loop].rules);
                }
            }
        });
        this.leaderBoards2 = createButton('Leader Boards');
        this.leaderBoards2.position(100, 400);
        this.leaderBoards2.mousePressed(()=>{
            this.hideAll();
            this.leaderBoardsF(this.currentGame);
            this.backPlay.show();
        });
        this.createGame = createButton('Create Game');
        this.createGame.position(100, 500);
        this.createGame.mousePressed(()=>{
            this.hideAll();
            this.backPlay.show();
            for (let loop in this.games) {
                if (this.games[loop].name === this.currentGame) {
                    this.games[loop].form.show();
                }
            }
        });
        this.joinGame = createButton('Join Game');
        this.joinGame.position(100, 600);
        this.joinGame.mousePressed(()=>{
            let boolean = true;
            if (boolean) {
                database.ref('Games/' + this.currentGame).once('value').then((val)=>{
                    for (let loop1 in val.val()) {
                        if (val.val()[loop1].Type === "PUBLIC" && val.val()[loop1].PlayerReq > val.val()[loop1].PlayerCount && boolean) {
                            let players = {};
                            players[name] = {
                                'Score' : 0,
                                'Turn' : val.val()[loop1].PlayerCount
                            }
                            database.ref('Games/' + this.currentGame + '/' + loop1 + '/Players').update(players);
                            database.ref('Games/' + this.currentGame + '/' + loop1 + '/PlayerCount').once('value').then((val)=>{
                                database.ref('Games/' + this.currentGame + '/' + loop1).update({
                                    'PlayerCount' : val.val() + 1
                                });
                            });
                            database.ref('Games/' + this.currentGame + '/' + loop1 + '/Code').once('value').then((val)=>{
                                this.code = val.val()
                            });
                            this.currentGameName = loop1;
                            boolean = false;
                            this.hideAll();
                            state = "WAIT";
                            database.ref('Games/' + this.currentGame + '/' + this.currentGameName).on('value', (val) => {
                                this.games[this.currentGame].form.game = val.val();
                            });
                        }
                    }
                });
            }
        });
        this.joinCode = createInput('Enter Code');
        this.joinCode.position(200, 700);
        this.joinWCode = createButton('Join');
        this.joinWCode.position(100, 700);
        this.joinWCode.mousePressed(()=>{
            let boolean = true;
            if (boolean) {
                database.ref('Games/' + this.currentGame).once('value').then((val)=>{
                    for (let loop1 in val.val()) {
                        if (val.val()[loop1].Code == this.joinCode.value() && val.val()[loop1].PlayerReq > val.val()[loop1].PlayerCount && boolean) {
                            let players = {};
                            players[name] = {
                                'Score' : 0,
                                'Turn' : val.val()[loop1].PlayerCount
                            }
                            database.ref('Games/' + this.currentGame + '/' + loop1 + '/Players').update(players);
                            database.ref('Games/' + this.currentGame + '/' + loop1 + '/PlayerCount').once('value').then((val)=>{
                                database.ref('Games/' + this.currentGame + '/' + loop1).update({
                                    'PlayerCount' : val.val() + 1
                                });
                            });
                            database.ref('Games/' + this.currentGame + '/' + loop1 + '/Code').once('value').then((val)=>{
                                this.code = val.val()
                            });
                            this.currentGameName = loop1;
                            boolean = false;
                            this.hideAll();
                            state = "WAIT";
                            database.ref('Games/' + this.currentGame + '/' + this.currentGameName).on('value', (val) => {
                                this.games[this.currentGame].form.game = val.val();
                            });
                        }
                    }
                });
            }
        });
        this.games = {
            'Othello' : {
                'name' : "Othello",
                'button' : createButton("Othello"),
                'rules' : "1. Othello is a board game played between 2 players on an 8 by 8 board using circular pieces.        2. In the begining 4 circular pieces are placed in a checkerboard style format at the centre.       3. Each player chooses a colour and takes turn moving.      4. A player can move on any of the empty squares if moving there gives him/her 1 or more point(s).      5. If there isn't a empty square on which moving is possible for the player the turn gets passed.       6. If no player can move or the whole board is filled then the game ends.       7. Scoring - After a piece is placed if a straight line can be drawn to another piece of the same colour and the line has no empty spots and only contains pieces of a diffferent colour then those pieces change to the colour of the placed piece(Lines can be drawn horizontally, vertically and diagonally).        8. Ending the game - When no player can move or the whole board is filled with pieces then the game ends.      9. Winner - The winner is the person with the most pieces to his name.",
                'form' : new GameForm(2, 2, "Othello"),
                'setup' : function () {
                    Othello.boardX = 8;
                    Othello.boardY = 8;
                    new OthelloCF.Player(0, 0, 0, "Player 1");
                    new OthelloCF.Player(0, 0, 255, "Player 2");
                    Othello.basePieces = [new OthelloCF.Piece(4, 4, Othello.allPlayers[0]), new OthelloCF.Piece(4, 5, Othello.allPlayers[1]), new OthelloCF.Piece(5, 4, Othello.allPlayers[1]), new OthelloCF.Piece(5, 5, Othello.allPlayers[0])];
                    Othello.turn = 0;
                    for (let loop1 = 1; loop1 <= Othello.boardX; loop1 += 1) {
                        for (let loop2 = 1; loop2 <= Othello.boardY; loop2 += 1) {
                            new OthelloCF.EmptySpace(loop1, loop2);
                        }
                    }
                    Othello.gameState = "PLAY";
                    strokeWeight(0);
                    OthelloCF.mouseReleased = function() {
                        if (Othello.gameState === "PLAY") {
                            OthelloCF.placePieceAll();
                        }
                    }
                    
                    OthelloCF.reset = function() {
                        Othello.turn = 0;
                        OthelloCF.revertToOrignal();
                        Othello.allPieces = [];
                        for (let loop1 = 0; loop1 < Othello.basePieces.length; loop1 += 1) {
                            Othello.allPieces.push(Othello.basePieces[loop1]);
                        }
                        Othello.winners = [];
                    }
                    
                    OthelloCF.endGame = function() {
                        Othello.gameState = "END";
                        Othello.winners.push(Othello.allPlayers[0]);
                        for (let loop1 = 1; loop1 < Othello.allPlayers.length; loop1 += 1) {
                            if (Othello.allPlayers[loop1].getScore() === Othello.winners[0].getScore()) {
                                Othello.winners.push(Othello.allPlayers[loop1]);
                            } else if (Othello.allPlayers[loop1].getScore() > Othello.winners[0].getScore()) {
                                Othello.winners = [Othello.allPlayers[loop1]];
                            }
                        }
                        for (let loop1 in Othello.allPlayers) {
                            database.ref('Players/' + Othello.allPlayers[loop1].name + '/Score').once('value').then((val) => {  
                                database.ref('Players/' + Othello.allPlayers[loop1].name + '/Score').update({
                                    'Total' : val.val().Total + (Othello.allPlayers[loop1].getScore() - 40)*1000/40,
                                    'Othello' : val.val().Total + (Othello.allPlayers[loop1].getScore() - 40)*1000/40
                                });
                            });
                        }
                        OthelloCF.update();
                    }
                    OthelloCF.update = function() {
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
                                    } else if (typeof OthelloR[loop0][loop1] == "function") {
                                        OthelloR[loop0][loop1] = undefined;
                                        delete OthelloR[loop0][loop1];
                                    }
                                }
                            } else if (typeof OthelloR[loop0] == "function") {
                                OthelloR[loop0] = undefined;
                                delete OthelloR[loop0];
                            }
                        }
                        database.ref('Games/Othello/' + form.currentGameName + '/Game').update(OthelloR);
                    }
                    OthelloCF.update();
                    database.ref('Games/Othello/' + form.currentGameName + '/Game').on('value', (val) => {
                        if (val.val() !== null && val.val() !== undefined) {
                            for (let loop1 = 0; loop1 < val.val().allPieces.length - Othello.allPieces.length; loop1++) {
                                Othello.allPieces.push(new OthelloCF.Piece(val.val().allPieces[Othello.allPieces.length + loop1].position.x, val.val().allPieces[Othello.allPieces.length + loop1].position.y, {'colour' : val.val().allPieces[Othello.allPieces.length + loop1].orignalColour}, false));
                            }
                            for (let loop1 = 0; loop1 < val.val().winners.length - Othello.winners.length; loop1++) {
                                Othello.winners.push(new OthelloCF.Player(0, 0, "a", false));
                            }
                            for (let loop0 in val.val()) {
                                if (typeof val.val()[loop0] == "object") {
                                    for (let loop1 in val.val()[loop0]) {
                                        if (typeof val.val()[loop0][loop1] == "object") {
                                            for (let loop2 in val.val()[loop0][loop1]) {
                                                if (typeof val.val()[loop0][loop1][loop2] == "object") {
                                                    for (let loop3 in val.val()[loop0][loop1][loop2]) {
                                                        Othello[loop0][loop1][loop2][loop3] = val.val()[loop0][loop1][loop2][loop3];
                                                    }
                                                } else {
                                                    Othello[loop0][loop1][loop2] = val.val()[loop0][loop1][loop2];
                                                }
                                            }
                                        } else {
                                            Othello[loop0][loop1] = val.val()[loop0][loop1];
                                        }
                                    }
                                } else {
                                    Othello[loop0] = val.val()[loop0];
                                }
                            }
                            for (let loop0 in val.val().allPieces) {
                                Othello.allPieces[loop0].colour = {'r' : val.val().allPieces[loop0].colour.r, 'g' : val.val().allPieces[loop0].colour.g, 'b' : val.val().allPieces[loop0].colour.b};
                            }
                        }
                    });
                    database.ref('Games/Othello/' + form.currentGameName + '/Players').once('value').then((val) => {
                        for (let loop in val.val()) {
                            Othello.allPlayers[val.val()[loop].Turn].name = loop;
                            if (loop === name) {
                                turn = val.val()[loop].Turn;
                            }
                        }
                    });
                }
            }
        }
        let loop1 = 0;
        for (let loop in this.games) {
            this.games[loop].button.position(loop1 % 5 * 100 + 100, (loop1 - loop1 % 5)/5 * 100 + 200);
            this.games[loop].button.mousePressed(()=>{this.gameScreen(this.games[loop].name)});
            loop1++;
        }
        this.signUpPage();
    }
    signUpPage() {
        this.hideAll();
        this.signUp.show();
        this.signIn.show();
        if (name === null || name === undefined) {
            name = this.enterUsername.value();
        }
        database.ref('Players/' + name + '/Score').off();
        name = null;
        state = "Sign Up";
    }
    homePage() {
        this.hideAll();
        this.play.show();
        this.signOut.show();
        this.delete.show();
        this.changePassword.show();
        this.changeUsername.show();
        this.leaderBoards.show();
        this.currentGame = "";
        database.ref('Players/' + name + '/Score').off();
            name = this.enterUsername.value();
        database.ref('Players/' + name + '/Score').once('value').then(function (data) {
            score = data.val();
        });
        database.ref('Players/' + name + '/Score').on('value', function (data) {
            score = data.val();
        });
        state = "Home";
    }
    hideAll() {
        state = null;
        for (let loop1 in this) {
            if (this[loop1].hide !== undefined && this[loop1].hide !== null) {
                this[loop1].hide();
            }
        }
        for (let loop1 in this.games) {
            this.games[loop1].button.hide();
            for (let loop2 in this.games[loop1].form) {
                if (typeof this.games[loop1].form[loop2].hide == "function") {
                    this.games[loop1].form[loop2].hide();
                }
            }
        }
    }
    leaderBoardsF(type) {
        topper = [];
        this.ls = [];
        database.ref('Players').once('value').then((val)=>{
            for (let loop1 in val.val()) {
                this.ls.push({
                    'name' : loop1,
                    'score' : val.val()[loop1].Score[type]
                });
            }
        });
        wait[1] = true;
        state = "LeaderBoards";
    }
    playF() {
        this.hideAll();
        this.backHome.show();
        for (let loop1 in this.games) {
            this.games[loop1].button.show();
        }
        state = "Play";
    }
    gameScreen(game) {
        this.hideAll();
        this.backHome.show();
        this.currentGame = game;
        this.rules.show();
        this.leaderBoards2.show();
        this.createGame.show();
        this.joinGame.show();
        this.joinCode.show();
        this.joinWCode.show();
        this.currentGameName = "";
        database.ref('Players/' + name + '/Score').once('value').then((val)=>{
            if (val.val()[this.currentGame] === undefined || val.val()[this.currentGame] === null) {
                database.ref('Players/' + name + '/Score').once('value').then((val2)=>{
                    let tempVal = val2.val();
                    tempVal[this.currentGame] = 0
                    database.ref('Players/' + name).update({'Score' : tempVal});
                });
            }
        });
        state = "Game Screen";
    }
}

function checkUsername (players, name) {
    if (players === null || players === undefined) {
        return true;
    }
    for (let player in players) {
        if (player == name) {
            return false;
        }
    }
    return true;
}