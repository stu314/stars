var DB = require('./database/database-manager');

module.exports = function (app) {
    
    app.get('/', function(req, res){
        console.log('get /')
        res.render('index', { title: 'Speys' } );
    });
    
    app.get('/db', function (req, res) {
        console.log('get /db')
        DB.getStars( function(out){
            res.send(out);
        });
    });
    
};