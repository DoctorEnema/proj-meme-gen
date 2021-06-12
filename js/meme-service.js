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
    { id: 106, url: 'meme-imgs/5.jpg', keywords: ['Amogos', 'Happy', 'Sad', 'Advanced'] },
    { id: 107, url: 'meme-imgs/6.jpg', keywords: ['Amogos', 'Happy', 'Sad', 'Advanced'] },
    { id: 108, url: 'meme-imgs/7.jpg', keywords: ['Amogos', 'Happy', 'Sad', 'Advanced'] },
    { id: 109, url: 'meme-imgs/8.jpg', keywords: ['Amogos', 'Happy', 'Sad', 'Advanced'] },
    { id: 110, url: 'meme-imgs/9.jpg', keywords: ['Amogos', 'Happy', 'Sad', 'Advanced'] },
    { id: 111, url: 'meme-imgs/10.jpg', keywords: ['Amogos', 'Happy', 'Sad', 'Advanced'] },
    { id: 112, url: 'meme-imgs/11.jpg', keywords: ['Amogos', 'Happy', 'Sad', 'Advanced'] },
    { id: 113, url: 'meme-imgs/12.jpg', keywords: ['Amogos', 'Happy', 'Sad', 'Advanced'] },
    { id: 114, url: 'meme-imgs/13.jpg', keywords: ['Amogos', 'Happy', 'Sad', 'Advanced'] },
    { id: 115, url: 'meme-imgs/14.jpg', keywords: ['Amogos', 'Happy', 'Sad', 'Advanced'] },
    { id: 116, url: 'meme-imgs/15.jpg', keywords: ['Amogos', 'Happy', 'Sad', 'Advanced'] },
    { id: 117, url: 'meme-imgs/16.jpg', keywords: ['Amogos', 'Happy', 'Sad', 'Advanced'] },
    { id: 118, url: 'meme-imgs/17.jpg', keywords: ['Amogos', 'Happy', 'Sad', 'Advanced'] },
    { id: 119, url: 'meme-imgs/18.jpg', keywords: ['Amogos', 'Happy', 'Sad', 'Advanced'] },
    { id: 120, url: 'meme-imgs/19.jpg', keywords: ['Amogos', 'Happy', 'Sad', 'Advanced'] },
]
