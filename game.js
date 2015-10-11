var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        setTimeout(callback, 1000 / 30);
    };

var canvas = document.getElementById("canvas-id");
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext("2d");
///NE BARAITE REDOVETE NAGORE!

var mishkaX = 0,
    mishkaY = 0; //Suzdadohme promenliva! Tipa i e kakufto i dadete :)
var tochkiX = [],
    tochkiY = [],
    tochkiRX = [],
    tochkiRY = [];
var broiTochki = 300,
    activniTochki = [],
    tochkiRadius = [];
var niva = [],
    time = [],
    starttime = [],
    nakoenivosme = 0;

document.body.style.background = "black";
var Game = false,
    MainMenuScreen = true,
    Help = false,
    Story = false;
var GamePanelX = 60,
    GamePanelY = 250,
    backPanelX = 600,
    backPanelY = 400;
var StoryPanelX = 60,
    StoryPanelY = 360,
    PlayPanelX = 270,
    PlayPanelY = 500;
var pause = true;

function generirainivoto(nakoenivosme) {
    if (nakoenivosme > 0) {
        niva[nakoenivosme - 1] = false;
        starttime[nakoenivosme] = starttime[nakoenivosme - 1] - 5;
        time[nakoenivosme] = starttime[nakoenivosme];
        niva[nakoenivosme] = true;
    }
    for (var broqch = 0; broqch < broiTochki; broqch = broqch + 1) {
        tochkiX[broqch] = 50 + Math.random() * 492;
        tochkiY[broqch] = 50 + Math.random() * 492;
        tochkiRX[broqch] = 8;
        tochkiRY[broqch] = 8;
        tochkiRadius[broqch] = 0;
        activniTochki[broqch] = false;

        // proverka za zastupvane
        for (var broqch1 = 0; broqch1 < broqch; broqch1++) {
            if ((broqch > 0 && (collission(tochkiX[broqch], tochkiY[broqch],
                tochkiRX[broqch], tochkiRY[broqch],
                tochkiX[broqch1] - 3, tochkiY[broqch1] - 3,
                tochkiRX[broqch1] + 6, tochkiRY[broqch1] + 6)))) {
                broqch = broqch - 1;
            }
        }
     

    }
    var randomTochka = Math.floor(Math.random() * broiTochki);
    activniTochki[randomTochka] = true;
    tochkiRadius[randomTochka] = 50;
}
niva[0] = true;
starttime[0] = 120;
time[0] = starttime[0];
generirainivoto(0);
window.addEventListener("keyup", function (args) { //vika se pri puskane na kopche natiskano do sega
    if (args.which == 80) {
        pause = !pause;
    }
}, false);

function collission(x, y, rx, ry, x1, y1, rx1, ry1) {
    if (x + rx > x1 && x < x1 + rx1 &&
        y + ry > y1 && y < y1 + ry1) {
        return true;
    } else {
        return false;
    }
}

window.addEventListener("mousemove", function (args) {
    mishkaX = args.clientX - canvas.offsetLeft;
    mishkaY = args.clientY - canvas.offsetTop; //Slagame tezi redove za da razberem kude e deistvieto s 
    if (Game == true && pause == false) {
        for (var broqch = 0; broqch < broiTochki; broqch++) {
            if (collission(mishkaX, mishkaY, 0, 0, tochkiX[broqch], tochkiY[broqch],
                tochkiRX[broqch], tochkiRY[broqch]) && activniTochki[broqch] == true) {
                for (var broqch1 = 0; broqch1 < broiTochki; broqch1++) {
                    if (collission(tochkiX[broqch1], tochkiY[broqch1],
                        tochkiRX[broqch1], tochkiRY[broqch1],
                        tochkiX[broqch] - tochkiRadius[broqch],
                        tochkiY[broqch] - tochkiRadius[broqch],
                        tochkiRadius[broqch] * 2 + 8,
                        tochkiRadius[broqch] * 2 + 8)) {

                        tochkiRadius[broqch1] = tochkiRadius[broqch];
                        activniTochki[broqch1] = true;

                    }
                }
            }
        }
    }
}, false);

