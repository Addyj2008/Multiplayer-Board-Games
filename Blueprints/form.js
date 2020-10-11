class Form {
    constructor () {
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
        this.checkUsername = createButton('Next');
        this.checkUsername.position(100, 300);
        this.checkUsername.mousePressed(()=>{
            database.ref('Players').once('value').then((val)=>{
                if (checkUsername(val.val(), this.enterUsername.value())) {
                    this.hideAll()
                    this.enterPassword.show();
                    this.create.show();;
                    this.back.show();
                } else {
                    this.usernameTaken.show();
                }
            });
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
        this.leaderBoards.mousePressed(()=>{this.leaderBoardsF('Total')});
        this.signUpPage();
    }
    signUpPage() {
        this.hideAll()
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
        this.hideAll()
        this.signOut.show();
        this.delete.show();
        this.changePassword.show();
        this.changeUsername.show();
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
        this.signOut.hide();
        this.delete.hide()
        this.signUp.hide();
        this.signIn.hide();
        this.back.hide();
        this.enterPassword.hide();
        this.enterUsername.hide();
        this.incorrect.hide();
        this.enter.hide()
        this.create.hide();
        this.checkUsername.hide();
        this.usernameTaken.hide();
        this.deleteSure.hide()
        this.deleteYes.hide();
        this.deleteNo.hide();
        this.changePassword.hide();
        this.changeUsername.hide();
        this.confirmPassword.hide();
        this.confirmUsername.hide();
        this.checkUsername.hide();
        this.backHome.hide();
        this.leaderBoards.hide();
    }
    leaderBoardsF(type) {
        let LS = [];
        database.ref('Players').once('value').then((val)=>{
            for (let loop1 in val.val()) {
                LS.push({
                    'name' : loop1,
                    'score' : loop1.Score[type]
                });
            }
        });
        let tops = [];
        for (let loop1 in LS) {
            
        }
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