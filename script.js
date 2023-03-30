var sizeEleX = document.getElementById('sizex')
var sizeEleY = document.getElementById('sizey')
var bombEle = document.getElementById('bombs')
var startButton = document.getElementById('start')
var restCnt = document.getElementById('restCnt')
var mapDiv = document.getElementById('map-container')
var hintSpan = document.getElementById('hint')

var testMap = undefined
var onTouch = 0
var timeout = 0
const defHint = hintSpan.innerHTML

function start() {
  let div = document.getElementById('restCnt-div')
  div.style.display = ''
  let size = [Number(sizeEleX.value), Number(sizeEleY.value)]
  let bombs = Number(bombEle.value)
  testMap = new Maps(size, bombs)
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
      newGrid.addEventListener('contextmenu', clickGrid)
      newGrid.addEventListener('touchstart', touchstart)
      newGrid.addEventListener('touchend', touchEnd)
      newCol.appendChild(newGrid)
    })
  })
}

function clickGrid(e) {
  e.preventDefault()
  let list = e.target.id.split('-').map((i) => Number(i))
  if (e.button == 0) {
    next([list[1], list[2]])
  } else if (e.button == 2) {
    mark([list[1], list[2]])
  }
}

function updateTableGrid() {
  testMap.content.forEach((col, xind) => {
    col.forEach((item, yind) => {
      let id = `${item.num}-${xind}-${yind}`
      let e = document.getElementById(id)
      let classes = e.classList.value.split(' ')
      e.classList.remove(...classes)
      e.classList.add('default-grid')
      if (item.show !== '') {
        if (item.show == '\u2691') {
          e.classList.add('marked')
        } else if (item.show == '-') {
          e.classList.add('bomb')
        } else {
          e.classList.add('open')
        }
      }
      e.innerText = item.show
    })
  })
}

function next(index) {
  if (index) {
    ;[x, y] = index
  } else {
    let x = Number(xindex.value)
    let y = Number(yindex.value)
  }

  if (testMap.bombIndex.length == 0) {
    testMap.init([x, y])
  }
  testMap.choose([x, y])
  if (testMap.gameover == -1) {
    document.getElementById('hint').innerText = 'BOOM! Game over.'
    rmEvent()
  } else if (testMap.gameover == 1) {
    document.getElementById('hint').innerText = 'CONGRATULATIONS! You win.'
    rmEvent()
  }
  updateTableGrid()
  restCnt.innerText = testMap.restCnt()
}

function mark(index) {
  let [x, y] = index
  let grid = testMap.content[x][y]
  if (grid.marked == 1) {
    grid.removeMark()
  } else {
    grid.mark()
  }
  updateTableGrid()
  restCnt.innerText = testMap.restCnt()
  testMap.ifWin()
  if (testMap.gameover == 1) {
    document.getElementById('hint').innerText = 'you win'
    testMap.showAll()
    rmEvent()
  }
}

function rmMark() {
  let x = Number(xindex.value)
  let y = Number(yindex.value)
  testMap.content[x][y].removeMark()
  updateTableGrid()
  restCnt.innerText = testMap.restCnt()
}

function rmEvent() {
  testMap.content.forEach((col, xind) => {
    col.forEach((item, yind) => {
      let id = `${item.num}-${xind}-${yind}`
      let e = document.getElementById(id)
      e.removeEventListener('click', clickGrid)
      e.removeEventListener('contextmenu', clickGrid)
      e.removeEventListener('touchstart', touchstart)
      e.removeEventListener('touchend', touchEnd)
    })
  })
}

function touchstart(e) {
  e.preventDefault()
  onTouch = 1
  timeout = setTimeout(() => {
    onTouch = 0
    if (onTouch == 0) {
      let list = e.target.id.split('-').map((i) => Number(i))
      mark([list[1], list[2]])
    }
  }, 300)
}

function touchEnd(e) {
  clearTimeout(timeout)
  if (onTouch !== 0) {
    e.button = 0
    clickGrid(e)
  }
  onTouch = 0
}
startButton.addEventListener('click', start)
