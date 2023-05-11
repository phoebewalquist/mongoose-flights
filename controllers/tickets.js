const Ticket = require('../models/ticket');
const Flight = require('..models/flight');

module.exports = {
  new: newTicket,
  create,
  show
};

async function newTicket(req, res) {
    const flight = await Flight.findById(req.params.id)
  res.render('tickets/new', {title: 'Add Ticket'});
}

async function create(req, res) {
  
  try {
    req.body.flight = req.params.id;
    const ticket = await Ticket.create(req.body);
    res.redirect(`/flights/${req.params.id}`);
  } catch (err) {
    next(err);
  }
}

async function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        Ticket.find({flight: flight._id}, function(err, tickets) {
            res.render('fights/show', {tickets});
        });
    });
};