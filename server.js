const express = require ('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');


app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}:${req.method} ${req.url}`
  fs.appendFile(`Server.log` ,`${log}`,(err)=> {if(err){console.log(err);}});
  console.log(`${log}`);
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintainance.hbs');
// });

app.use(express.static(__dirname+'/public'));


hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()+' Data from helper';
});


hbs.registerHelper('screamIt',(text)=>{return text.toUpperCase();});

app.get('/',(req,res)=>{
  //res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs',{
    pageTitle:'Home Page',

    welcomeMessage:'Welcome to Express using handlebars'
  })
});
app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page',

  })
})

app.get('/bad',(req,res)=>{
  res.send({errorMessage:'Some error occured'});
})
app.listen(3000,()=>{console.log(`Server is now up on port 3000`);});
