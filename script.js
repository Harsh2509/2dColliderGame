let paintbox = document.getElementById("paintbox");
let context = paintbox.getContext("2d");

// context.fillStyle = "red";
// context.fillRect(0, 200, 50, 50);

// context.fillStyle = "blue";
// context.fillRect(100, 0, 50, 50);
// context.fillRect(300, 0, 50, 50);

// context.strokeRect(440, 200, 60, 60);

class Box {
  constructor(size, color) {
    this.size = size;
    this.color = color;
    this.x = 0;
    this.y = 0;
  }
}

class Player extends Box {
  constructor() {
    super(50, "blue");
    this.speed = 0;
  }

  move() {
    this.x += this.speed;
  }
}

class Enemy extends Box {
  constructor(speed) {
    super(50, "red");
    this.speed = speed;
  }

  move() {
    this.y += this.speed;
    if (this.y + this.size >= 500) {
      this.speed = -Math.abs(this.speed);
    }
    if (this.y == 0) {
      this.speed = Math.abs(this.speed);
    }
  }
}

let player = new Player();
let e1 = new Enemy(4);
let e2 = new Enemy(8);
let e3 = new Enemy(12);
player.y = 225;
e1.x = 100;
e2.x = 233;
e3.x = 366;

let gameOn = true;
let playerSpeed = 5;
let win_mess = document.querySelector(".win_mess");
const win_heading = document.createElement("h1");
let root = document.querySelector("body");

function makeBox(box) {
  context.fillStyle = box.color;
  context.fillRect(box.x, box.y, box.size, box.size);
}

// setInterval(() => {
//   context.clearRect(0, 0, 500, 500);
//   e1.y += e1.speed;
//   e2.y += e2.speed;
//   makeBox(e1);
//   makeBox(e2);
// }, 100);

function isCollided(box1, box2) {
  if (
    box1.x + box1.size > box2.x &&
    box1.x < box2.x + box2.size &&
    box2.y - box2.size < box1.y &&
    box2.y - box2.size > box1.y - box1.size
  ) {
    return true;
  }
  return false;
}

setInterval(() => {
  playerSpeed = parseInt(Math.random() * 10) + 2;
  player.y = 100 + Math.random() * 300;
}, 2000);

function updateGame() {
  window.requestAnimationFrame(() => {
    if (!gameOn) return;
    context.clearRect(0, 0, 500, 500);
    e1.move();
    e2.move();
    e3.move();
    player.move();

    if (
      isCollided(player, e1) ||
      isCollided(player, e2) ||
      isCollided(player, e3)
    ) {
      window.alert("Game Over");
      gameOn = false;
    } else if (player.x + player.size >= 500) {
      console.log("You WON!!");
      win_heading.innerHTML = "You WON🎉🙌🎉";
      win_mess.appendChild(win_heading);
      root.style.backgroundColor = "cyan";
      gameOn = false;
    }

    makeBox(player);
    makeBox(e1);
    makeBox(e2);
    makeBox(e3);
    updateGame();
  });
}
updateGame();

paintbox.addEventListener("mousedown", () => {
  player.speed = playerSpeed;
  //   console.log(playerSpeed);
});
paintbox.addEventListener("touchstart", (e) => {
  e.preventDefault();
  player.speed = playerSpeed;
});
paintbox.addEventListener("mouseup", () => {
  player.speed = 0;
});
paintbox.addEventListener("touchend", (e) => {
  e.preventDefault();
  player.speed = 0;
});
function wonMessage() {}
