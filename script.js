let sizeEle = document.getElementById('size')
let bombEle = document.getElementById('bombs')
let containerEle = document.getElementById('container')
let startButton = document.getElementById('start')
let xindex = document.getElementById('x')
let yindex = document.getElementById('y')
let continueButton = document.getElementById('continue')
let markButton = document.getElementById('mark')
let rmMarkButton = document.getElementById('rmmark')
let restCnt = document.getElementById('restCnt')

var testMap = undefined
const defHint =
  'input point, range 0~size-1<br />press "continue" to open point, <br />press "this is bomb" to mark a bomb,<br />press "this is not bomb" to remove the mark.'

function start() {
  let size = Number(sizeEle.value)
  let bombs = Number(bombEle.value)
  testMap = new Maps([size, size], bombs)
  document.getElementById('hint').innerHTML = defHint
  containerEle.innerText = testMap.print()
  restCnt.innerText = testMap.restCnt()
}

function next() {
  console.log(testMap.print())
  let x = Number(xindex.value)
  let y = Number(yindex.value)
  testMap.choose([x, y])
  // testMap.ifWin()
  if (testMap.gameover == -1) {
    document.getElementById('hint').innerText = 'game over'
  } else if (testMap.gameover == 1) {
    document.getElementById('hint').innerText = 'you win'
  }
  containerEle.innerText = testMap.print()
  restCnt.innerText = testMap.restCnt()
}

function mark() {
  let x = Number(xindex.value)
  let y = Number(yindex.value)
  testMap.content[x][y].mark()
  containerEle.innerText = testMap.print()
  restCnt.innerText = testMap.restCnt()
}

function rmMark() {
  let x = Number(xindex.value)
  let y = Number(yindex.value)
  testMap.content[x][y].removeMark()
  containerEle.innerText = testMap.print()
  restCnt.innerText = testMap.restCnt()
}

startButton.addEventListener('click', start)
continueButton.addEventListener('click', next)
markButton.addEventListener('click', mark)
rmMarkButton.addEventListener('click', rmMark)
