var Universe = Backbone.Collection.extend({
    model:Star,
    url:'/db',
    initialize:function(){
        console.log('Universe created');
        this.on('add', this.added, this);
    },
    added:function(){
        console.log('added');
    }
});

Speys.Universe = new Universe();