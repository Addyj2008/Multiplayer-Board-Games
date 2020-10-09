let form, database, name, score;

function setup () {
    createCanvas(400, 400)
    database = firebase.database();
    form = new Form();
}

function draw() {
    background(255, 255, 255);
    if (name !== undefined && name !== null) {
        text("Score = " + score.Total, 100, 200);
    }
}