const prompt = require('prompt-sync')({sigint: true});
 
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const rowNum = 10, colNum = 10;

//Create a Field Class
class Field
{
    constructor() {
        this._field = Array(colNum).fill().map(() => Array(rowNum));
        this._locationY = 0;
        this._locationX = 0;
    }

generateField(percentage) {
    
    for (let y = 0; y < colNum; y++) {
        for (let x = 0; x < rowNum; x++) {
            const prob = Math.random();
            this._field[y][x] = prob > percentage ? fieldCharacter : hole;
        }
    }
    // Set the "hat" location : Object
    const hatLocation = {
        x: Math.floor(Math.random() * rowNum),
        y: Math.floor(Math.random() * colNum)
    };

    // Make sure the "hat" is not at the starting point
    while (hatLocation.x == 0 && hatLocation.y == 0) {
        hatLocation.x = Math.floor(Math.random() * rowNum);
        hatLocation.y = Math.floor(Math.random() * colNum);
    }

    this._field[hatLocation.y][hatLocation.x] = hat;

    // Set the "home" position before the game starts
    this._field[0][0] = pathCharacter;

} // end of generatefield

runGame() {
    let playing = true;
    
    while(playing){
    console.log("Start Game");

    //print the field
    this.print();
    this.askQuestion();  
    
    // game over
    if (!this.withinBound()) {
        console.log("Sorry, you are out of boundary.");
        playing = false;

      } else if (this.getHole()) {
        console.log("Sorry, you fell down a hole.");
        playing = false;

      } else if (this.getHat()) {
        console.log("Congrats, you're successfully to get the hat!");
        playing = false;

      } else {
        this._field[this._locationY][this._locationX] = pathCharacter;
      }
    };
    
} // end of runGame

print() {
    const displayString = this._field.map (row =>
        row.join('')).join('\n');
    
    console.log(displayString);
}

askQuestion() {
    const direction = prompt('Which way? Please enter "U", "D", "L", or "R".').toUpperCase();
    switch (direction) {
        case "U":
            this._locationY -= 1;
            break;

        case "D":
            this._locationY += 1;
            break;

        case "L":
            this._locationX -= 1;
            break;

        case "R":
            this._locationX += 1;
            break;

        default:
            console.log("Invalid entry. Please enter U, D, L or R.");
            break;

        }; //end of switch direction        

    } //end askQuestion

    withinBound () {
        return (
            this._locationY >= 0 &&
            this._locationX >= 0 &&
            this._locationY < colNum &&
            this._locationX < rowNum
        );
    }

    getHat() {
        return this._field[this._locationY][this._locationX] === hat;
    }

    getHole() {
        return this._field[this._locationY][this._locationX] === hole;
    }

}; //end class

const myfield = new Field();
myfield.generateField(0.3);
myfield.runGame();

