const db = require("./conn");

class BookModel {
  constructor(name, author) {
    this.name = name;
    this.author = author;
  }

  static async getAllBooks() {
    try {
      const response = await db.any(`
                SELECT id, name, author, image FROM books;
            `);
      return response;
    } catch (error) {
      console.error("ERROR: ", error);
      return error;
    }
  }

  static async getOneBook(id) {
    try {
      const response = await db.any(`
                SELECT id, name, author, image FROM books
                WHERE books.id = ${id};
            `);
      return response;
    } catch (error) {
      console.error("ERROR: ", error);
      return error;
    }
  }

  static async getReviewsOneBook(id) {
    try {
      const response = await db.any(`
                SELECT reviews.stars, reviews.title, reviews.review, users.name FROM reviews
                INNER JOIN books ON reviews.book_id = books.id
                INNER JOIN users ON reviews.users_id = users.id
                WHERE books.id = ${id};
            `);
      return response;
    } catch (error) {
      console.error("ERROR: ", error);
      return error;
    }
  }

  static async newReview(
    reviewer_id,
    book_id,
    review_title,
    review_stars,
    review_review
  ) {
    try {
      const response = await db.one(
        `
                INSERT INTO reviews (users_id, book_id, stars, title, review)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id`,
        [reviewer_id, book_id, review_stars, review_title, review_review]
      );
      return response;
    } catch (error) {
      console.log("ERROR: ", error);
      return error;
    }
  }
}

module.exports = BookModel;
