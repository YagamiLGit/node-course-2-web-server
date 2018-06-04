const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
app.use( (req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log +'\n', (err) => {
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  console.log(log);
  next();
});
// app.use( (req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
  // res.send('Hello Express.');
  // res.send({
  //   name: 'Tausif',
  //   likes: [
  //     'Biking',
  //     'Biryani'
  //   ]
  // });
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMsg: 'Welcome User'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to connect to server'
  });
});
app.get('/projects', (req,res) => {
  res.render('projects.hbs',{
    pageTitle: 'Project Page'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
