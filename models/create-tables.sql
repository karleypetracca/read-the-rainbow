CREATE TABLE books (
    id serial PRIMARY KEY,
    name text NOT NULL,
    author text NOT NULL,
    category text,
    image text
);

CREATE TABLE users (
    id serial PRIMARY KEY,
    name text NOT NULL,
    password text NOT NULL,
    email varchar
);

CREATE TABLE reviews (
    id serial PRIMARY KEY,
    users_id int,
    book_id int,
    stars int CHECK (stars <= 5) NOT NULL,
    title text,
    review text,
    FOREIGN KEY (users_id) REFERENCES users (id),
    FOREIGN KEY (book_id) REFERENCES books (id)
);

INSERT INTO books (name, author, category, image)
    VALUES ('Hunger Games', 'Suzanne Collins', 'Teen Fiction', '/images/book-hunger-games.jpg');

