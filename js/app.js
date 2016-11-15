// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // make enemies loop to left side of canvas after reaching canvas.width
    if (this.x >= 505) {
        this.x = 0;
    }
    // Check for collision with enemies or barrier-walls
    checkCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-princess-girl.png';
};

Player.prototype.update = function() {
    // function not needed right now
}

// Draw the player on the screen, required method for game
// Display score
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // displayScoreLevel(score, gameLevel);

};

Player.prototype.handleInput = function(key) {
    if (key == 'left') {
        player.x -= player.speed;
    }
    if (key == 'up') {
        player.y -= player.speed - 25;
    }
    if (key == 'right') {
        player.x += player.speed;
    }
    if (key == 'down') {
        player.y += player.speed - 25;
    }
    // console.log('key is: ' + key);
};

var checkCollision = function(enemyCollision) {
    // check for collision between enemy and player
    if (
        player.y + 131 >= enemyCollision.y + 90
        && player.x + 25 <= enemyCollision.x + 88
        && player.y + 73 <= enemyCollision.y + 135
        && player.x + 76 >= enemyCollision.x + 11) {
        // console.log('collided');
        player.x = 202.5;
        player.y = 383;
    }

    // if on water, reset player to starting position
    if(player.y + 150 < 150){
        player.x = 202.5;
        player.y = 383;
    }

    // if player runs into canvas walls, ensure that player can't
    // go beyond canvas wall boundaries.
    if (player.y > 383 ) {
        player.y = 383;
    }
    if (player.x > 402.5) {
        player.x = 402.5;
    }
    if (player.x < 2.5) {
        player.x = 2.5;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Enemy randomly placed vertically within section of canvas

var allEnemies = [];

var player = new Player(202.5, 383, 50);

var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

allEnemies.push(enemy);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    console.log(allowedKeys[e.keyCode]);
});