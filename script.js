var sizeEle = document.getElementById('size')
var bombEle = document.getElementById('bombs')
var containerEle = document.getElementById('container')
var startButton = document.getElementById('start')
var xindex = document.getElementById('x')
var yindex = document.getElementById('y')
var continueButton = document.getElementById('continue')
var markButton = document.getElementById('mark')
var rmMarkButton = document.getElementById('rmmark')
var restCnt = document.getElementById('restCnt')
var mapDiv = document.getElementById('map-container')

var testMap = undefined
const defHint =
  '<span style="color: red">click to open grid</span> <br />input point, range 0~size-1<br />press "continue" to open point, <br />press "this is bomb" to mark a bomb,<br />press "this is not bomb" to remove the mark.'

function start() {
  let size = Number(sizeEle.value)
  let bombs = Number(bombEle.value)
  testMap = new Maps([size, size], bombs)
  document.getElementById('hint').innerHTML = defHint
  // containerEle.innerText = testMap.print()
  createTableMap()
  restCnt.innerText = testMap.restCnt()
}

function createTableMap() {
  if (mapDiv.childNodes.length != 0) {
    let t = document.getElementById('map-table')
    t.remove()
  }
  let mapContainer = document.createElement('table')
  mapContainer.id = 'map-table'
  mapDiv.appendChild(mapContainer)
  testMap.content.forEach((col, xind) => {
    let newCol = document.createElement('tr')
    mapContainer.appendChild(newCol)
    col.forEach((item, yind) => {
      let newGrid = document.createElement('td')
      newGrid.id = `${item.num}-${xind}-${yind}`
      newGrid.className = 'default-grid'
      newGrid.innerText = item.show
      newGrid.addEventListener('click', clickGrid)
      newCol.appendChild(newGrid)
    })
  })
}

function clickGrid(e) {
  console.log('click e :>> ', e)
  let list = e.target.id.split('-').map((i) => Number(i))
  next([list[1], list[2]])
}

function updateTableGrid() {
  testMap.content.forEach((col, xind) => {
    col.forEach((item, yind) => {
      let id = `${item.num}-${xind}-${yind}`
      let e = document.getElementById(id)
      e.innerText = item.show
    })
  })
}

function next(index) {
  console.log(testMap.print())
  if (index) {
    ;[x, y] = index
  } else {
    let x = Number(xindex.value)
    let y = Number(yindex.value)
  }

  if (testMap.bombIndex.length == 0) {
    console.log('init')
    testMap.init([x, y])
  }
  testMap.choose([x, y])
  // testMap.ifWin()
  if (testMap.gameover == -1) {
    document.getElementById('hint').innerText = 'game over'
  } else if (testMap.gameover == 1) {
    document.getElementById('hint').innerText = 'you win'
  }
  // containerEle.innerText = testMap.print()
  updateTableGrid()
  restCnt.innerText = testMap.restCnt()
}

function mark() {
  let x = Number(xindex.value)
  let y = Number(yindex.value)
  testMap.content[x][y].mark()
  // containerEle.innerText = testMap.print()
  updateTableGrid()
  restCnt.innerText = testMap.restCnt()
  testMap.ifWin()
  if (testMap.gameover == 1) {
    document.getElementById('hint').innerText = 'you win'
    testMap.showAll()
  }
}

function rmMark() {
  let x = Number(xindex.value)
  let y = Number(yindex.value)
  testMap.content[x][y].removeMark()
  // containerEle.innerText = testMap.print()
  updateTableGrid()
  restCnt.innerText = testMap.restCnt()
}

startButton.addEventListener('click', start)
continueButton.addEventListener('click', next)
markButton.addEventListener('click', mark)
rmMarkButton.addEventListener('click', rmMark)