window.addEventListener("mouseup", function (args) {
    mishkaX = args.clientX - canvas.offsetLeft;
    mishkaY = args.clientY - canvas.offsetTop; //Slagame tezi redove za da razberem kude e deistvieto s mishkata

    if (collission(mishkaX, mishkaY, 0, 0, GamePanelX, GamePanelY, 680, 60) && MainMenuScreen == true) {
        Game = true;
        MainMenuScreen = false;
        timer = 0;
    }
    if (collission(mishkaX, mishkaY, 0, 0, StoryPanelX, StoryPanelY, 680, 60) && MainMenuScreen == true) {
        Story = true;
        MainMenuScreen = false;
        timer = 0;
    }
    if (Game == true &&
        collission(mishkaX, mishkaY, 0, 0, backPanelX, backPanelY, 180, 50)) {
        timer = 0;
        Game = false;
        MainMenuScreen = true;
        pause = true;
    }
    if (Story == true &&
        collission(mishkaX, mishkaY, 0, 0, PlayPanelX, PlayPanelY, 240, 50)) {
        timer = 0;
        Story = false;
        Game = true;

    }
}, false);
var gameOver = false;
var timer = 0;

function update() { //specialna funkcia vikashta se periodichno. V neq shte pishem vsqkuf kod za dvijenie

    if (Game == true) {
        if (time[nakoenivosme] > 0) {
            if (pause == false) {
                time[nakoenivosme] = time[nakoenivosme] - 0.01
            }
        }
        if (time[nakoenivosme] <= 0 && gameOver == false) {
            alert("You lost!");
            Game=false
            gameOver=false;  
            niva[nakoenivosme]=false;
            niva[0]=true;
            generirainivoto(0);
            time[nakoenivosme] = starttime[nakoenivosme];
          
            MainMenuScreen=true;
            pause=true;
            
            
        } else {
            var broiActivniTochki = 0;
            for (var broqch = 0; broqch < broiTochki; broqch++) {
                if (activniTochki[broqch] == true) {
                    broiActivniTochki++;
                }
                if (broiActivniTochki == broiTochki && gameOver == false) {
                    nakoenivosme++;
                    generirainivoto(nakoenivosme);
                    gameOver = false;
                    pause = true;
                }
            }
        }
    }
    if (Story == true) {
        if (timer <= 8) {
            timer = timer + 0.01;
        }
    }
    setTimeout(update, 10); //kolko chesto da se dviji // 1000 = 1 sekunda , 0.01
}
var timer = 0;
var HACKTUES = new Image();
HACKTUES.src = "HackTUES-2.png"; //62 7 
function suzdaiPiksel(x, y, rx, ry, color) {
    context.fillStyle = color;
    context.fillRect(x, y, rx, ry);
}
var signal = new Image();
signal.src = 's1.png'

