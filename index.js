const express=require('express');
const path =require('path');
const sql=require('mysql');
const bodyparser=require('body-parser');
const session = require('express-session'); 
const socket=require('./ws');

	
	const app=express();
	app.use(session({
		secret:'kldjfmJKWNMKJKHNM'
	}))
	app.use('/mainpage',express.static(__dirname));
	app.use('/',express.static(__dirname + '/css'));
	app.use(bodyparser.json());
	app.use(bodyparser.urlencoded({extended:true}));

	var con = sql.createConnection({
		host:'localhost',
		user:'root',
		password:'',
		database:'users'
	});

	con.connect(function (err) {
		if(err) throw err;
		else{
			console.log('connection estd')
		}
	});

	app.get('/' , function(req,res){
		res.sendFile('login.html',{root:path.join(__dirname)});
	});

	app.get('/css/login.css' , function(req,res){
		res.sendFile('/login.css',{root:path.join(__dirname + '/css')});
	});
	
	/*Post request*/
	app.post('/signedin',function(req,res){
		console.log(req.body);
		var sqlQuery='INSERT INTO user SET ?';
		con.query(sqlQuery,req.body,function(err,results){
			if (err) {
				console.log(err);
			}
				console.log(results);
			});
		if(req.body.emailid=='rishabhagrawal@gmail.com' && req.body.password=='rajrishabh'){
			res.redirect('/adminpage');
			app.get('/adminpage',function(req,res){
				res.sendFile('adminpage.html',{root:path.join(__dirname)});
			});
		}
		
		else{
			session.Uniqueid =req.body.emailid;
			res.redirect('/mainpage');
			if(session.Uniqueid)
			{
				app.get('/mainpage',function(req,res){
					res.sendFile('mainpage.html',{root:path.join(__dirname)});
				});
			}
		}
	});
	app.listen(3000,function() {
		console.log("server on running on port 3000")
	});