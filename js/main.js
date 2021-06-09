'use strict'


// function testing() {
//     var theTest = document.querySelector('.testing')
//     var text = document.querySelector('input[name=wow]')
//     theTest.innerText = text.value
// }

// function testing2() {
//     document.querySelector('input[name=wow]').placeholder = "wawawiwa"
// }

function displayPage(clicked) {

    document.querySelectorAll('.navies').forEach((el) => el.classList.remove('active'))
    clicked.classList.add('active')
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
    gImgs.forEach(img => strHTML += `<img src="${img.url}" onclick="chooseImage(this)">`)
    document.querySelector('.gallery').innerHTML = strHTML
}


    // function _createTodos() {
    //     var todos = loadFromStorage(STORAGE_KEY)
    //     if (!todos || !todos.length) {
    //         todos = [_createTodo('Learn CSS'), _createTodo('Learn HTML'), _createTodo('Learn JS')]
    //         saveToStorage(STORAGE_KEY, todos)
    //     }
    //     return todos;
    // }

    // function _createTodo(txt) {
    //     var todo = {
    //         id: _makeId(),
    //         txt: txt,
    //         time: _createdAtTimeStamp(),
    //         priority: parseInt(_makePriority()),
    //         isDone: false,
    //     }
    //     return todo;
    // }
