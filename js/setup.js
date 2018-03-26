//game vars
var numTries = 0;
var numMatches = 0;
var foundAllMatches = false;

//color depends on mode blue or red

//default for testing
var tile_r = 66;
var tile_b = 134;
var tile_g = 244;


var Tile = function(x,y, word) {
    this.x = x;
    this.y = y;
    this.word = word;
    this.width = 70;
    this.isFaceUp = true;
    this.isMatch = false;
    drawFaceDown = function() {
        fill(tile_r, tile_b, tile_g);
        strokeWeight(2);
        rect(this.x, this.y, this.width, this.width, 10);
        this.isFaceUp = false;
    };
    drawFaceUp = function() {
        fill(tile_r, tile_b, tile_g);
        strokeWeight(2);
        rect(this.x, this.y, this.width, this.width, 10);
        fillText(this.word, this.x, this.y);
        this.isFaceUp = true;
    };
    isUnderMouse = function(x, y) {
        return x >= this.x && <= this.x + this.width &&
            y >= this.y && y <= this.y + this.width;
    };
}

var cols = 5;
var rows = 4;

var words = [
    "and",
    "strong",
    "turn",
    "roll",
    "between",
    "care",
    "dear",
    "far",
    "push",
    "end"
];

var possibleFaces = words.slice(0);
var selected = [];

for (var i = 0; i < 10; i++) {
    //randomly pick a face
    var randomInd = floor(random(possibleFaces.length));
    var word = possibleFaces[randomInd];
    //push 2 copies onto array
    selected.push(word);
    selected.push(word);
    //remove from array
    faces.splice(randomInd, 1);
}

var shuffleArray = function(array) {
    var counter = array.length;

    //while there are elements in the array
    while (counter > 0) {
        //pick a random index
        var index = Math.floor(Math.random() * counter);
        counter--;
        //swap last element with it
        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
};

shuffleArray(selected);

//create tiles
var tiles = [];

for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; i++) {
        var randomFace = selected.pop();
        var tile = new Tile(i * 78 + 10, j * 78 + 40, randomFace);
        tiles.push(tile);
    }
}

//DRAWING GAME ON CANVAS
//ALL CARDS FACE DOWN
for (var i = 0; i <tiles.length; i++) {
    tiles[i].drawFaceDown();
}

var flippedTiles = [];

//tile clicked
mouseClicked = function() {
    for (var i = 0; i < tiles.length; i++) {
        if (tiles[i].isUnderMouse(mouseX, mouseY)) {
            if (flippedTiles.length < 2 && !tiles[i].isFaceUp) {
                tiles[i].drawFaceUp();
                flippedTiles.push(tiles[i]);
                if (flippedTiles.length === 2) {
                    numTries++;
                    if (flippedTiles[0].word === flippedTiles[1].word) {
                        numMatches++;
                        flippedTiles[0].isMatch = true;
                        flippedTiles[1].isMatch = true;
                        //if numMatches === 10 end game
                    }
                }

            }
        }
    }
};

draw = function() {
    for (var i = 0; i < tiles.length; i++) {
        if (!tiles[i].isMatch) {
            tiles[i].drawFaceDown();
        }
    }
    flippedTiles[];
};
