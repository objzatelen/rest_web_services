var express = require("express");

var routes = function(Book) {
  var bookRouter = express.Router();

    bookRouter
        .route("/books")
        .post(function(req, res) {
            var book1 = new Book(req.body);

            // console.log(req.header);

            // console.log(req);
            // console.log(book1);
            book1.save();
            res.status(201).send(book1);
        })
        .get(function(req, res) {
            var query = req.query;

            Book.find(query, function(err, books) {
                if (err) {
                    res.status(500).send(err); // console.log(err);
                } else {
                    res.json(books);
                }
            });
        });

  bookRouter.use("/books/:bookId", function(req, res, next) {

    Book.findById(req.params.bookId, function(err, book) {

      if (err) {
        res.status(500).send(err); console.log(err);
      } else if (book) {
        req.book = book;
        next();
      } else {
        res.status(404).send("no book found");
      }
    });
  });



  bookRouter
    .route("/books/:bookId")
    .get(function(req, res) {
      res.json(req.book);
    })
    .put(function(req, res) {
      req.book.title = req.body.title;
      req.book.author = req.body.author;
      req.book.genre = req.body.genre;
      req.book.read = req.body.read;
      req.book.save(function(err) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(req.books);
        }
      });
    })
    .patch(function(req, res) {
      if (req.body._id) {
        delete req.body._id;
      }
      for (var p in req.body) {
        req.book[p] = req.body[p];
      }

      req.book.save(function(err) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(req.books);
        }
      });
    })
    .delete(function(req, res) {
      req.book.remove(function(err) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(204).send('Removed');
        }
      });
    });
  return bookRouter;
};

module.exports = routes;
