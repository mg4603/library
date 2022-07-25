const containerDiv = document.querySelector('.container');
const addBookToLibraryForm = document.getElementById('add-book-form'); 

class Book{
    #author;
    #title;
    #number_of_pages;
    #readingStatus;
    constructor(author, title, number_of_pages, readingStatus){
        super();
        this.#author = author;
        this.#title = title;
        this.#number_of_pages = number_of_pages;
        this.#readingStatus = readingStatus;
    }
    toggleReadStatus(){
        this.#readingStatus = !this.#readingStatus;
    }
    
}



const myLibrary = class{
    #books = [];
    constructor(){

    }
    addBook(book){
        this.#books.push(book)
    }
    removeBook(book){
        this.#books = this.#books.filter(bookToCheck=>{
            return book.title != bookToCheck.title;
        })
        //cards have to be re-rendered
    }
}

class Card{
    #card;
    #bookTitleH2;
    #removeBookBtn;
    #authorP;
    #ul;
    #number_of_pagesLi;
    #readBtnLi;
    #readToggleBtn;

    constructor(doc){
        this.#card = doc.createElement('div');
        this.#bookTitleH2 = doc.createElement('h2');
        this.#removeBookBtn = doc.createElement('button');
        this.#authorP = doc.createElement('p');
        this.#ul = doc.createElement('ul');
        this.#number_of_pagesLi = doc.createElement('li');
        this.#readBtnLi = doc.createElement('li');
        this.#readToggleBtn = doc.createElement('button');
    }

    //bare
    #createCard(){
        this.#removeBookBtn.classList.add('remove-book');

        this.#readBtnLi.appendChild(this.#readToggleBtn);
        
        this.#ul.appendChild(this.#number_of_pagesLi);
        this.#ul.appendChild(this.#readBtnLi);

        this.#card.appendChild(this.#bookTitleH2);
        this.#card.appendChild(this.#removeBookBtn);
        this.#card.appendChild(this.#authorP);
        this.#card.appendChild(this.#ul);
    }

    #readingStatusToText(readingStatus){
        return readingStatus == 1? "Read": "Unread";
    }

    #populateCard(book){
        this.#card.classList.add('card');
        this.#bookTitleH2.textContent = book.title;
        this.#authorP.textContent = book.author;
        this.#number_of_pagesLi.textContent = book.number_of_pages;
        this.#readToggleBtn.textContent = this.#readingStatusToText(book.readingStatus);
    }

    createBookCard(book){
        this.#createCard();
        this.#populateCard(book);
    }

}

const DisplayController = (function(doc){
    this.#removeBookBtn.addEventListener('click', ()=>{
        book.removeBook();
    });
    this.#readToggleBtn.addEventListener('click', ()=>{
        book.toggleReadStatus();
        this.#readToggleBtn.textContent = this.#readingStatusToText(1);
    });

    function _deleteAllChildrean(node){
        while(node.hasChildNodes()){
            node.removeChild(node.lastChild);
        }
    }


})(document);


function renderBookCards(){
    deleteAllChildren(containerDiv);
    myLibrary.forEach(book=>{containerDiv.appendChild(displayBook(book))})
}



const addBookBtn = document.getElementById('add-book');
addBookBtn.addEventListener('click', ()=>{
    addBookToLibraryForm.classList.remove('hide-form');
    containerDiv.classList.add('translucent-container')
});


const closeFormBtn = document.querySelector('.btn.cancel');
closeFormBtn.addEventListener('click', ()=>{
    addBookToLibraryForm.classList.add('hide-form');
    containerDiv.classList.remove('translucent-container')
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
    containerDiv.classList.remove('translucent-container')
    renderBookCards();
})

renderBookCards();