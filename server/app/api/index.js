const API = {}

const authors = [{
    id: 1,
    email: 'ramon@ramon.com',
    name: 'Ramon',
    password: '123'
  },
  {
    id: 2,
    email: 'breno@breno.com',
    name: 'Breno',
    password: '123'
  },
  {
    id: 3,
    email: 'mauro@mauro.com',
    name: 'Mauro',
    password: '123'
  }
];


const books = [{
  id: 1,
  title: 'The secret of the old clock',
  price: 10,
  author: authors[0]
}, {
  id: 2,
  title: 'The fault in our stars',
  price: 13,
  author: authors[1]
}, {
  id: 3,
  title: 'My dad is cooler than your dad',
  price: 10,
  author: authors[1]
}, {
  id: 4,
  title: 'Lie of Pi',
  price: 10,
  author: authors[2]
}, {
  id: 5,
  title: 'Of Mice and men',
  price: 10,
  author: authors[0]
}];


API.books = (req, res) => res.json(books);
API.booksadd = (req, res) => {
  let book = req.body;
  if (book.title === '' || book.price === '' || book.authorId === '') {
    const errors = [];
    if (! book.title) {
      errors.push({
        defaultMessage: "Title can't be blank",
        field: 'title'
      });
    }
    if (! book.price) {
      errors.push({
        defaultMessage: "Price can't be blank",
        field: 'price'
      });
    }
    if (! book.Id) {
      errors.push({
        defaultMessage: "Author can't be blank",
        field: 'authorId'
      });
    }
    res.status(400);
    res.json(errors);
  } else {
    const lastBook = books.slice(-1)[0];
    const author = authors.find(author => author.id == book.authorId);

    book.id = lastBook.id + 1;
    book.author = author;
    books.push(book);
    res.json(books);
  }
}

API.authors = (req, res) => res.json(authors);
API.add = (req, res) => {
  let author = req.body;
  if (author.name === '' || author.email === '' || author.password === '') {
    const errors = [];
    if (author.name === '') {
      errors.push({
        defaultMessage: "Name can't be blank",
        field: 'name'
      });
    }
    if (author.email === '') {
      errors.push({
        defaultMessage: "Email can't be blank",
        field: 'email'
      });
    }
    if (author.password === '') {
      errors.push({
        defaultMessage: "Password can't be blank",
        field: 'password'
      });
    }
    res.status(400);
    res.json(errors);
  } else {
    const lastAuthor = authors.slice(-1)[0];

    author.id = lastAuthor.id + 1;
    authors.push(author);
    res.json(authors);
  }
}

module.exports = API;
