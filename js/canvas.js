'use strict'

var gElCanvas
var gCtx
var gMouseDown


function init() {
    gElCanvas = getCanvas()
    gCtx = gElCanvas.getContext('2d')
    gMouseDown = false
    renderGallery()
    // drawImg()
    // resizeCanvas()
    // addTouchListeners()
    // addMouseListeners()
}

function getCanvas() {
    var canvas = document.querySelector('canvas')
    return canvas
}

function drawImg(chosenImg) {
    var img = new Image()
    img.src = chosenImg
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) 
    }
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-img.png'
}

function resizeCanvas(img) {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    // gElCanvas.height = elContainer.offsetHeight
    gElCanvas.height = (img.height * gElCanvas.width) / img.width
}

function chooseImage(img){
    var generator = document.querySelector('.generator')
    displayPage(generator)
    drawImg(img.src)
    resizeCanvas(img)
    gCurrImg = img
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

function rememberText(){
    return document.querySelector('input[name=MEME-TEXT]').value
}
var gCurrImg


function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = '50px Impact'
    gCtx.textAlign = 'center'
    clearCanvas()
    gCtx.drawImage(gCurrImg, 0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.fillText(rememberText(), 40, 380)
    gCtx.strokeText(rememberText(), 40, 380)
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    // You may clear part of the canvas
    // gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height/4)
}



// function testing() {
//     var theTest = document.querySelector('.testing')
//     var text = document.querySelector('input[name=wow]')
//     theTest.innerText = text.value
// }

// function testing2() {
//     document.querySelector('input[name=wow]').placeholder = "wawawiwa"
// }