var chalk = require('chalk');
var express=require('express');
var mongoose=require('mongoose');
var db=require('./models/db.js');

var routes=require('./routes/route.js');
var user=require('./routes/user.js');
var comment=require('./routes/comment.js');
var bodyParser=require('body-parser');

var session=require('express-session'); 

var app=express();

app.set('view engine','ejs');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false})); 
var session=require('express-session');
app.use(session({secret:"qazwsxedcrfvtgbyhnujm",resave: true, saveUninitialized: true}));


app.get('/',routes.index);

app.get('/comments',comment.comments);

app.get('/register',routes.register);

app.post('/newUser',user.doCreate);

app.get('/registrationSuccessful',user.registrationSuccessful);

app.get('/login',routes.login);

app.post('/authenticate',user.login);

app.get('/new-comment',routes.newComment);
app.post('/add-comment',comment.addComment);


app.get('/comments/:comment',comment.getComment);

app.post('/comments/:slug/saveComment',comment.saveComment);

app.get('/techStack',routes.techStack);

app.get('/logout',user.logout);

app.use(function(req, res) {
     console.log(chalk.red("Error: 404"));
     res.status(404).render('404');
});

app.use(function(error, req, res, next) {
     console.log(chalk.red('Error : 500'+error))
     res.status(500).render('500');
});

var port = process.env.PORT || 3013;

var server=app.listen(port,function(req,res){
    console.log(chalk.green("Catch the action at http://localhost:"+port));
});

module.exports = app;
