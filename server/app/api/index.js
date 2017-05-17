const API = {}

const negotiations = [{
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


API.authors = (req, res) => res.json(negotiations.filter(negotiation => negotiation.date > previousDate));

module.exports = API;
