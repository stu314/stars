var DB = require('./database/database-manager');

module.exports = function (app) {
    
    app.get('/', function(req, res){
        console.log('get /')
        res.render('index', { title: 'Speys' } );
    });
    
    app.get('/stars', function (req, res) {
        console.log('get /db/stars')
        DB.getStars( function(out){
            res.send(out);
        });
    });
    
    app.get('/content/:id', function (req, res) {
        console.log('get /db/content')
        console.log(req.params.id);
        DB.getContent(req.params.id, function(out){
            console.log(out);
            res.send(out);
        });
    });
    
    app.get('/solarsystems/:id', function (req, res) {
        console.log('get /db/content')
        console.log(req.params.id);
        DB.getSolarSystem(req.params.id, function(out){
            console.log(out);
            res.send(out);
        });
    });
};