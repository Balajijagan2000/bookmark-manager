
let bookMarks = []
let counter = 1
const bookmarkForm = document.querySelector('.bookmark-form')
const siteName = document.querySelector('.sitename')
const siteUrl = document.querySelector('.siteurl')
const bookmarkContainer = document.querySelector('.bookmarks')

function init() {
    if(localStorage.getItem('bookmarks') === null) {
        localStorage.setItem('bookmarks',JSON.stringify([]))
        counter = 1
    } else {
        
        bookMarks = JSON.parse(localStorage.getItem('bookmarks'))
        counter = bookMarks.length > 0 ?bookMarks[bookMarks.length-1].id + 1 : 1 

        bookMarks.forEach((bookmark) => createBookmark(bookmark))
    }
}
const deleteBookMark = (e,bookmarkObj) => {
 
    bookmarkContainer.removeChild(e.target.parentNode.parentNode)

    const newbookMarks = bookMarks.filter((bookMark) => {
        return bookMark.id !== bookmarkObj.id
    })
    bookMarks = [...newbookMarks]
    localStorage.setItem('bookmarks',JSON.stringify(bookMarks))
}
function createBookmark(bookmarkObject) {
    const outerDiv = document.createElement('div')
    const innerDiv_1 = document.createElement('div')
    const innerDiv_2 = document.createElement('div')

    outerDiv.classList.add('bookmark')
    outerDiv.setAttribute('id',bookmarkObject.id)
    const h2 = document.createElement('h2')
    const a = document.createElement('a')
    const button = document.createElement('button')
    button.addEventListener('click',(e) => deleteBookMark(e,bookmarkObject))
    
    h2.innerText = bookmarkObject.name
    a.setAttribute('href',bookmarkObject.url)
    a.setAttribute('target','_blank')
    a.innerText = 'Visit'
    button.innerText = 'Delete'

    innerDiv_1.appendChild(h2)
    innerDiv_2.appendChild(a)
    innerDiv_2.appendChild(button)

    outerDiv.appendChild(innerDiv_1)
    outerDiv.appendChild(innerDiv_2)

    bookmarkContainer.append(outerDiv)

    
    
}
bookmarkForm.addEventListener('submit',(e) => {

    e.preventDefault()

    if(siteName.value.trim() === '' || siteUrl.value.trim() === '') {
        alert("Field's should not be empty")
        siteName.value = ''
        siteUrl.value = ''
        return;
    }
    const newBookmark = {id:counter++,name:siteName.value,url:siteUrl.value}
    createBookmark(newBookmark)

    bookMarks = [...bookMarks,newBookmark]
    localStorage.setItem("bookmarks",JSON.stringify(bookMarks))

    siteName.value = ''
    siteUrl.value = ''




})

init()