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
        this.set('texture', THREE.ImageUtils.loadTexture(this.get('texture')));
        this.set('material', new THREE.MeshBasicMaterial({map: this.get('texture')}));
        this.set('geometry', new Three.SphereGeometry(this.get('size'), 256, 256));
        this.set('mesh', new THREE.Mesh(this.get('geometry'), this.get('material')));
        this.get('mesh').position.set(0,0,0);
        this.set('rotationAngle', 0);
        this.set('rotationAngleIncrement', (Math.Pi/(180*60))*this.get('orbit'));
        Speys.App.scene.add(this.get('mesh'));
        
    },
    rotate:function() {
            
    },
    orbit:function() {
        
        this.get('mesh').position.set((this.get('distance')*(Math.sin(this.get('rotationAngle')))), this.get('distance')*(Math.cos(this.get('rotationAngle'))));
        
    },
    intersected:function() {
    
    }
});


