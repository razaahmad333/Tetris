function createBoard(rows, cols) {
    let board = []
    for (let i = 0; i < cols; i++) {
        board[i] = []
        for (let j = 0; j < rows; j++) {
            board[i][j] = new Cell(i, j)
        }
    }
    return board
}

function drawBoard(board, rows, cols, UPPER_SECTION) {




    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            board[i][j].show()
        }
    }

}


const COMBINATIONS = [
    [
        { i: 0, j: 1 },
        { i: 1, j: 1 },
        { i: 2, j: 1 },
        { i: 3, j: 1 }
    ],
    [
        { i: 0, j: 1 },
        { i: 1, j: 1 },
        { i: 2, j: 1 },
    ],
    [
        { i: 0, j: 1 },
        { i: 1, j: 1 },
    ],

    [
        { i: 1, j: 0 },
        { i: 1, j: 1 },
        { i: 1, j: 2 },
    ],
    [
        { i: 1, j: 0 },
        { i: 1, j: 1 },
    ],
    [
        { i: 1, j: 0 },
        { i: 2, j: 0 },
        { i: 1, j: 1 },
        { i: 2, j: 1 },
    ],

]


function generateCurrentCellGroup(COLS) {
    const combination = random(COMBINATIONS)
    const MID = Math.floor((COLS - 2) / 2)
    const currentCellGroup = []
    for (let i = 0; i < combination.length; i++) {
        currentCellGroup.push(new Cell(MID + combination[i].i, combination[i].j, 'moving'))
    }
    return currentCellGroup
}

function drawCurrentCellGroup(currentCellGroup) {
    for (let i = 0; i < currentCellGroup.length; i++) {
        currentCellGroup[i].show()
    }
}

function canMoveCellGroup(currentCellGroup, board, direction) {
    let canMove = true
    for (const cell of currentCellGroup) {
        canMove = canMove && cell.canMove(direction, board)
    }
    return canMove
}

function moveCurrentCellGroup(currentCellGroup, board, direction) {
    if (canMoveCellGroup(currentCellGroup, board, direction)) {
        for (const cell of currentCellGroup) {
            cell.move(direction)
        }
    }
}



function settleCurrentCellGroupInBoard(currentCellGroup, board) {
    for (const cell of currentCellGroup) {
        const i = cell.i
        const j = cell.j
        board[i][j].makeOccupied()
    }
}

function checkForSettlement(currentCellGroup, board, COLS) {
    let readyForSettlement = false
    for (const cell of currentCellGroup) {
        const i = cell.i
        const j = cell.j
        readyForSettlement = j + 1 === ROWS ? true : board[i][j + 1].isOccupied()

        if (readyForSettlement)
            break
    }

    if (readyForSettlement) {
        settleCurrentCellGroupInBoard(currentCellGroup, board)
        return generateCurrentCellGroup(COLS)
    }

    return currentCellGroup
}

function checkForGameOver(currentCellGroup, board) {
    let gameOver = false
    for (const cell of currentCellGroup) {
        const i = cell.i
        const j = cell.j
        gameOver = board[i][j].isOccupied()
        // console.log(board[i][j].status)
        if (gameOver)
            break
    }
    return gameOver
}

function checkForFullRows(board) {
    const fullRows = []
    for (let i = 0; i < ROWS; i++) {
        let fullRow = true
        for (let j = 0; j < COLS; j++) {
            fullRow = fullRow && board[j][i].isOccupied()
        }
        if (fullRow)
            fullRows.push(i)
    }
    return fullRows
}

function removeFullRow(board, row) {

    for (let i = row; i > 0; i--) {
        for (let j = 0; j < COLS; j++) {
            board[j][i].status = board[j][i - 1].status
        }
    }
}   