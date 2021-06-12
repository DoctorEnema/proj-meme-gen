'use strict'

var gMemesToDisplay
var gFoundTags

function init() {
    gElCanvas = getCanvas()
    gCtx = gElCanvas.getContext('2d')
    gMemesToDisplay = gImgs
    getImagesToDisplay()
    gMemeReady = false
    if (!gMyMemes || !gMyMemes.length) gMyMemes = []
    else gMyMemes = loadFromStorage('myMemes')
    displaySaved()
    displayTags()
}

function displayPage(clicked) {

    document.querySelectorAll('.navies').forEach((el) => el.classList.remove('active'))
    document.querySelectorAll('.navies').forEach((el) => el.style.backgroundPosition = 'center 5rem')
    clicked.classList.add('active')
    if (document.body.clientWidth > 820) {
        clicked.style.backgroundPosition = 'center 2.3rem'
    }else clicked.style.backgroundPosition = 'center 0.6rem'
    var galleryLink = document.querySelector('.gallery-link')
    var generatorLink = document.querySelector('.generator')
    var myMemesLink = document.querySelector('.my-memes-link')
    var gallery = document.querySelector('.main-gallery')
    var generator = document.querySelector('.main-generator')
    var myMemes = document.querySelector('.my-memes')
    if (clicked === galleryLink) {
        gallery.classList.remove('hide')
        generator.classList.add('hide')
        myMemes.classList.add('hide')
    } else if (clicked === generatorLink) {
        generator.classList.remove('hide')
        gallery.classList.add('hide')
        myMemes.classList.add('hide')
    } else if (clicked === myMemesLink) {
        myMemes.classList.remove('hide')
        generator.classList.add('hide')
        gallery.classList.add('hide')
    }
}

function searchForTag(tag) {
    var search = document.querySelector('input[name=SEARCH]')
    search.value = tag.innerText
    searchTags(search)
    gTags[search.value]++
    displayTags()
}

function clearSearch() {
    var search = document.querySelector('input[name=SEARCH]')
    search.value = ''
    searchTags(search)
}

function displayTags() {
    var strHTML = ''
    var tagIdx = 0
    var elTags = document.querySelector('.search-tags')
    var tagsValues = Object.values(gTags)
    for (var tag in gTags) {
        strHTML += `<div onclick="searchForTag(this)" class="tag tag${tagIdx}">${tag}</div>`
        tagIdx++
    }
    elTags.innerHTML = strHTML
    for (var i = 0; i < tagsValues.length; i++) {
        document.querySelector(`.tag${i}`).style.fontSize = `${tagsValues[i] * 0.5}rem`
    }
}

function searchTags(elSearch) {
    gFoundTags = []
    var search = elSearch.value.toLowerCase()
    gMemesToDisplay = []
    for (var tag in gTags) {
        if (tag.toLowerCase().includes(search)) gFoundTags.push(tag);
    }
    for (var i = 0; i < gFoundTags.length; i++) {
        for (var j = 0; j < gImgs.length; j++) {
            if (gImgs[j].keywords.includes(gFoundTags[i])) {
                gMemesToDisplay.push(gImgs[j])
            }
        }
    }
    if (gMemesToDisplay.length > gImgs.length) gMemesToDisplay = gImgs
    getImagesToDisplay()
}

function getImagesToDisplay() {
    var strHTML = ''
    gMemesToDisplay.forEach(img => strHTML += `<img src="${img.url}" id=img-${img.id} onclick="chooseImage(this)">`)
    document.querySelector('.gallery').innerHTML = strHTML
}

function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}