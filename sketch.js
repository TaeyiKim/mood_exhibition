let bedroom;
let fire;
let livingroom;
let kitchen;
let smoke;
let img1, img2, img3, img4, img5, img6, img7, img8, img9, img10;
let num = 15;
let mx = [];
let my = [];
let x = 0;
let y = 0;
let speed = 0;
let gravity = 0.1;
let myTexts = [];
let phrases = ['sad', 'bittersweet', 'happy', 'melancholy', 'melancholy', 'euphoria', 'stupid', 'gloomy', 'depression', 'awkwardness', 'awful', 'shit', 'delighted', 'glad', 'terrific', 'bad', 'terrific', 'bad', 'confused', 'confused', 'stuffy', 'depressed', 'dull', 'tedious', 'miserable', 'pathetic'];

function preload() {
    img1 = loadImage('house.png');
    img2 = loadImage('bedroom.jpg');
    img3 = loadImage('fire.jpg');
    img4 = loadImage('livingroom.jpg');
    img5 = loadImage('kitchen.jpg');
    img6 = loadImage('smoke.png');
    img7 = loadImage('photo.png');
    img8 = loadImage('lp.png');
    img9 = loadImage('television.png');
    img10 = loadImage('poem.png');
}

function setup() {
    createCanvas(1000, 1000);

    for (let i = 0; i < 27; i++) {
        myTexts[i] = new Texts(phrases[i], random(width), random(height / 2), random(0.5, 1));
    }
}

function draw() {

    // dark inside
    background(0);

    // four windows (left -> right)
    if (mouseX > 272 && mouseX < 355 && mouseY > 702 && mouseY < 787) {
        bedroom = true;
        fire = false;
        livingroom = false;
        kitchen = false;
        smoke = false;
    } else if (mouseX > 417 && mouseX < 454 && mouseY > 778 && mouseY < 803) {
        bedroom = false;
        fire = true;
        livingroom = false;
        kitchen = false;
        smoke = false;
    } else if (mouseX > 495 && mouseX < 578 && mouseY > 703 && mouseY < 811) {
        bedroom = false;
        fire = false;
        livingroom = true;
        kitchen = false;
        smoke = false;
    } else if (mouseX > 610 && mouseX < 694 && mouseY > 703 && mouseY < 779) {
        bedroom = false;
        fire = false;
        livingroom = false;
        kitchen = true;
        smoke = false;
    }

    // window images
    imageMode(CORNER);
    if (bedroom) {
        image(img2, 231, 705, 160, 80);
    } else if (fire) {
        image(img3, 385, 770, 80, 40);
    } else if (livingroom) {
        image(img4, 475, 700, 130, 140);
    } else if (kitchen) {
        image(img5, 605, 690, 90, 90);
    }

    // house
    image(img1, 0, 0, 1000, 1000);

    // chimney
    if (fire) {
        image(img6, 290, 190, 300, 420);
    }

    // mouse trace
    frameRate(30);
    noStroke();
    fill(random(255), random(255), random(255), 150);
    for (let i = 0; i < num; i++) {
        mx.push(i);
        my.push(i);
    }

    let which = frameCount % num;
    mx[which] = mouseX;
    my[which] = mouseY;

    for (let i = 0; i < num; i++) {
        let index = (which + 1 + i) % num;
        ellipse(mx[index], my[index], i, i);
    }

    // falling mood text
    fill(255, 120);
    textSize(20);
    textStyle(BOLDITALIC);
    // left

    for (let i = 0; i < 27; i++) {
        myTexts[i].display();
        myTexts[i].move();
    }

    // contents
    imageMode(CENTER);
    if (bedroom) {
        if (mouseIsPressed) {
            image(img7, mouseX, mouseY, 747, 268);
        }
    } else if (fire) {
        if (mouseIsPressed) {
            image(img8, mouseX, mouseY, 800, 800);
        }
    } else if (livingroom) {
        if (mouseIsPressed) {
            image(img9, mouseX, mouseY, 800, 550);
        }
    } else if (kitchen) {
        if (mouseIsPressed) {
            image(img10, mouseX, mouseY, 400, 550);
        }
    }

}

class Texts {
    constructor(t, xpos, ypos, _gravity) {
        this.t = t;
        this.xpos = xpos;
        this.ypos = ypos;
        this.speed = 0;
        this.gravity = _gravity;
    }

    display() {
        text(this.t, this.xpos, this.ypos);
    }

    move() {
        this.ypos = this.ypos + this.speed;
        this.speed = this.speed + this.gravity;
        if (this.ypos > height) {
            this.speed = this.speed * -0.8;
            this.ypos = height;
        }
    }
}