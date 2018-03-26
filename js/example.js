var Tile = function(x, y, face) {
    this.x = x;
    this.y = y;
    this.face = face;
    this.width = 70;
};

Tile.prototype.drawFaceDown = function() {
    fill(214, 247, 202);
    rect(this.x, this.y, this.width, this.width, 10);
};

Tile.prototype.drawFaceUp = function() {
    fill(214, 247, 202);
    strokeWeight(2);
    rect(this.x, this.y, this.width, this.width, 10);
    fillText(this.face, this.x, this.y);
};


// Declare an array of all possible faces
var faces = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10"
];

// Make an array which has 2 of each, then randomize it
var selected = [];
for (var i = 0; i < 10; i++) {
    // Randomly pick one from the array of remaining faces
    var randomInd = Math.floor(Math.random(faces.length));
    var face = faces[randomInd];
    // Push 2 copies onto array
    selected.push(face);
    selected.push(face);
    // Remove from array
    faces.splice(randomInd, 1);
}

// Now we need to randomize the array
selected.sort(function() {
    return 0.5 - Math.random();
});

// Create the tiles
var tiles = [];
var NUM_COLS = 5;
var NUM_ROWS = 4;
for (var i = 0; i < NUM_COLS; i++) {
    for (var j = 0; j < NUM_ROWS; j++) {
        tiles.push(new Tile(i * 78 + 10, j * 78 + 40, selected.pop()));
    }
}

//background(255, 255, 255);

// Now draw them face up
for (var i = 0; i < tiles.length; i++) {
    tiles[i].drawFaceUp();
}
