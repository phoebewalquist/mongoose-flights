const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
  new: newTicket,
  create
};

async function newTicket(req, res) {
  res.render('tickets/new', {title: 'Add Ticket'});
}

async function create(req, res) {
  console.log('create')
  try {
    req.body.flight = req.params.id;
    const ticket = await Ticket.create(req.body);
    res.redirect(`/flights/${req.params.id}`);
  } catch (err) {
    // next(err);
    console.log(err)
  }
}