require('node-jsx').install({
  harmony: true
});
var reactEngine = require('react-engine');
var express = require('express');
var app = express();
var port = process.env.PORT || 4000


// create an engine instance
var engine = reactEngine.server.create({
  /*
    see the complete server options spec here:
    https://github.com/paypal/react-engine#server-options-spec
  */
});

// set the engine
app.engine('.jsx', engine);

// set the view directory
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'))


// set jsx or js as the view engine
// (without this you would need to supply the extension to res.render())
// ex: res.render('index.jsx') instead of just res.render('index').
app.set('view engine', 'jsx');

// finally, set the custom view
app.set('view', require('react-engine/lib/expressView'));



app.get('/', function(req, res){
  res.render('home',{
    title: 'Mi primera aplicación isomorphic'
  })
})

app.listen(port, function(){
  console.log('Corriendo en el puerto: ' + port);
})
