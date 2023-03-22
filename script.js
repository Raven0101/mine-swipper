let sizeEle = document.getElementById('size')
let bombEle = document.getElementById('bombs')
let containerEle = document.getElementById('container')
let startButton = document.getElementById('start')
let xindex = document.getElementById('x')
let yindex = document.getElementById('y')
let continueButton = document.getElementById('continue')

var testMap = undefined

function start() {
  let size = Number(sizeEle.value)
  let bombs = Number(bombEle.value)
  testMap = new Maps([size, size], bombs)
  document.getElementById('hint').innerText =
    'input point you want to check, range 0~size-1'
  containerEle.innerText = testMap.print()
}

function next() {
  console.log(testMap.print())
  let x = Number(xindex.value)
  let y = Number(yindex.value)
  testMap.choose([x, y])
  if (testMap.gameover == -1) {
    document.getElementById('hint').innerText = 'game over'
  } else if (testMap.gameover == 1) {
    document.getElementById('hint').innerText = 'you win'
  }
  containerEle.innerText = testMap.print()
}
startButton.addEventListener('click', start)
continueButton.addEventListener('click', next)
