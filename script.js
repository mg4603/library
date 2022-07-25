const containerDiv = document.querySelector('.container');

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
    #reload = 0;

    constructor(){

    }

    addBook(author, title, number_of_pages, readingStatus){
        this.#books.push(new Book(author, title, number_of_pages, readingStatus))
    }
    removeBook(book){
        this.#books = this.#books.filter(bookToCheck=>{
            return book.title != bookToCheck.title;
        })
        //cards have to be re-rendered
    }
    reloadLibrary(){
        return this.#reload;
    }
    shouldReloadLibrary(){
        this.#reload = 1;
    }
    doneReloadingLibrary(){
        this.#reload = 0;
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
        return readingStatus == 1? "Read": "Unread";
    }

    #populateCard(book){
        this.#card.classList.add('card');
        this.#bookTitleH2.textContent = book.title;
        this.#authorP.textContent = book.author;
        this.#number_of_pagesLi.textContent = book.number_of_pages;
        this.#readToggleBtn.textContent = this.#readingStatusToText(book.readingStatus);
    }

    #addElementEventListeners(){
        this.#removeBookBtn.addEventListener('click', ()=>{
            this.#book.removeBook();
        });
        this.#readToggleBtn.addEventListener('click', ()=>{
            this.#book.toggleReadStatus();
            this.#readToggleBtn.textContent = this.#readingStatusToText(1);
        });
    
    }

    createBookCard(book){
        this.#createCard();
        this.#populateCard(book);
        this.#addElementEventListeners();
    }

}

function hideCards(){
    containerDiv.classList.add('translucent-container');
}

function showCards(){
    containerDiv.classList.remove('translucent-container');
}

const FormHandler = (function(doc){
    const _addBookToLibraryForm = doc.getElementById('add-book-form'); 
    const _addBookBtn = document.getElementById('add-book');
    const _closeFormBtn = document.querySelector('.btn.cancel');
    
    function addBtnEventHandler(){
        this._addBookBtn.addEventListener('click', ()=>{
            this._addBookToLibraryForm.classList.remove('hide-form');
            hideCards();
        });
    }

    function closeFormBtnEventHandler(){
        this._closeFormBtn.addEventListener('click', ()=>{
            this._addBookToLibraryForm.classList.add('hide-form');
            hideCards();
        });
    }

    function addBookToLibraryFormEventHandler(){
        this._addBookToLibraryForm.addEventListener('submit', (event)=>{
            event.preventDefault();
            let readingStatus = (this._addBookToLibraryForm.elements['readingStatus'].value == "yes")?1:0;
            const book = new Book(this._addBookToLibraryForm.elements['author'].value,
                            this._addBookToLibraryForm.elements['title'].value,
                             this._addBookToLibraryForm.elements['number_of_pages'].value, readingStatus);
            myLibrary.addBookToLibrary(book);
            this._addBookToLibraryForm.reset();
            this._addBookToLibraryForm.classList.add('hide-form')
            showCards();
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
        this._deleteAllChildren(this._containerDiv);
        myLibrary.forEach(book=>{this._containerDiv.appendChild(displayBook(book))})
    }

    function initializeDisplay(){
        FormHandler.addBtnEventHandler();
        FormHandler.closeFormBtnEventHandler();
        FormHandler.addBookToLibraryFormEventHandler();
        this.renderBookCards();
    }
    

    return {renderBookCards, initializeDisplay};

})(document);


DisplayController.initializeDisplay();