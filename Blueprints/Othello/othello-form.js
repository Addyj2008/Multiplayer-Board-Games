class OthelloForm extends GameForm {
    constructor () {
        super (2, 2);
        this.private.mousePressed(()=>{
            let players = {};
            players[name] = {
                'Score' : 0
            }
            database.ref('Games/Othello/' + name).update({
                'Type' : "PRIVATE",
                'PlayerCount' : 1,
                'Code' : round(random(1, 9) * 10000),
                'Players' : players
            });
            this.private.hide();
            this.public.hide();
            form.backPlay.hide();
        });
        this.public.mousePressed(()=>{
            let players = {};
            players[name] = {
                'Score' : 0
            }
            database.ref('Games/Othello/' + name).update({
                'Type' : "PUBLIC",
                'PlayerCount' : 1,
                'Code' : round(random(1, 9) * 10000),
                'Players' : players
            });
            this.public.hide();
            this.private.hide();
            form.backPlay.hide();
        });
    }
}