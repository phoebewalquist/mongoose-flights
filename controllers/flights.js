const Flight = require('../models/flight');


module.exports = {
  index,
  new: newFlight,
  create,
  show
};


function index(req, res) {
  Flight.find({})
    .then((flights) => {
      res.render('flights/index', {
        flights,
        title: 'All Flights',
        dateFormat: (date) => {
          return new Date(date).toLocaleString();
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/');
    });
}

function newFlight(req, res) {
  res.render('flights/new', {
    title: 'Add Flight', 
    errorMsg: '' 
  });
}


async function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }

  try {
    await Flight.create(req.body);
    res.redirect('/flights');
  } catch (err) {
    console.log(err);
    res.render('flights/new', { errorMsg: err.message });
  }
}

async function show(req, res) {
  try {
    const flight = await Flight.findById(req.params.id);
    res.render('flights/show', { flight });
  } catch(err) {
    console.log(err);
    res.redirect('/flights');
  }
};
