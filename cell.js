class Cell {
    constructor(i, j, status = 'static') {
        this.i = i
        this.j = j
        this.status = status
        this.fill = color("#33ddaa")
    }

    makeOccupied() {
        this.status = 'occupied'
    }
    isOccupied() {
        return this.status === 'occupied'
    }
    show() {
        if (this.status === 'static') {
            this.fill = color("#333")
        } else if (this.status === 'occupied') {
            this.fill = color("#33ddaa")
        }

        noStroke()

        let x = this.i * CELL_SIZE
        let y = this.j * CELL_SIZE
        fill(this.fill)
        rect(x, y, CELL_SIZE, CELL_SIZE, 5)
    }

    move(direction) {
        switch (direction) {
            case 'left': {
                this.i--
                break
            }
            case 'right': {
                this.i++
                break
            }
            case 'down': {
                this.j++
                break
            }
        }
    }

    canMove(direction, board) {
        switch (direction) {
            case 'left': {
                return this.i > 0 && !board[this.i - 1][this.j].isOccupied()
            }
            case 'right': {
                return this.i < COLS - 1 && !board[this.i + 1][this.j].isOccupied()
            }
            case 'down': {
                return this.j < ROWS - 1 && !board[this.i][this.j + 1].isOccupied()
            }
        }


        return canMove
    }
}