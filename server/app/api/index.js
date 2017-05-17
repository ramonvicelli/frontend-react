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
    const lastAuthor = authors.slice(-1)[0];
    let author = req.body;

    author.id = lastAuthor.id + 1;
    authors.push(author);
    res.json(author);
}

module.exports = API;