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
        this.back.mousePressed(()=>{
            this.signUp.show();
            this.signIn.show();
            this.back.hide();
            this.enterPassword.hide();
            this.enterUsername.hide();
            this.enter.hide()
            this.checkUsername.hide();
            this.usernameTaken.hide();
        });
        this.back.hide();
        this.enterUsername = createInput('Username');
        this.enterUsername.position(100, 200);
        this.enterUsername.hide();
        this.enterPassword = createInput('Password');
        this.enterPassword.position(300, 200);
        this.enterPassword.hide();
        this.enter = createButton('Enter');
        this.enter.hide();
        this.create = createButton('Create Account');
        this.create.hide();
        this.create.position(100, 300);
        this.create.mousePressed(()=>{
            database.ref('Players/' + this.enterUsername.value()).update({
                'Password' : this.enterPassword.value(),
                'Games-Played' : 0,
                'Games-Won' : 0
            });
            this.back.hide();
            this.enterPassword.hide();
            this.create.hide();
            name = this.enterUsername.value();
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
                } else {
                    this.usernameTaken.show();
                }
            });
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