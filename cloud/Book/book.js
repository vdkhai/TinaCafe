// Search Books
Parse.Cloud.define("searchBooks", function(request, response)
{
  var bookId = request.params.bookId;

  var Book = Parse.Object.extend("Book");
  var query = new Parse.Query(Book);  

  query.get(bookId, {
    success: function(book) {
      // The object was retrieved successfully.
      response.success(book.get("BookTitle"));
    },
    error: function(object, error) {
      // The object was not retrieved successfully.
      // error is a Parse.Error with an error code and message.
    }
  });
});

// Add a Book
Parse.Cloud.define("addBook", function(request, response)
{
  var bookTitle = "";

  if (typeof request.params.bookTitle != "undefined")
  {
    bookTitle = request.params.bookTitle;
  }

  var bookDescription = "";

  if (typeof request.params.bookDescription != "undefined")
  {
    bookDescription = request.params.bookDescription;
  }

  var countryCode = "";

  if (typeof request.params.countryCode != "undefined")
  {
    countryCode = request.params.countryCode;
  }

  var Book = Parse.Object.extend("Book");
  var book = new Book();

  book.save({
    BookTitle: bookTitle,
    BookDescription: bookDescription,
    CountryCode: countryCode
  }, {
    success: function(book) {
      // The object was saved successfully.
      response.success("The book was saved successfully, id = " + book.id);
    },
    error: function(book, error) {
      // The save failed.
      // error is a Parse.Error with an error code and message.
      response.error("The book was saved fail. Error: " + error);
    }
  });
});

// Update a Book
Parse.Cloud.define("updateBook", function(request, response)
{
  if (typeof request.params.id != "undefined")
  {
    var Book = Parse.Object.extend("Book");
    var book = new Book();

    book.id = request.params.id;

    if (typeof request.params.bookTitle != "undefined")
    {
      book.set("BookTitle", request.params.bookTitle)
    }

    if (typeof request.params.bookDescription != "undefined")
    {
      book.set("BookDescription", request.params.bookDescription);
    }

    if (typeof request.params.countryCode != "undefined")
    {
      book.set("CountryCode", request.params.countryCode);
    }

    book.save(null, {
      success: function(book) {
        // The object was saved successfully.
        response.success("The book was updated successfully");
      },
      error: function(book, error) {
        // The save failed.
        // error is a Parse.Error with an error code and message.
        if (error.code === Parse.Error.OBJECT_NOT_FOUND)
        {
          response.error("The book not found");
        }
      }
    });
  }
  else
  {
    response.error("Missing id param");
  }  
});

// Delete a Book
Parse.Cloud.define("deleteBook", function(request, response)
{
  if (typeof request.params.id != "undefined")
  {
    var Book = Parse.Object.extend("Book");
    var book = new Book();

    book.id = request.params.id;

    book.destroy({
      success: function(book) {
        // The object was deleted from the Parse Cloud.
        response.success("The book was deleted successfully");
      },
      error: function(book, error) {
        // The delete failed.
        // error is a Parse.Error with an error code and message.        
        response.error(error);        
      }
    });
  }
  else
  {
    response.error("Missing id param");
  }
});