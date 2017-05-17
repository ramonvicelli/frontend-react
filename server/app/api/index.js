const API = {}

const authors = [{
    id: 1,
    email: 'ramon@ramon.com',
    name: 'Ramon',
  },
  {
    id: 2,
    email: 'vicelli@vicelli.com',
    name: 'Vicelli'
  },
  {
    id: 3,
    email: 'machado@machado.com',
    name: 'Machado'
  },
  {
    id: 4,
    email: 'breno@breno.com',
    name: 'Breno'
  },
  {
    id: 5,
    email: 'mauro@mauro.com',
    name: 'Mauro'
  }
];

API.authors = (req, res) => res.json(authors);

module.exports = API;