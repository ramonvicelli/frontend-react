const API = {}

const authors = [{
    id: 1,
    email: 'ramon@ramon.com',
    name: 'Ramon',
    password: '123'
  },
  {
    id: 2,
    email: 'vicelli@vicelli.com',
    name: 'Vicelli',
    password: '123'
  },
  {
    id: 3,
    email: 'machado@machado.com',
    name: 'Machado',
    password: '123'
  },
  {
    id: 4,
    email: 'breno@breno.com',
    name: 'Breno',
    password: '123'
  },
  {
    id: 5,
    email: 'mauro@mauro.com',
    name: 'Mauro',
    password: '123'
  }
];

API.authors = (req, res) => res.json(authors);
API.add = (req, res) => {
  let author = req.body;
  if (author.name === '' || author.email === '' || author.password === '') {
    const errors = [];
    if (author.name === '') {
      errors.push({
        defaultMessage: "Name can't be blank"
      });
    }
    if (author.email === '') {
      errors.push({
        defaultMessage: "Email can't be blank"
      });
    }
    if (author.password === '') {
      errors.push({
        defaultMessage: "Password can't be blank"
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
