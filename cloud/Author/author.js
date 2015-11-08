// Add an Author
Parse.Cloud.define("addAuthor", function(request, response)
{
  var authorName = "";

  if (typeof request.params.authorName != "undefined")
  {
    authorName = request.params.authorName;
  }

  var authorAge = 0;

  if (typeof request.params.authorAge != "undefined")
  {
    authorAge = request.params.authorAge;
  }

  var Author = Parse.Object.extend("Author");
  var author = new Author();

  author.save({
    AuthorName: authorName,
    AuthorAge: authorAge
  }, {
    success: function(author) {
      // The object was saved successfully.
      response.success("The author was saved successfully, id = " + author.id);
    },
    error: function(author, error) {
      // The save failed.
      // error is a Parse.Error with an error code and message.
      response.error("The author was saved fail. Error: " + error);
    }
  });
});