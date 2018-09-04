const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname +'/views/partials');

app.set('view engine','hbs');


app.use((req,res,next) => {
  var now = new Date().toString();
  log=`${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n',(err) => {
    if(err){
      console.log('unable to connet to server');
    }
  });
  next();
})

// app.use((req,res,next) => {
//   res.render('maintainance.hbs');
// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',() =>{
  return new Date().getFullYear()
});

app.get('/', (req,res) => {
  res.render('home.hbs');
});

app.get('/bad', (req,res) => {
  res.send({
    errorMessage : 'unable to do'
  });
});

app.get('/about', (req,res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page',
  });
});

console.log('starting in local server 3000');
app.listen(3000);
