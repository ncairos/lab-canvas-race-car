window.onload = function() {
  const raceCar = {
    title: "Island Racer",
    author: "Rebecca, Nino, Victor",
    license: undefined,
    version: "1.0",
    canvasDom: undefined,
    ctx: undefined,
    car: undefined,
    obstacles: [],
    frames: 1,

    init(id) {
      this.canvasDom = document.getElementById(id);
      this.ctx = this.canvasDom.getContext("2d");
      this.setDimensions();
      this.setEventListeners();
    },
    setDimensions() {
      document.getElementsByTagName("body")[0].style.margin = 0;
      this.canvasDom.setAttribute("height", window.innerHeight);
      this.canvasDom.setAttribute("width", 600);
    },
    canvasGreen() {
      this.ctx.fillStyle = "green";
      this.ctx.fillRect(0, 0, 600, window.innerHeight); //x, y, ancho y alto
    },
    canvasGray() {
      this.ctx.fillStyle = "grey";
      this.ctx.fillRect(50, 0, 500, window.innerHeight);
    },
    canvasLine() {
      this.ctx.strokeStyle = "white";
      this.ctx.lineWidth = 10;
      this.ctx.setLineDash([0, 0]);
      this.ctx.beginPath();
      this.ctx.moveTo(70, 0);
      this.ctx.lineTo(70, window.innerHeight);
      this.ctx.stroke();
      this.ctx.moveTo(530, 0);
      this.ctx.lineTo(530, window.innerHeight);
      this.ctx.stroke();
    },
    canvasLineDash() {
      this.ctx.strokeStyle = "white";
      this.ctx.lineWidth = 10;
      this.ctx.setLineDash([50, 20]);
      this.ctx.beginPath();
      this.ctx.moveTo(295, 0);
      this.ctx.lineTo(295, window.innerHeight);
      this.ctx.stroke();
    },
    setEventListeners() {
      document.onkeydown = e => {
        switch (e.keyCode) {
          case 37:
            this.car.goLeft();
            break;
          case 39:
            this.car.goRight();
            break;
        }
      };
    },
    drawControlledCar() {
      this.car = new CarMove(this.ctx);
      setInterval(() => {
        this.clearScreen();
        this.canvasGreen();
        this.canvasGray();
        this.canvasLine();
        this.canvasLineDash();
        this.manageObstacles();
        this.car.draw();
      }, 1);
    },
    clearScreen() {
      this.ctx.clearRect(0, 0, 600, window.innerHeight);
    },
    manageObstacles() {
      let random = Math.floor(Math.random() * 200);
      for (let i = 0; i < this.obstacles.length; i++) {
        this.obstacles[i].update();
      }

      this.frames += 1;

      if (this.frames % 300 === 0) {
        this.obstacles.push(new Obstacle(this.ctx, random, 20, random, 0));
      }
    }
  };

  class CarMove {
    constructor(ctx) {
      this._ctx = ctx;
      this._image = new Image();
      this._image.src = `./images/car.png`;
      this._posX = 221;
      this._posY = window.innerHeight - 200;
      this._vel = 20;
    }

    draw() {
      this._ctx.drawImage(this._image, this._posX, this._posY, 80, 160); //ANCHO & LARGO COCHE
    }

    goLeft() {
      this._posX -= this._vel;
    }

    goRight() {
      this._posX += this._vel;
    }
  }

  class Obstacle {
    constructor(ctx, width, height, x, y) {
      this._width = width;
      this._height = height;
      this._posX = x;
      this._posY = y;
      this._ctx = ctx;

      this._speedX = 0;
      this._speedY = 0;
    }

    update() {
      this._posY += 1;
      this._ctx.fillStyle = "brown";
      this._ctx.fillRect(this._posX, this._posY, this._width, this._height);
    }
  }

  document.getElementById("start-button").onclick = function() {
    raceCar.start();
  };

  raceCar.init("myCanvas");
  raceCar.canvasGreen();
  raceCar.canvasGray();
  raceCar.canvasLine();
  raceCar.canvasLineDash();
  raceCar.manageObstacles();
  raceCar.drawControlledCar();
};
