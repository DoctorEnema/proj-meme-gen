'use strict'

var gElCanvas
var gCtx
var gMouseDown

function init() {
    gElCanvas = getCanvas()
    gCtx = gElCanvas.getContext('2d')
    gMouseDown = false
    renderGallery()
    // addTouchListeners()
    // addMouseListeners()
}



function drawImg(chosenImg) {
    var img = new Image()
    img.src = chosenImg
    img.onload = () => {
        gCtx.drawImage(gCurrImg, 0, 0, gElCanvas.width, gElCanvas.height)
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
    gCtx.lineWidth = 2
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
    gCtx.lineWidth = 2
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




function addLine() {
    var strHTML = ''
    var lastIdx = gMeme.lines.length
    var textPosition = gMeme.lines.length === 1 ? 'Bottom Text' : 'Middle Text'
    strHTML += `<input class="meme-text" type="text" name="MEME-TEXT${lastIdx}" placeholder="${textPosition}" onkeyup="drawText()"></input>`
    document.querySelector('.meme-texts').innerHTML += strHTML
    gMeme.selectedLineIdx = lastIdx

    if (textPosition === 'Bottom Text') {
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
}






function changeFontSize(diff) {
    var currMeme = gMeme.lines[gMeme.selectedLineIdx]
    currMeme.size += diff
    drawText()
}
function changeTextAlign(alignment) {
    var currMeme = gMeme.lines[gMeme.selectedLineIdx]
    currMeme.align = alignment
    if (alignment === 'right') currMeme.posX = gElCanvas.width / 1.1
    else if (alignment === 'left') currMeme.posX = gElCanvas.width / 9
    else currMeme.posX = gElCanvas.width / 2
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
                posX: gElCanvas.width / 1.1,
                posY: gElCanvas.height / 2,
            }
        ]
    }
    var generator = document.querySelector('.generator')
    displayPage(generator)
    drawImg(img.src)
    resizeCanvas(img)
    gCurrImg = img
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

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', canvasClicked)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', () => gMouseDown = false)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', canvasClicked)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', () => gMouseDown = false)
}