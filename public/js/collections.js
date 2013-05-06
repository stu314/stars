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
        _.each(this.models, function(model,i){
            model.createMesh();
        });
        Speys.App.render();
    },
    removeMeshes:function() {
        _.each(this.models, function(model,i){
            model.removeMesh();
        });
    },
    addMeshes:function() {
        _.each(this.models, function(model,i){
            model.addMesh();
        });
    }
});
var Planets = Backbone.Collection.extend({
    model:Planet
})
Speys.Universe = new Universe();