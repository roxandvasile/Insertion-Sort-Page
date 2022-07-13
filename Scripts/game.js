"use strict"

const GameDifficulty = [20, 50, 70];

class Game {
    difficulty; // dificultatea bazata pe matricea GameDifficulty
    cols = 3; // cate coloane avem
    rows = 3; // cate randuri avem
    count; // cols*rows
    blocks; // elementele html cu className="puzzle_block"
    emptyBlockCoords = [2, 2]; // coordonatele blocului gol
    indexes = []; // tinem evidenta ordinii blocurilor

    constructor(difficultyLevel = 1) {
        this.difficulty = GameDifficulty[difficultyLevel - 1];
        this.count = this.cols * this.rows;
        this.blocks = document.getElementsByClassName("puzzle_block"); //grab the blocks
        this.init();
    }

    // pozitionam fiecare bloc in pozitia sa corecta
    init() {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                let blockIdx = x + y * this.cols;
                if (blockIdx + 1 >= this.count) break;
                let block = this.blocks[blockIdx];
                this.positionBlockAtCoord(blockIdx, x, y);
                block.addEventListener('click', (e) => this.onClickOnBlock(blockIdx));
                this.indexes.push(blockIdx);
            }
        }
        this.indexes.push(this.count - 1);
        this.randomize(this.difficulty);
    }

    // mutam un bloc aleatoriu (x iterationCount)
    randomize(iterationCount) {
        for (let i = 0; i < iterationCount; i++) {
            let randomBlockIdx = Math.floor(Math.random() * (this.count - 1));
            let moved = this.moveBlock(randomBlockIdx);
            if (!moved) i--;
        }
    }

    // mutam un bloc si vom returna "true", daca acesta a fost mutat
    moveBlock(blockIdx) {
        let block = this.blocks[blockIdx];
        let blockCoords = this.canMoveBlock(block);
        if (blockCoords != null) {
            this.positionBlockAtCoord(blockIdx, this.emptyBlockCoords[0], this.emptyBlockCoords[1]);
            this.indexes[this.emptyBlockCoords[0] + this.emptyBlockCoords[1] * this.cols] = this.indexes[blockCoords[0] + blockCoords[1] * this.cols];
            this.emptyBlockCoords[0] = blockCoords[0];
            this.emptyBlockCoords[1] = blockCoords[1];
            return true;
        }
        return false;
    }

    // returnam coordonatele blocului daca acesta se poate mutat, daca nu returnam null
    canMoveBlock(block) {
        let blockPos = [parseInt(block.style.left), parseInt(block.style.top)];
        let blockWidth = block.clientWidth;
        let blockCoords = [blockPos[0] / blockWidth, blockPos[1] / blockWidth];
        let diff = [Math.abs(blockCoords[0] - this.emptyBlockCoords[0]), Math.abs(blockCoords[1] - this.emptyBlockCoords[1])];
        let canMove = (diff[0] == 1 && diff[1] == 0) || (diff[0] == 0 && diff[1] == 1);
        if (canMove) return blockCoords;
        else return null;
    }

    // pozitionam blocul in anumite coordonate
    positionBlockAtCoord(blockIdx, x, y) {
        let block = this.blocks[blockIdx];
        block.style.left = (x * block.clientWidth) + "px";
        block.style.top = (y * block.clientWidth) + "px";
    }

    //incercam sa mutam blocul si verificam daca puzzle-ul a fost rezolvat
    onClickOnBlock(blockIdx) {
        if (this.moveBlock(blockIdx)) {
            if (this.checkPuzzleSolved()) {
                setTimeout(() => alert("Puzzle Solved!!"), 600);
            }
        }
    }


    checkPuzzleSolved() { //return if puzzle was solved
        for (let i = 0; i < this.indexes.length; i++) {

            if (i == this.emptyBlockCoords[0] + this.emptyBlockCoords[1] * this.cols) continue;
            if (this.indexes[i] != i) return false;
        }
        return true;
    }

    setDifficulty(difficultyLevel) { //set difficulty
        this.difficulty = GameDifficulty[difficultyLevel - 1];
        this.randomize(this.difficulty);
    }

}

// initializam un joc nou
var game = new Game(1);


// setam dificultatea pt fiecare butoane
var difficulty_buttons = Array.from(document.getElementsByClassName("difficulty_button"));
difficulty_buttons.forEach((elem, idx) => {
    elem.addEventListener('click', (e) => {
        difficulty_buttons[GameDifficulty.indexOf(game.difficulty)].classList.remove("active");
        elem.classList.add("active");
        game.setDifficulty(idx + 1);
    });
});