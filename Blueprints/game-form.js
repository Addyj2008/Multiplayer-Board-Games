class GameForm {
    constructor (min, max, Name) {
        this.name = Name;
        this.min = min;
        this.max = max;
        if (this.min !== this.max) {
            this.playerInput = createInput('NO. of PLAYERS');
            this.playerInput.hide();
        }
        this.private = createButton('Private Game');
        this.private.position(100, 200);
        this.private.hide();
        this.private.mousePressed(()=>{
            if (this.playerInput !== undefined && this.playerInput !== null) {
                if (this.playerInput.value() >= this.min && this.playerInput.value() <= this.max && this.playerInput.value() !== "") {
                    let players = {};
                    players[name] = {
                        'Score' : 0,
                        'Turn' : 0
                    }
                    this.code = round(random(1, 9) * 10000);
                    database.ref('Games/' + this.name + '/' + name).update({
                        'Type' : "PRIVATE",
                        'PlayerCount' : 1,
                        'PlayerReq' : this.playerInput.value(),
                        'Code' : this.code,
                        'Players' : players,
                        'Game' : 0
                    });
                    database.ref('Games/' + this.name + '/' + name).on('value', (val) => {
                        this.game = val.val();
                    });
                    this.private.hide();
                    this.public.hide();
                    this.playerInput.hide();
                    form.backPlay.hide();
                    form.code = this.code;
                    form.currentGameName = name;
                    state = "WAIT";
                }
            } else {
                let players = {};
                players[name] = {
                    'Score' : 0,
                    'Turn' : 0
                }
                this.code = round(random(1, 9) * 10000);
                database.ref('Games/' + this.name + '/' + name).update({
                    'Type' : "PRIVATE",
                    'PlayerCount' : 1,
                    'PlayerReq' : this.max,
                    'Code' : this.code,
                    'Players' : players,
                    'Game' : 0
                });
                database.ref('Games/' + this.name + '/' + name).on('value', (val) => {
                    this.game = val.val();
                });
                this.private.hide();
                this.public.hide();
                form.backPlay.hide();
                form.code = this.code;
                form.currentGameName = name;
                state = "WAIT";
            }
        });
        this.private.hide();
        this.public = createButton('Public Game');
        this.public.position(200, 200);
        this.public.hide();
        this.public.mousePressed(()=>{
            if (this.playerInput !== undefined && this.playerInput !== null) {
                if (this.playerInput.value() >= this.min && this.playerInput.value() <= this.max && this.playerInput.value() !== "") {
                    let players = {};
                    players[name] = {
                        'Score' : 0,
                        'Turn' : 0
                    }
                    this.code = round(random(1, 9) * 10000);
                    database.ref('Games/' + this.name + '/' + name).update({
                        'Type' : "PUBLIC",
                        'PlayerCount' : 1,
                        'PlayerReq' : this.playerInput.value(),
                        'Code' : this.code,
                        'Players' : players,
                        'Game' : 0
                    });
                    database.ref('Games/' + this.name + '/' + name).on('value', (val) => {
                        this.game = val.val();
                    });
                    this.private.hide();
                    this.public.hide();
                    this.playerInput.hide()
                    form.backPlay.hide();
                    form.code = this.code;
                    form.currentGameName = name;
                    state = "WAIT";
                }
            } else {
                let players = {};
                players[name] = {
                    'Score' : 0,
                    'Turn' : 0
                }
                this.code = round(random(1, 9) * 10000);
                database.ref('Games/' + this.name + '/' + name).update({
                    'Type' : "PUBLIC",
                    'PlayerCount' : 1,
                    'PlayerReq' : this.max,
                    'Code' : this.code,
                    'Players' : players,
                    'Game' : 0
                });
                database.ref('Games/' + this.name + '/' + name).on('value', (val) => {
                    this.game = val.val();
                });
                this.public.hide();;
                this.private.hide();
                form.backPlay.hide();
                form.code = this.code;
                form.currentGameName = name;
                state = "WAIT";
            }
        });
    }
    show () {
        this.public.show();
        this.private.show();
        if (this.playerInput !== undefined && this.playerInput !== null) {
            this.playerInput.show();
        }
    }
}