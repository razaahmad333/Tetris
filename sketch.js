const ROWS = 15
const COLS = 10
const CELL_SIZE = 40
const UPPER_SECTION = 3

let board
let currentCellGroup = []
let gameOver = false
let gamePlayInterval
const SPEED = 400
const BLASTING_SPEED = 300
let fullRows = []

let blastingInterval

function gamePlay() {
    moveCurrentCellGroup(currentCellGroup, board, 'down')
    gameOver = checkForGameOver(currentCellGroup, board)
    currentCellGroup = checkForSettlement(currentCellGroup, board, COLS)
    fullRows = checkForFullRows(board)

    if (fullRows.length > 0) {
        clearInterval(gamePlayInterval)
        blastingInterval = setInterval(blastingAnimation, blastingInterval)
    }


    if (gameOver) {
        clearInterval(gamePlayInterval)
        noLoop()
        alert('Game Over')
        board = createBoard(ROWS, COLS)
        currentCellGroup = generateCurrentCellGroup(COLS)
        gamePlayInterval = setInterval(gamePlay, SPEED)
        loop()
    }
}

function blastingAnimation() {
    if (fullRows.length > 0) {
        const row = fullRows.pop()
        removeFullRow(board, row)
    }
    else {
        clearInterval(blastingInterval)
        gamePlayInterval = setInterval(gamePlay, SPEED)
    }
}

function pauseGame() {
    if (isLooping()) {
        clearInterval(gamePlayInterval)
        clearInterval(blastingInterval)
        noLoop()
    }
    else {
        loop()
        gamePlayInterval = setInterval(gamePlay, SPEED)
    }
}
function setup() {
    createCanvas(COLS * CELL_SIZE, ROWS * CELL_SIZE)
    board = createBoard(ROWS, COLS)
    currentCellGroup = generateCurrentCellGroup(COLS)
    gamePlayInterval = setInterval(gamePlay, SPEED)

}

function draw() {
    background("#333")
    drawBoard(board, ROWS, COLS, UPPER_SECTION * CELL_SIZE)
    drawCurrentCellGroup(currentCellGroup)
    stroke(255)

}

function keyPressed() {
    if (keyCode === DOWN_ARROW)
        moveCurrentCellGroup(currentCellGroup, board, 'down')
}

function keyReleased() {
    if (keyCode === LEFT_ARROW)
        moveCurrentCellGroup(currentCellGroup, board, 'left')
    else if (keyCode === RIGHT_ARROW)
        moveCurrentCellGroup(currentCellGroup, board, 'right')

    else if (keyCode === 32) {
        pauseGame()
    }
}

function mouseClicked() {
    if (mouseY < UPPER_SECTION * CELL_SIZE)
        return false

    const direction = mouseX < COLS * CELL_SIZE * 0.5 ? "left" : "right"
    moveCurrentCellGroup(currentCellGroup, board, direction)
}

function mousePressed() {
    if (mouseY < UPPER_SECTION * CELL_SIZE) {
        moveCurrentCellGroup(currentCellGroup, board, 'down')
    }
}

