'use strict'

function displayPage(clicked) {

    document.querySelectorAll('.navies').forEach((el) => el.classList.remove('active'))
    document.querySelectorAll('.navies').forEach((el) => el.style.backgroundPosition = 'center 5rem')
    clicked.classList.add('active')
    clicked.style.backgroundPosition = 'center 2.3rem'
    var galleryLink = document.querySelector('.gallery-link')
    var generatorLink = document.querySelector('.generator')
    var gallery = document.querySelector('.main-gallery')
    var generator = document.querySelector('.main-generator')
    if (clicked === galleryLink) {
        gallery.classList.remove('hide')
        generator.classList.add('hide')
    } else if (clicked === generatorLink) {
        generator.classList.remove('hide')
        gallery.classList.add('hide')
    }
}


function renderGallery() {
    var strHTML = ''
    gImgs.forEach(img => strHTML += `<img src="${img.url}" id=img-${img.id} onclick="chooseImage(this)">`)
    document.querySelector('.gallery').innerHTML = strHTML
}

