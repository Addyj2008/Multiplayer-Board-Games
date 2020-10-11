let form, database, name, score, state, wait = [], oldName, topper = [];

function setup () {
    createCanvas(400, 400)
    database = firebase.database();
    form = new Form();
}

function draw() {
    background(255, 255, 255);
    if (state === "Home" && score !== undefined && score !== null) {
        text("Score = " + score.Total, 100, 200);
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
}