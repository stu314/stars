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
        _.each(this.models, function(model,i){
            model.createMesh();
            var percent = (i+1)*(90/49999)+'%';
            $('#loader .inner').css('width',percent);
            $('#loader .loading-text').html('Creating star '+i+'/49999');
            if(i === 49998){
                $('#loader .loading-text').html('Rendering Universe');
                $('#loader .inner').animate({
                    "width":"100%"
                },1000, function(){
                    //$('#loader, #fullscreen-fade').hide();                            
                });
            }
        })
        Speys.App.render();
    }
});

Speys.Universe = new Universe();