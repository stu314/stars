var Speys = _.extend({}, Backbone.Events);

var SolarSystem = Backbone.Model.extend({

});

var Star = Backbone.Model.extend({
    initialize:function(){
    },
    url:function(){
        return '/content/'+this.get('iD');
    },
    defaults:{
        material: (new THREE.MeshLambertMaterial('0xffffff')),
        geometry: (new THREE.SphereGeometry(1,32,32))
    },
    createMesh: function(){
        this.set('mesh', _.extend(new THREE.Mesh(this.get('geometry'), this.get('material')), Backbone.Events));
        this.get('mesh').position.set(this.get('x')*100, this.get('y')*100, this.get('z')*100);
        Speys.App.scene.add(this.get('mesh'));
        this.listenTo(this.get('mesh'), 'intersected', this.intersected, this);
    },
    intersected:function(){
        var that = this;
        this.fetch({
            success:function(){
                //Speys.Content.remove();
                console.log(that);
            }
        });

        console.log(this.get('iD'));
        this.freeze = !this.freeze; break;
        
    }
});

var Planet = Backbone.Model.extend({
    initialize:function() {
                        
    },
    rotate:function() {
            
    },
    orbit:function() {
        
    },
    intersected:function() {
    
    }
});

