var DB = require('./database/database-manager');

module.exports = function (app) {
    
    app.get('/', function(req, res){
        console.log('get /')
        res.render('index', { title: 'Speys' } );
    });
    
    app.get('/db/stars', function (req, res) {
        console.log('get /db')
        DB.getStars( function(out){
            res.send(out);
        });
    });
    
    app.get('/db/content', function (req, res) {
        console.log('post /db')
        console.log(req.params.id);
        DB.getContent(req.params.id, function(out){
            console.log(out);
            res.send(out);
        });
    });
};