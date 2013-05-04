var Universe = Backbone.Collection.extend({
    model:Star,
    url:'/db',
    initialize:function(){
        console.log('Universe created');
        this.on('add', this.added, this);
        this.listenToOnce(Speys, 'sceneReady', this.createMeshes, this);
    },
    added:function(){
        console.log('added');
    },
    createMeshes:function() {
        _.each(this.models, function(model){
            model.createMesh();
        })
        Speys.App.render();
    }
});

Speys.Universe = new Universe();