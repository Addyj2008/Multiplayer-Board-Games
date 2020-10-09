class Form {
    constructor () {
        this.signUp = createButton('Sign Up');
        this.signUp.position(100, 100);
        this.signUp.mousePressed(()=>{
            this.signUp.hide();
            this.signIn.hide();
            this.back.show();
            this.checkUsername.show();
            this.enterUsername.show();
        });
        this.signIn = createButton('Sign In');
        this.signIn.position(200, 100);
        this.signIn.mousePressed(()=>{
            this.signUp.hide();
            this.signIn.hide();
            this.back.show();
            this.enterPassword.show();
            this.enterUsername.show();
            this.enter.show()
        });
        this.back = createButton('Back');
        this.back.position(100, 100);
        this.back.mousePressed(()=>{this.signUpPage();});
        this.back.hide();
        this.enterUsername = createInput('Username');
        this.enterUsername.position(100, 200);
        this.enterUsername.hide();
        this.enterPassword = createInput('Password');
        this.enterPassword.position(300, 200);
        this.enterPassword.hide();
        this.incorrect = createElement('h5');
        this.incorrect.position(100, 400);
        this.incorrect.hide();
        this.incorrect.html('Username or password incorrect');
        this.enter = createButton('Enter');
        this.enter.position(100, 300);
        this.enter.hide();
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
        this.create.hide();
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
        this.usernameTaken.hide();
        this.usernameTaken.html('This Username is already taken');
        this.checkUsername = createButton('Next');
        this.checkUsername.hide();
        this.checkUsername.position(100, 300);
        this.checkUsername.mousePressed(()=>{
            database.ref('Players').once('value').then((val)=>{
                if (checkUsername(val.val(), this.enterUsername.value())) {
                    this.checkUsername.hide();
                    this.enterUsername.hide();
                    this.enterPassword.show();
                    this.create.show();
                    this.usernameTaken.hide();
                } else {
                    this.usernameTaken.show();
                }
            });
        });
        this.signOut = createButton('Sign Out');
        this.signOut.position(100, 100);
        this.signOut.mousePressed(()=>{this.signUpPage();});
        this.signOut.hide();
        this.delete = createButton('Delete Account');
        this.delete.hide();
        this.delete.position(100, 500);
        this.delete.mousePressed(()=>{
            this.deleteSure.show()
            this.deleteYes.show();
            this.deleteNo.show();
            this.delete.hide();
            this.signOut.hide();
            name = null;
        });
        this.deleteYes = createButton('Yes');
        this.deleteYes.hide();
        this.deleteYes.position(100, 300);
        this.deleteYes.mousePressed(()=>{
            this.signUpPage();
            database.ref('Players/' + this.enterUsername.value()).remove();
        });
        this.deleteNo = createButton('No');
        this.deleteNo.hide();
        this.deleteNo.position(100, 200);
        this.deleteNo.mousePressed(()=>{this.homePage();});
        this.deleteSure = createElement('h3');
        this.deleteSure.hide();
        this.deleteSure.position(100, 100);
        this.deleteSure.html('ARE YOU SURE YOU WANT TO DELETE YOUR ACCOUNT. IT WILL BE GONE FOREVER');
    }
    signUpPage() {
        this.signUp.show();
        this.signIn.show();
        this.back.hide();
        this.enterPassword.hide();
        this.enterUsername.hide();
        this.incorrect.hide();
        this.enter.hide()
        this.create.hide();
        this.checkUsername.hide();
        this.usernameTaken.hide();
        this.signOut.hide();
        this.delete.hide()
        this.deleteSure.hide()
        this.deleteYes.hide();
        this.deleteNo.hide();
        if (name === null || name === undefined) {
            name = this.enterUsername.value();
        }
        database.ref('Players/' + name + '/Score').off();
        name = null;
    }
    homePage() {
        this.signOut.show();
        this.delete.show()
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
        if (name === null || name === undefined) {
            name = this.enterUsername.value();
        }
        database.ref('Players/' + name + '/Score').off();
        database.ref('Players/' + name + '/Score').on('value', function (data) {
            score = data.val();
        });
        database.ref('Players/' + name + '/Score').once('value').then(function (data) {
            score = data.val();
        });
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