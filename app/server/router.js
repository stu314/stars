var DB = require('./database/database-manager');

module.exports = function (app) {
    
    app.get('/', function(req, res){
        console.log('get /')
        res.render('index', { title: 'WOOOO IT WORKED' } );
    });
    
    app.get('/db', function (req, res) {
        console.log('get /db')
        DB.getStars(function(out){
            res.send(out);
        });
    });
    
    app.get('/test', function (req, res) {
        console.log('get /test')
        res.send('test worked');
    });

};