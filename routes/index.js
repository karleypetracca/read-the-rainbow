const express = require("express"),
  router = express.Router(),
  bookModel = require("../models/bookmodel");

/* GET home page. */
router.get("/", async (req, res) => {
  let bookData = [];
  bookData = await bookModel.getAllBooks();

  res.render("template", {
    locals: {
      title: "Read The Rainbow",
      sessionData: req.session,
      bookData: bookData
    },
    partials: {
      partial: "partial-index"
    }
  });
});

router.get("/book/:id?", async (req, res) => {
  const { id } = req.params;
  let bookData = [],
    reviewData = [];
  console.log(req.session);

  if (!!id) {
    bookData = await bookModel.getOneBook(id);
    reviewData = await bookModel.getReviewsOneBook(id);
    partial = "partial-id";
  } else {
    bookData = await bookModel.getBooks();
    partial = "partial-index";
  }

  res.render("template", {
    locals: {
      title: "Read The Rainbow",
      sessionData: req.session,
      bookData: bookData,
      reviewData: reviewData
    },
    partials: {
      partial: partial
    }
  });
});

// add review to individual book
router.post("/book/review", async (req, res) => {
  const {
    reviewer_id,
    book_id,
    review_title,
    review_stars,
    review_review
  } = req.body;

  console.log(req.body);

  let postData = await bookModel.newReview(
    reviewer_id,
    book_id,
    review_title,
    review_stars,
    review_review
  );

  res.redirect(`/book/${book_id}`);
});

module.exports = router;
