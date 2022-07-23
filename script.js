const containerDiv = document.querySelector('.container');


let myLibrary = [];

function Book(author, title, number_of_pages, readingStatus){
    this.author = author;
    this.title = title;
    this.number_of_pages = number_of_pages;
    this.readingStatus = readingStatus;
}

Book.prototype.toggleReadStatus = function(){
    this.readingStatus = !this.readingStatus;
}

Book.prototype.removeBook = function(){
    
    myLibrary = myLibrary.filter(bookToCheck=>{
        return this.title != bookToCheck.title; 
    })
    renderBookCards();
}

function displayBook(book){
    const card = document.createElement('div');
    const h2 = document.createElement('h2');
    const p = document.createElement('p');
    const ul = document.createElement('ul');
    const number_of_pages = document.createElement('li');
    const readLi = document.createElement('li');
    const readToggle = document.createElement('button');
    const removeBook = document.createElement('button');

    removeBook.classList.add('remove-book');
    removeBook.textContent = "x";

    card.classList.add('card');
    h2.textContent = book.title;
    p.textContent = book.author;
    number_of_pages.textContent = book.number_of_pages;
    readToggle.textContent = book.readingStatus == 1?"Read":"Unread";   
    
    removeBook.addEventListener('click', ()=>{
        book.removeBook();
    });
    
    readToggle.addEventListener('click', ()=>{
        book.toggleReadStatus();
        readToggle.textContent = book.readingStatus == 1?"Read":"Unread";   
    });


    readLi.appendChild(readToggle);
    ul.appendChild(number_of_pages);
    ul.appendChild(readLi);

    card.appendChild(h2);
    card.appendChild(removeBook);
    card.appendChild(p);
    card.appendChild(ul);

    return card;
}

function renderBookCards(){
    deleteAllChildren(containerDiv);
    myLibrary.forEach(book=>{containerDiv.appendChild(displayBook(book))})
}

function addBookToLibrary(book){
    myLibrary.push(book);
}

function deleteAllChildren(node){
    while(node.hasChildNodes()){
        node.removeChild(node.lastChild);
    }
}

const addBookBtn = document.getElementById('add-book');
addBookBtn.addEventListener('click', ()=>{
    document.getElementById("add-book-form").classList.remove('hide-form');
});

const addBookToLibraryForm = document.getElementById('add-book-form'); 
const closeFormBtn = document.querySelector('.btn.cancel');
closeFormBtn.addEventListener('click', ()=>{
    addBookToLibraryForm.classList.add('hide-form');
})

const addBookToLibraryBtn = document.querySelector('#add-book-form .btn');

addBookToLibraryForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    let readingStatus = (addBookToLibraryForm.elements['readingStatus'].value == "yes")?1:0;
    const book = new Book(addBookToLibraryForm.elements['author'].value,
                     addBookToLibraryForm.elements['title'].value,
                     addBookToLibraryForm.elements['number_of_pages'].value, readingStatus);
    addBookToLibrary(book);
    addBookToLibraryForm.reset();
    addBookToLibraryForm.classList.add('hide-form')
    
    renderBookCards();
})

renderBookCards();