function draw() { //specialna funkcia v koqto shte pishem koda za risuvane. Shte bude vikana, kogato ni se risuva
    context.clearRect(0, 0, canvas.width, canvas.height); //NEBAR!
    context.globalAlpha = 1;
    context.strokeStyle = "white";
    context.strokeRect(0, 0, 800, 600);

    if (Game == true) {
        for (var broqch = 0; broqch < broiTochki; broqch = broqch + 1) {
            if (activniTochki[broqch] == true) {
                context.fillStyle = "rgba(5,152,244,0.14)";
                context.fillRect(tochkiX[broqch] - tochkiRadius[broqch],
                    tochkiY[broqch] - tochkiRadius[broqch],
                    tochkiRadius[broqch] * 2 + 8,
                    tochkiRadius[broqch] * 2 + 8
                );
            }
        }

        for (var broqch = 0; broqch < broiTochki; broqch = broqch + 1) {
            if (activniTochki[broqch] == true) {
                context.fillStyle = "white";
                context.fillRect(tochkiX[broqch], tochkiY[broqch], tochkiRX[broqch], tochkiRY[broqch]);
            } else {
                context.fillStyle = "#2aaf3e";
                context.fillRect(tochkiX[broqch], tochkiY[broqch], tochkiRX[broqch], tochkiRY[broqch]);
            }
        }
        context.fillStyle = "white";
        context.font = "Italic 30px Conquir New";

        context.fillText("Level : " + (nakoenivosme + 1), 625, 100);
        context.fillText("Time : " + Math.floor(time[nakoenivosme]), 620, 160);
        if (pause == true) {
            context.fillStyle = "#ffba00";
            context.font = "Italic 25px Conquir New";
            context.fillText("GAME PAUSED", 600, 230);
            context.font = "Italic 20px Conquir New";
            context.fillText("Press 'p' to play", 620, 260);
        } else {
            context.fillStyle = "#ffba00";
            context.font = "Italic 20px Conquir New";
            context.fillText("Press 'p' to pause", 620, 260);
        }
        context.fillStyle = "#55acf7";
        context.font = "Italic 20px Conquir New";
        context.fillText("Move the mouse over", 600, 320);
        context.font = "Italic 20px Conquir New";
        context.fillText("the white squares to", 600, 340);
        context.fillText("turn on the green ones", 600, 360);

        context.fillStyle = "rgba(255, 255, 255, 0.85)";
        context.fillRect(backPanelX, backPanelY, 180, 50);

        context.fillStyle = "black";
        context.font = "Italic 30px Conquir New";
        context.fillText("B A C K", 637, 435);

        context.drawImage(signal, 650, 480, 80, 80);
    }
    if (MainMenuScreen == true) {
        context.fillStyle = "rgba(53, 188, 120, 0.69)";
        context.fillRect(GamePanelX, GamePanelY, 680, 60);
        context.font = "40px Conquir New";
        context.fillStyle = "white";
        context.fillText("P l a y", GamePanelX + 270, GamePanelY + 45)
        context.fillStyle = "rgba(63, 255, 100, 0.25)";
        context.fillRect(StoryPanelX, StoryPanelY, 680, 60);
        context.fillStyle = "white";
        context.fillText("S t o r y", StoryPanelX + 260, StoryPanelY + 45)
        context.drawImage(HACKTUES, 10, 580, 122, 14);
        context.font="18px Verdana";
        context.fillText("-  Team Begginers",150,593);
        context.fillStyle = "#409fa7";
        context.font = "60px Conquer New";
        context.fillText("H o t   S p o t", 230, 200)

        context.fillStyle = "white";
        context.font = "Italic 10px Verdana";
        context.fillText("Antonii Zlatarov", 710, 550);
        context.fillText("Toni Pelovski", 723, 560);
        context.fillText("Viktor Petrov", 726, 570);
        context.fillText("Venemir Hristov", 710, 580);
        context.fillText("Dimitur Deqnov", 712, 590);
    }
    if (Story == true) {
        context.fillStyle = "white";
        context.font = "40px Conquir New";
        context.fillText("Beginners WAN Company", 180, 40);

        context.font = "20px Conquir New";
        if (timer > 1.75) {
            context.fillText("User0045: Please help! I dont have internet!", 20, 120);
        }
        if (timer > 3.5) {
            context.fillText("User0456: I don't have net! Come and fix it now!", 20, 140);
        }
        if (timer > 5.25) {
            context.fillText("User0047: I will kill you! The Internet has stopped and I will drop bronze division again!", 20, 160);
        }
        if (timer > 7) {
            context.fillText("Boss: The city has no internet. Go and fix it! Help people!", 20, 220);
        }
        if (timer > 8) {
            context.fillStyle = "rgba(53, 188, 120, 0.69)";
            context.fillRect(PlayPanelX, PlayPanelY, 240, 50);
            context.font = "35px Conquir New";
            context.fillStyle = "white"
            context.fillText("P l a y", PlayPanelX + 75, PlayPanelY + 36)
        }
    }
    requestAnimationFrame(draw); //NEBARAI TOZI RED- Trqbva da e posleden ;)
}
update(); //purvo vikane. ne go zatrivai!
draw(); //purvo vikane. ne go zatrivai!