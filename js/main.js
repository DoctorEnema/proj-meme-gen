'use strict'



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


function renderGallery() {
    var strHTML = ''
    gImgs.forEach(img => strHTML += `<img src="${img.url}" id=img-${img.id} onclick="chooseImage(this)">`)
    document.querySelector('.gallery').innerHTML = strHTML
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