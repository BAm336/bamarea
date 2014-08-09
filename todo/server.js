/********** Set up ******************/
var express 	= require('express');
var app			= express();
var mongoose 	= require('mongoose');

/********** Configuration ***********/
mongoose.connect('mongodb://localhost/yeah');

app.configure(function(){
	app.use(express.static(__dirname + '/public'));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
});

var Todo = mongoose.model('Todo', {
	text : String
});


/********** Routes *****************/

app.get('/api/todos', function(req, res){

	Todo.find(function(err, todos){
		if(err)
			res.send(err);

		res.json(todos);
	})

});

app.post('/api/todos', function(req, res){

	/* Create a toto, information comes from Ajax request from Angular */
	Todo.create({
		text : req.body.text,
		done : false
	}, function(err, todo){
		if(err)
			res.send(err);

		/* get and return all the todos after you create another */
		Todo.find(function(err, todos){
			if(err)
				res.send(err);
			res.json(todos);
		});
	});

});

app.delete('/api/todos/:todo_id', function(req, res){
	Todo.remove({
		_id : req.params.todo_id
	}, function(err, todo){
		if(err)
			res.send(err);

		Todo.find(function(err, todos){
			if(err)
				res.send(err);
			res.json(todos);
		})
	});
});

app.get('*', function(req, res){
	console.log('Appel front get');
	res.sendfile('./public/index.html');
});

/********** Listen *****************/
app.listen(9898);
console.log("App listening on port 9898");