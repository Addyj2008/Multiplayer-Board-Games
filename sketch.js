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
    }
}