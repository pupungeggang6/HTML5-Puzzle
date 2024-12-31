class Level {
}

class Board {
    block = []
    selected = []
    row = 0
    col = 0
    leftTop = null
    selectedNum = 0

    constructor(size, properties) {
        this.row = size[0]
        this.col = size[1]
        this.leftTop = new Vector(UI.battle.boardCenter[0] - UI.blockSize[0] / 2 * (this.col - 1), UI.battle.boardCenter[1] - UI.blockSize[1] / 2 * (this.row - 1))
        
        for (let i = 0; i < this.row; i++) {
            let temp = []
            let tempSelected = []

            for (let j = 0; j < this.col; j++) {
                let types = ['Attack', 'Shield', 'Scroll', 'Energy']
                let type = types[Math.floor(Math.random() * types.length)]
                temp.push(new Collectable({'Type': type, 'Position': [this.leftTop.x + j * UI.blockSize[0], this.leftTop.y + i * UI.blockSize[1]]}))
                tempSelected.push(0)
            }

            this.block.push(temp)
            this.selected.push(tempSelected)
        }
    }

    createZero(row, col) {
        let tempBoard = []

        for (let i = 0; i < row; i++) {
            let temp = []

            for (let j = 0; j < col; j++) {
                temp.push(0)
            }

            tempBoard.push(temp)
        }

        return tempBoard
    }

    findConnected(row, col) {
        let queue = []
        let selectedBlock = this.block[row][col]
        this.selectedNum = 0

        if (selectedBlock instanceof Collectable) {
            this.selected = this.createZero(this.row, this.col)

            let type = selectedBlock.type
            queue.push([row, col])

            while (queue.length > 0) {
                let first = queue[0]
                this.selected[first[0]][first[1]] = 1
                this.selectedNum += 1
                for (let i = 0; i < 4; i++) {
                    let nextRow = first[0] + neighborBlock[i][0]
                    let nextCol = first[1] + neighborBlock[i][1]
                    if (nextRow >= 0 && nextRow < this.row && nextCol >= 0 && nextCol < this.col) {
                        if (this.block[nextRow][nextCol].type === type && this.selected[nextRow][nextCol] === 0) {
                            queue.push([nextRow, nextCol])
                        }
                    }
                }
                queue.shift()
            }
        }
    }

    removeBlock(removed) {
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {
                if (removed[i][j] === 1) {
                    this.block[i][j] = new EmptyBlock({'Position': [this.leftTop.x + j * UI.blockSize[0], this.leftTop.y + i * UI.blockSize[1]]})
                }
            }
        }

        this.fallHandle()
    }

    fallHandle() {
        for (let n = 0; n < this.row; n++) {
            for (let i = this.row - 2; i >= 0; i--) {
                for (let j = 0; j < this.col; j++) {
                    if (this.block[i][j].fall === true && this.block[i + 1][j] instanceof EmptyBlock) {
                        this.block[i][j].addMove('Down')
                        this.block[i + 1][j].position.y += UI.blockSize[1]
                        let temp = this.block[i][j]
                        this.block[i][j] = this.block[i + 1][j]
                        this.block[i + 1][j] = temp
                    }
                }
            }

            for (let i = 0; i < this.col; i++) {
                if (this.block[0][i] instanceof EmptyBlock) {
                    let types = ['Attack', 'Shield', 'Scroll', 'Energy']
                    let type = types[Math.floor(Math.random() * types.length)]
                    this.block[0][i] = new Collectable({'Type': type, 'Position': [this.leftTop.x + i * UI.blockSize[0], this.leftTop.y - UI.blockSize[1] * (n + 1)]})
                    this.block[0][i].moveQueue.push(new Vector(this.leftTop.x + i * UI.blockSize[0], this.leftTop.y))
                }
            }
        }
    }

    clickHandle(mode, row, col) {
        if (mode === 'Normal') {
            if (this.selected[row][col] === 1 && this.selectedNum >= 2) {
                this.removeBlock(this.selected)
                this.selected = this.createZero(this.row, this.col)
            } else if (this.block[row][col] instanceof Collectable) {
                this.findConnected(row, col)
            }
        }
    }

    render() {
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {
                this.block[i][j].render()

                if (this.selected[i][j] === 1) {
                    context.drawImage(img.selectFrame, this.leftTop.x + j * UI.blockSize[0] - UI.blockSize[0] / 2, this.leftTop.y + i * UI.blockSize[1] - UI.blockSize[1] / 2)
                }
            }
        }
    }

    moveBlock() {
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {
                this.block[i][j].move()
            }
        }
    }
}

class Enemy {
}

class Block {
    position = null
    size = null
    type = ''
    fall = false
    moveQueue = []
    speed = 0

    constructor() {
        this.size = new Vector(UI.blockSize[0], UI.blockSize[1])
        this.speed = 320
    }

    render() {

    }

    move() {
        
    }
}

class EmptyBlock extends Block {
    constructor(properties) {
        super()
        this.type = 'Null'
        this.position = new Vector(properties['Position'][0], properties['Position'][1])
        this.fall = false
        this.moveQueue = []
    }
}

class Collectable extends Block {
    destination = null

    constructor(properties) {
        super()
        this.type = properties['Type']
        this.position = new Vector(properties['Position'][0], properties['Position'][1])
        this.destination = new Vector(properties['Position'][0], properties['Position'][1])
        this.fall = true
        this.moveQueue = []
    }

    render() {
        if (this.type === 'Attack') {
            context.drawImage(img.block.attack, this.position.x - this.size.x / 2, this.position.y - this.size.y / 2)
        } else if (this.type === 'Shield') {
            context.drawImage(img.block.shield, this.position.x - this.size.x / 2, this.position.y - this.size.y / 2)
        } else if (this.type === 'Energy') {
            context.drawImage(img.block.energy, this.position.x - this.size.x / 2, this.position.y - this.size.y / 2)
        } else if (this.type === 'Scroll') {
            context.drawImage(img.block.scroll, this.position.x - this.size.x / 2, this.position.y - this.size.y / 2)
        }
    }

    addMove(direction) {
        if (this.moveQueue.length === 0) {
            if (direction === 'Down') {
                this.moveQueue.push(new Vector(this.position.x, this.position.y + UI.blockSize[1]))
            }
        } else {
            if (direction === 'Down') {
                let lastQueue = this.moveQueue[this.moveQueue.length - 1]
                this.moveQueue.push(new Vector(lastQueue.x, lastQueue.y + UI.blockSize[1]))
            }
        }
    }

    move() {
        if (this.moveQueue.length > 0) {
            let first = this.moveQueue[0]
            let diff = VectorOP.sub(first, this.position)
            let diffS = VectorOP.norm(diff)
            let diffN = VectorOP.normalize(diff)

            if (diffS > 10) {
                this.position.x += diffN.x * 320 / delta
                this.position.y += diffN.y * 320 / delta
            } else {
                this.position.x = first.x
                this.position.y = first.y
                this.moveQueue.shift()
            }
        }
    }
}

class Vector {
    x = 0
    y = 0

    constructor(x, y) {
        this.x = x
        this.y = y
    }
}
