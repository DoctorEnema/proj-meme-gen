'use strict'

var gTags = { 'European': 1, 'Happy': 1, 'Sad': 3, 'Dog': 5, 'Trump': 3, 'Women': 3, 'Advanced': 5, 'Politcal': 1, 'Love': 3, 'Amogos': 4, 'China': 2 }
var gMeme
var gCurrImg
var gMyMemes

var gImgs = [
    { id: 101, url: 'meme-imgs/1.jpg', keywords: ['Dog', 'Baby', 'Love'] },
    { id: 102, url: 'meme-imgs/2.jpg', keywords: ['European', 'Women'] },
    { id: 103, url: 'meme-imgs/3.jpg', keywords: ['Trump', 'Political', 'China'] },
    { id: 104, url: 'meme-imgs/4.jpg', keywords: ['Dog', 'Love'] },
    { id: 105, url: 'img/hank.png', keywords: ['Amogos', 'Happy', 'Sad', 'Advanced'] },
]

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
        // Object.values(gTags)
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

