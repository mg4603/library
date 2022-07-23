const containerDiv = document.querySelector('.container');


let myLibrary = [{author: 'J.R.R. Tolkien',
                 title: 'The Hobbit',
                 number_of_pages: 295,
                 readingStatus: 1
                    }];

function Book(author, title, number_of_pages, readingStatus){
    this.author = author;
    this.title = title;
    this.number_of_pages = number_of_pages;
    this.readingStatus = readingStatus;
}

Book.prototype.toggleReadStatus = function(){
    this.readingStatus = !this.readingStatus;
}

function addBookToLibrary(book){
    myLibrary.push(book);
}


function displayBook(book){
    const card = document.createElement('div');
    const h2 = document.createElement('h2');
    const p = document.createElement('p');
    const ul = document.createElement('ul');
    const number_of_pages = document.createElement('li');
    const readLi = document.createElement('li');
    const readToggle = document.createElement('button');

    card.classList.add('card');
    h2.textContent = book.title;
    p.textContent = book.author;
    number_of_pages.textContent = book.number_of_pages;
    readToggle.textContent = book.readingStatus == 1?"Read":"Unread";   
    readToggle.addEventListener('click', ()=>{
        book.toggleReadStatus();
        readToggle.textContent = book.readingStatus == 1?"Read":"Unread";   
    });

    readLi.appendChild(readToggle);
    ul.appendChild(number_of_pages);
    ul.appendChild(readLi);

    card.appendChild(h2);
    card.appendChild(p);
    card.appendChild(ul);

    return card;
}

function renderBookCards(){
    myLibrary.forEach(book=>{containerDiv.appendChild(displayBook(book))})
}


const addBookBtn = document.getElementById('add-book');
addBookBtn.addEventListener('click', ()=>{
    document.getElementById("add-book-form").classList.remove('hide-form');
});

const closeFormBtn = document.querySelector('.btn.cancel');
closeFormBtn.addEventListener('click', ()=>{
    document.getElementById('add-book-form').classList.add('hide-form');
})
renderBookCards();