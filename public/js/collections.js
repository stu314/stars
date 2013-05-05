var Universe = Backbone.Collection.extend({
    model:Star,
    url:'/stars',
    initialize:function(){
        console.log('Universe created');
        this.on('add', this.added, this);
        this.listenToOnce(Speys, 'sceneReady', this.createMeshes, this);
    },
    added:function(){
        console.log('added');
    },
    createMeshes:function() {
        Speys.App.count = 0;
        _.each(this.models, function(model,i){
            model.createMesh();
        });
        Speys.App.render();
    }
});

Speys.Universe = new Universe();