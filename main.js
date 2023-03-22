//mine swipper demo
class Grid {
  constructor(isBomb, index) {
    this.index = index
    this.isBomb = isBomb
    this.bombNumber = -1
    this.bombCount = this.isBomb ? '-' : -1
    this.show = '*'
    this.marked = 0
    this.opened = 0
  }
  mark() {
    this.marked = 1
    this.show = 'v'
  }
  removeMark() {
    this.marked = 0
    if (this.opened) {
      this.show = this.bombCount
    } else {
      this.show = '*'
    }
  }
  open() {
    this.opened = 1
    this.show = this.bombCount
  }
  isOpened() {
    return this.opened || this.isBomb ? 1 : 0
  }
}
class Maps {
  constructor(size, number) {
    ;[this.width, this.height] = size
    this.totalBomb = number
    this.content = []
    this.gameover = 0
    this.init()
  }
  init() {
    this.getBombs()
    this.creadChessBoard()
    // console.log('this.content :>> ', this.content)
    this.setGridProps()
    console.log('this.bombIndex :>> ', this.bombIndex)
  }
  getBombs() {
    let totalGrid = this.width * this.height
    let bombIndex = []
    for (let i = 0; i < this.totalBomb; i++) {
      let index = Math.floor(Math.random() * totalGrid)
      while (bombIndex.includes(index)) {
        index = Math.floor(Math.random() * totalGrid)
      }
      bombIndex.push(index)
    }
    this.bombIndex = bombIndex
  }
  creadChessBoard() {
    let cnt = 0
    for (let i = 0; i < this.height; i++) {
      this.content[i] = new Array(this.width)
      for (let j = 0; j < this.width; j++) {
        let b = this.bombIndex.includes(cnt) ? 1 : 0
        this.content[i][j] = new Grid(b, [i, j])
        this.content[i][j].bombNumber = cnt
        cnt += 1
      }
    }
  }
  setGridProps() {
    this.content.forEach((col) => {
      col.forEach((g) => {
        if (!g.isBomb) {
          let [x, y] = g.index
          let xindex = [x]
          let yindex = [y]
          x != 0 && xindex.unshift(x - 1)
          x != this.height - 1 && xindex.push(x + 1)
          y != 0 && yindex.unshift(y - 1)
          y != this.width - 1 && yindex.push(y + 1)
          let cnt = 0
          xindex.forEach((xval) => {
            yindex.forEach((yval) => {
              cnt += this.content[xval][yval].isBomb
            })
          })
          g.bombCount = cnt
        }
      })
    })
  }
  print() {
    let output = ''
    this.content.forEach((i) => {
      output = output.concat(i.map((v) => v.show).join(' ') + '\n')
    })
    return output
  }

  forEach2d(func) {
    this.content.forEach((col) => {
      col.forEach((item) => {
        func(item)
      })
    })
  }
  showAll() {
    this.forEach2d((item) => {
      item.open()
    })
  }
  choose(index) {
    function check(map, index) {
      // console.log('index :>> ', index)
      let [i, j] = index
      let h = map.length
      let w = map[0].length
      if (map[i][j].isBomb != 0) {
        return
      }
      map[i][j].show = map[i][j].bombCount
      map[i][j].opened = 1
      if (i != 0 && map[i - 1][j].isOpened() == 0) {
        check(map, [i - 1, j])
      }
      if (i != h - 1 && map[i + 1][j].isOpened() == 0) {
        check(map, [i + 1, j])
      }
      if (j != 0 && map[i][j - 1].isOpened() == 0) {
        check(map, [i, j - 1])
      }
      if (j != w - 1 && map[i][j + 1].isOpened() == 0) {
        check(map, [i, j + 1])
      }
    }
    if (this.content[index[0]][index[1]].isBomb == 1) {
      this.gameOver()
    } else {
      check(this.content, index)
      this.ifWin()
    }
  }
  gameOver() {
    this.showAll()
    this.gameover = -1
  }
  ifWin() {
    let rest = 0
    this.forEach2d((item) => {
      if (item.isBomb && item.marked) {
        rest++
      }
    })
    if (rest == this.totalBomb) {
      this.gameover = 1
    }
    console.log('rest :>> ', rest)
  }
  restCnt() {
    let rest = 0
    this.forEach2d((item) => {
      if (item.marked) {
        rest++
      }
    })
    return rest + '/' + this.totalBomb
  }
}

// let click = [2, 3]
// const testMap = new Maps([5, 5], 5)
// testMap.init()
// testMap.choose(click)
// console.log(testMap.print())
// Array.prototype.getRow = function (ind) {
//   let row = []
//   this.forEach((v) => {
//     row.push(v[ind])
//   })
//   return row
// }

// Array.prototype.show2d = function () {
//   let output = ''
//   this.forEach((i) => {
//     output = output.concat(i.join(' ') + '\n')
//   })
//   return output
// }

// let i = 3
// let j = 1
// let _j = j

// function check(map, index) {
//   console.log('index :>> ', index)
//   let [i, j] = index
//   let h = map.length
//   let w = map[0].length
//   if (map[i][j] != 0) return
//   map[i][j] = 2
//   if (i != 0 && map[i - 1][j] == 0) {
//     check(map, [i - 1, j])
//   }
//   if (i != h - 1 && map[i + 1][j] == 0) {
//     check(map, [i + 1, j])
//   }
//   if (j != 0 && map[i][j - 1] == 0) {
//     check(map, [i, j - 1])
//   }
//   if (j != w - 1 && map[i][j + 1] == 0) {
//     check(map, [i, j + 1])
//   }
// }
// check(maps, [3, 0])

// console.log(maps.show2d())
