const containerDiv = document.querySelector('.container');

class Book{
    #author;
    #title;
    #number_of_pages;
    #readingStatus;
    constructor(author, title, number_of_pages, readingStatus){
        this.#author = author;
        this.#title = title;
        this.#number_of_pages = number_of_pages;
        this.#readingStatus = readingStatus;
    }
    toggleReadStatus(){
        this.#readingStatus = !this.#readingStatus;
    }
    getAuthor(){
        return this.#author;
    }
    getTitle(){
        return this.#title;
    }
    getNumberOfPages(){
        return this.#number_of_pages;
    }
    getReadingStatus(){
        return this.#readingStatus;
    }
}



class Library{
    #books = [];
    #numberOfBook = 0;

    constructor(){

    }
    #incrementNumberOfBooks(){
        this.#numberOfBook++;
    }
    #decrementNumberOfBooks(){
        this.#numberOfBook--;
    }

    addBook(author, title, number_of_pages, readingStatus){
        this.#incrementNumberOfBooks();
        this.#books.push(new Book(author, title, number_of_pages, readingStatus));
    }

    removeBook(book){
        this.#books = this.#books.filter(bookToCheck=>{
            this.#decrementNumberOfBooks();
            return book.getTitle() != bookToCheck.getTitle();
        });
    }

    getBooks(){
        return this.#books;
    }

    getNumberOfBook(){
        return this.#numberOfBook;
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
    #book;

    constructor(doc, book){
        this.#card = doc.createElement('div');
        this.#bookTitleH2 = doc.createElement('h2');
        this.#removeBookBtn = doc.createElement('button');
        this.#authorP = doc.createElement('p');
        this.#ul = doc.createElement('ul');
        this.#number_of_pagesLi = doc.createElement('li');
        this.#readBtnLi = doc.createElement('li');
        this.#readToggleBtn = doc.createElement('button');
        this.#book = book;
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
        return readingStatus? "Read": "Unread";
    }

    #populateCard(){
        this.#card.classList.add('card');
        this.#bookTitleH2.textContent = this.#book.getTitle();
        this.#authorP.textContent = this.#book.getAuthor();
        this.#number_of_pagesLi.textContent = this.#book.getNumberOfPages();
        this.#readToggleBtn.textContent = this.#readingStatusToText(this.#book.getReadingStatus());

    }

    #addElementEventListeners(){
        this.#removeBookBtn.addEventListener('click', ()=>{
            myLibrary.removeBook(this.#book);
            DisplayController.renderBookCards();
        });
        this.#readToggleBtn.addEventListener('click', ()=>{
            this.#book.toggleReadStatus();
            // console.log(this.#book.getReadingStatus())
            this.#readToggleBtn.textContent = this.#readingStatusToText(this.#book.getReadingStatus());
        });
    
    }

    createBookCard(){
        this.#createCard();
        this.#populateCard();
        this.#addElementEventListeners();
        return this.#card;
    }

}

function hideCards(){
    containerDiv.classList.add('translucent-container');
}

function showCards(){
    containerDiv.classList.remove('translucent-container');
}
let myLibrary = new Library()


const FormHandler = (function(doc){
    const _addBookToLibraryForm = doc.getElementById('add-book-form'); 
    const _addBookBtn = doc.getElementById('add-book');
    const _closeFormBtn = doc.querySelector('.btn.cancel');
    
    function addBtnEventHandler(){
        _addBookBtn.addEventListener('click', ()=>{
            _addBookToLibraryForm.classList.remove('hide-form');
            hideCards();
        });
    }

    function closeFormBtnEventHandler(){
        _closeFormBtn.addEventListener('click', ()=>{
            _addBookToLibraryForm.classList.add('hide-form');
            hideCards();
        });
    }

    function addBookToLibraryFormEventHandler(){
        _addBookToLibraryForm.addEventListener('submit', (event)=>{
            event.preventDefault();
            let readingStatus = (_addBookToLibraryForm.elements['readingStatus'].value == "yes")?1:0;
            myLibrary.addBook(_addBookToLibraryForm.elements['author'].value,
                    _addBookToLibraryForm.elements['title'].value,
                    _addBookToLibraryForm.elements['number_of_pages'].value, readingStatus);

            _addBookToLibraryForm.reset();
            _addBookToLibraryForm.classList.add('hide-form')
            showCards();
            DisplayController.renderBookCards();
        });
    }


    return {addBtnEventHandler, closeFormBtnEventHandler, addBookToLibraryFormEventHandler};
})(document);

const DisplayController = (function(doc){
    function _deleteAllChildren(node){
        while(node.hasChildNodes()){
            node.removeChild(node.lastChild);
        }
    }

    function renderBookCards(){
        _deleteAllChildren(containerDiv);
        myLibrary.getBooks().forEach(book=>{
            const bookCard = new Card(document, book)
            containerDiv.appendChild(bookCard.createBookCard())
        });
    }

    function initializeDisplay(){
        FormHandler.addBtnEventHandler();
        FormHandler.closeFormBtnEventHandler();
        FormHandler.addBookToLibraryFormEventHandler();
        renderBookCards();
        
    }



    return {initializeDisplay, renderBookCards};

})(document);


DisplayController.initializeDisplay();