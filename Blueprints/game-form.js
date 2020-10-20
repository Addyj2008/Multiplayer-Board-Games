class GameForm {
    constructor (minPlayer, maxPlayer) {
        if (minPlayer !== maxPlayer) {
            //this.playerInput = createInput('NO. of PLAYERS');
        }
        this.private = createButton('Private Game');
        this.private.position(100, 200);
        this.private.hide();
        this.public = createButton('Public Game');
        this.public.position(200, 200);
        this.public.hide();
    }
    show () {
        this.public.show();
        this.private.show();
    }
}