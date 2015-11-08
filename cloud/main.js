require("cloud/Author/author.js");
require("cloud/Book/book.js");

// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response)
{
  response.success("Chao Khai!");
});

// Example for get request params
Parse.Cloud.define("getPostParams", function(request, response)
{  
  response.success(request.params.name);
});

