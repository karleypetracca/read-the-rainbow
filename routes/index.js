const express = require('express'),
  router = express.Router(),
  bookModel = require('../models/bookmodel');


/* GET home page. */
router.get('/', async (req, res) => {
  let bookData = [];
  bookData = await bookModel.getAllBooks();

  res.render('template', {
    locals: {
      title: 'Read The Rainbow',
      sessionData: req.session,
      bookData: bookData
    },
    partials: {
      partial: 'partial-index'
    }
  });
});


router.get('/book/:id?', async (req, res) => {
  const { id } = req.params;
  let bookData = [], reviewData = [];

  if (!!id) {
    bookData = await bookModel.getOneBook(id);
    reviewData = await bookModel.getReviewsOneBook(id);
    partial = 'partial-id';
  } else {
    bookData = await bookModel.getBooks();
    partial = 'partial-index';
  }

  console.log(bookData);

  res.render('template', {
    locals: {
      title: 'Read The Rainbow',
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
router.post('/book/review', async (req, res) => {
  const { users_id, book_id, review_title, review_stars, review_review } = req.body;
  
  let postData = await bookModel.newReview(users_id, restaurant_id, review_title, review_stars, review_review);
  
  res.redirect(`/book/${restaurant_id}`);
});


module.exports = router;
