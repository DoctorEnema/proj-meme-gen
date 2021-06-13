'use strict'

var gMemeReady

function drawImg(imgUrl) {
    var img = new Image()
    img.src = imgUrl
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
    //I need this, but could I have put this somewhere else? it's sorta repeating drawText, but with some variations
}

function readyMeme() {
    gMemeReady = !gMemeReady
    drawText()
}

function drawRectRev(x, y) {
    if (gMemeReady) return
    var currLine = gMeme.lines[gMeme.selectedLineIdx]
    var textWidth = gCtx.measureText(currLine.txt)
    gCtx.beginPath()
    gCtx.rect(x, y, textWidth.width * -1 - 15, gElCanvas.height / 8)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
}
function drawRect(x, y) {
    if (gMemeReady) return
    var currLine = gMeme.lines[gMeme.selectedLineIdx]
    var textWidth = gCtx.measureText(currLine.txt)
    gCtx.beginPath()
    gCtx.rect(x, y, textWidth.width + 15, gElCanvas.height / 8)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
}

function drawLine(x, y) {
    if (gMemeReady) return
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

function changeTextPlacement(diff, isHorizontal) {
    var currLine = gMeme.lines[gMeme.selectedLineIdx]
    if (isHorizontal) currLine.posX += diff
    else currLine.posY += diff
    drawText()
}

function changeFontSize(diff) {
    var currLine = gMeme.lines[gMeme.selectedLineIdx]
    currLine.size += diff
    drawText()
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-img.png'
}

function saveMeme() {
    gMyMemes.unshift(gElCanvas.toDataURL())
    saveToStorage('myMemes', gMyMemes)
    displaySaved()
}

function displaySaved() {
    var strHTML = ''
    var img = new Image()
    var myMemes = loadFromStorage('myMemes')
    var savedMemes = document.querySelector('.saved-memes')
    myMemes.forEach((meme) => {
        img.src = meme
        strHTML += `<a href="${img.src}" download="${makeId()}"><img class="saved-meme" src="${img.src}"></a>`
    })
    savedMemes.innerHTML = strHTML
}