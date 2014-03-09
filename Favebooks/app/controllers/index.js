var myBooks = Alloy.Collections.books;
myBooks.fetch();
var book = Alloy.createModel('books', {
	title : 'Great Expectations',
	author : 'Charles Dickens'
});
myBooks.add(book);
book.save();

function showBook(event) {
	var selectedBook = event.source;
	var args = {
		title : selectedBook.title,
		author : selectedBook.author
	};
	var bookview = Alloy.createController("bookdetails", args).getView();

    if (OS_IOS) {
        $.navGroupWin.openWindow(bookview);
    }
    if (OS_ANDROID) {
        bookview.open();
    }
}

function deleteBook(event) {
    var alertDialog = Titanium.UI.createAlertDialog({
        title: 'Remove',
        message: 'Do you want to remove this row?',
        buttonNames: ['Yes','No'],
        cancel: 1
    });
    alertDialog.show();
    
    alertDialog.addEventListener('click', function(e){
        // YES
        if(e.index == 0) {
            var selectedBook = event.source;
            myBooks.at(event.index).destroy();
        }
    });
} 

function addBook(){
    var myAddBook = Alloy.createController("addbook",{}).getView();
    if (OS_IOS) {
        $.navGroupWin.openWindow(myAddBook);
    }
    if (OS_ANDROID) {
        myAddBook.open();
    }
}

// Open main window
if(OS_IOS) { 
   $.navGroupWin.open(); 
} 
if (OS_ANDROID) { 
   $.index.open(); 
}