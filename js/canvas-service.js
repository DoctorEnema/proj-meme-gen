'use strict'

var gElCanvas
var gCtx
var gMouseDown

function init() {
    gElCanvas = getCanvas()
    gCtx = gElCanvas.getContext('2d')
    // gMouseDown = false
    renderGallery()
    // addTouchListeners()
    // addMouseListeners()
}



function drawImg(chosenImg) {
    var img = new Image()
    img.src = chosenImg
    img.onload = () => {
        gCtx.drawImage(gCurrImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText()
    }
}

function drawAllText() {
    gMeme.lines.forEach((line) => {
        gCtx.font = `${line.size}px Impact`
        gCtx.fillStyle = line.color
        gCtx.strokeStyle = line.strokeColor
        gCtx.textAlign = line.align
        gCtx.fillText(line.txt, line.posX, line.posY)
        gCtx.strokeText(line.txt, line.posX, line.posY)
    })
}

function drawText() {
    var currLine = gMeme.lines[gMeme.selectedLineIdx]
    currLine.txt = document.querySelector(`input[name=MEME-TEXT${gMeme.selectedLineIdx}]`).value
    gCtx.font = `${currLine.size}px Impact`
    gCtx.fillStyle = currLine.color
    gCtx.lineWidth = 1
    gCtx.strokeStyle = currLine.strokeColor
    gCtx.textAlign = currLine.align
    // clearCanvas()
    gCtx.drawImage(gCurrImg, 0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.fillText(currLine.txt, currLine.posX, currLine.posY)
    gCtx.strokeText(currLine.txt, currLine.posX, currLine.posY)
    if (currLine.align === 'right') {
        drawRectRev(currLine.posX + currLine.size / 8, currLine.posY - currLine.size)
    } else if (currLine.align === 'left') {
        drawRect(currLine.posX - currLine.size / 8, currLine.posY - currLine.size)
    } else drawLine(currLine.posX, currLine.posY + currLine.size / 4)
    drawAllText()
}

function removeLine(){
    if(gMeme.lines.length === 1) return
    var currLineIdx = gMeme.selectedLineIdx
    var lastLineIdx = gMeme.lines.length - 1
    gMeme.lines.splice(currLineIdx, 1)
    document.querySelector(`input[name=MEME-TEXT${gMeme.selectedLineIdx}]`).classList.add('hide')
    gMeme.selectedLineIdx--
    if(gMeme.selectedLineIdx < 0) gMeme.selectedLineIdx = lastLineIdx -1
    document.querySelector(`input[name=MEME-TEXT${gMeme.selectedLineIdx}]`).classList.remove('hide')
    drawText()
}

function drawRectRev(x, y) {
    var currLine = gMeme.lines[gMeme.selectedLineIdx]
    var testing = gCtx.measureText(currLine.txt)
    gCtx.beginPath()
    gCtx.rect(x, y, testing.width * -1 - 15, gElCanvas.height / 8)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
}
function drawRect(x, y) {
    var currLine = gMeme.lines[gMeme.selectedLineIdx]
    var testing = gCtx.measureText(currLine.txt)
    gCtx.beginPath()
    gCtx.rect(x, y, testing.width + 15, gElCanvas.height / 8)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
}

function drawLine(x, y) {
    var currLine = gMeme.lines[gMeme.selectedLineIdx]
    var diff = y - (currLine.size + 15)
    var textWidth = gCtx.measureText(currLine.txt).width
    gCtx.beginPath()
    gCtx.moveTo(x, y)
    gCtx.lineTo(x - textWidth / 1.9, y)
    gCtx.lineTo(x + textWidth / 1.9, y)
    gCtx.lineTo(x + textWidth / 1.9, diff)
    gCtx.lineTo(x - textWidth / 1.9, diff)
    gCtx.lineTo(x - textWidth / 1.9, y)
    gCtx.lineTo(x + textWidth / 1.9, y)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
}

function switchLines() {
    if (gMeme.selectedLineIdx >= gMeme.lines.length - 1) gMeme.selectedLineIdx = -1
    gMeme.selectedLineIdx++
    document.querySelectorAll('.meme-text').forEach((el) => el.classList.add('hide'))
    document.querySelector(`input[name=MEME-TEXT${gMeme.selectedLineIdx}]`).classList.remove('hide')
    drawText()
    //fix bug that doesn't display top and bottom text on first switch
}

function addLine() {
    var strHTML = ''
    var lastIdx = gMeme.lines.length
    var textPosition = gMeme.lines.length === 1 ? 'Bottom Text' : 'Middle Text'
    strHTML += `<input class="meme-text" type="text" name="MEME-TEXT${lastIdx}" placeholder="${textPosition}" onkeyup="drawText()"></input>`
    document.querySelector('.meme-texts').innerHTML += strHTML
    gMeme.selectedLineIdx = lastIdx

    if (textPosition === 'Bottom Text') {
        document.querySelector(`input[name=MEME-TEXT${lastIdx}]`).value = textPosition
        gMeme.lines.push({
            txt: document.querySelector(`input[name=MEME-TEXT${lastIdx}]`).value,
            size: 50,
            align: 'center',
            color: 'white',
            strokeColor: 'black',
            posX: gElCanvas.width / 2,
            posY: gElCanvas.height / 1.1,
        })
    }
    else {
        document.querySelector(`input[name=MEME-TEXT${lastIdx}]`).value = textPosition
        gMeme.lines.push({
            txt: document.querySelector(`input[name=MEME-TEXT${lastIdx}]`).value,
            size: 50,
            align: 'center',
            color: 'white',
            strokeColor: 'black',
            posX: gElCanvas.width / 2,
            posY: gElCanvas.height / 2,
        })
    }
    document.querySelectorAll('.meme-text').forEach((el) => el.classList.add('hide'))
    document.querySelector(`input[name=MEME-TEXT${lastIdx}]`).classList.remove('hide')
    changeTextAlign(gMeme.lines[lastIdx].align)
}


function changeTextPlacement(diff, isHorizontal) {
    var currLine = gMeme.lines[gMeme.selectedLineIdx]
    if (isHorizontal) currLine.posX += diff
    else currLine.posY += diff
    drawText()
}

function changeFontColor() {
    var currLine = gMeme.lines[gMeme.selectedLineIdx]
    var fontColor = document.querySelector('.text-font-color')
    var fontColorBtn = document.querySelector('.font-color')
    fontColorBtn.style.color = `${fontColor.value}`
    currLine.color = fontColor.value
    drawText()
}

function changeStrokeColor() {
    var currLine = gMeme.lines[gMeme.selectedLineIdx]
    var strokeColor = document.querySelector('.text-stroke-color')
    var strokeColorBtn = document.querySelector('.stroke-color')
    strokeColorBtn.style.color = `${strokeColor.value}`
    currLine.strokeColor = strokeColor.value
    drawText()
}

function changeFontSize(diff) {
    var currLine = gMeme.lines[gMeme.selectedLineIdx]
    currLine.size += diff
    drawText()
}
function changeTextAlign(alignment) {
    document.querySelectorAll('.align').forEach((el) => el.classList.remove('active'))
    var elAlign = document.querySelector(`.align-${alignment}`)
    var currLine = gMeme.lines[gMeme.selectedLineIdx]
    currLine.align = alignment
    if (alignment === 'right') {
        currLine.posX = gElCanvas.width / 1.1
        elAlign.classList.add('active')
    }
    else if
        (alignment === 'left') {
        currLine.posX = gElCanvas.width / 9
        elAlign.classList.add('active')
    } else {
        currLine.posX = gElCanvas.width / 2
        elAlign.classList.add('active')
    }
    drawText()
}

function getCanvas() {
    var canvas = document.querySelector('canvas')
    return canvas
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function chooseImage(img) {
    gMeme = {
        selectedImgId: img.id,
        selectedLineIdx: 0,
        lines: [
            {
                txt: '',
                size: 50,
                align: 'center',
                color: 'white',
                strokeColor: 'black',
            }
        ]
    }
    var generator = document.querySelector('.generator')
    displayPage(generator)
    resizeCanvas(img)
    gMeme.lines[0].posX = gElCanvas.width / 2,
    gMeme.lines[0].posY = gElCanvas.height / 6,
    drawImg(img.src)
    gCurrImg = img
    changeTextAlign(gMeme.lines[0].align)
    document.querySelectorAll('.meme-text').forEach((el) => el.classList.add('hide'))
    document.querySelector(`input[name=MEME-TEXT0]`).classList.remove('hide')
    document.querySelector(`input[name=MEME-TEXT0]`).value = 'TOP TEXT'
}

function resizeCanvas(img) {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = (img.height * gElCanvas.width) / img.width
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-img.png'
}





// function addMouseListeners() {
//     gElCanvas.addEventListener('mousedown', canvasClicked)
//     gElCanvas.addEventListener('mousemove', onMove)
//     gElCanvas.addEventListener('mouseup', () => gMouseDown = false)
// }

// function addTouchListeners() {
//     gElCanvas.addEventListener('touchstart', canvasClicked)
//     gElCanvas.addEventListener('touchmove', onMove)
//     gElCanvas.addEventListener('touchend', () => gMouseDown = false)
// }