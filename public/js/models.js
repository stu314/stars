var Speys = _.extend({}, Backbone.Events);
/*DONT FUCK UP THE BASE*/
var SolarSystem = Backbone.Model.extend({
    initialize:function(){
        var that = this;
        Speys.Universe.removeMeshes();
        this.fetch({success:function(){
            that.set('planets', new Planets(that.get('planets')));
            that.set('sun', new Star(that.get('sun')).createMesh());
        }});
    },
    url:function(){
        return '/solarsystems/'+this.get('iD');
    }
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
        _.bindAll(this);
        this.set('texture', THREE.ImageUtils.loadTexture(this.get('texture')));
        this.set('material', new THREE.MeshBasicMaterial({map: this.get('texture')}));
        this.set('geometry', new THREE.SphereGeometry(this.get('size'), 256, 256));
        this.set('mesh', new THREE.Mesh(this.get('geometry'), this.get('material')));
        this.get('mesh').position.set(70,0,0);
        this.set('rotationAngle', 0);
        this.set('rotationAngleIncrement', (Math.PI/(180*60))*this.get('orbit'));
                console.log(this.get('orbit'));
        console.log(this.get('rotationAngle'));
        console.log(this.get('rotationAngleIncrement'));
        Speys.App.scene.add(this.get('mesh'));
        
        
        
    },
    update:function(){
        this.rotate();
        this.orbit();
        
    },
    
    rotate:function() {
            
    },
    orbit:function() {
        var that = this;
        this.get('mesh').position.set((that.get('distance')*(Math.cos(that.get('rotationAngle')))), 0, that.get('distance')*(Math.sin(that.get('rotationAngle'))));
        
        this.set('rotationAngle', (this.get('rotationAngle')+this.get('rotationAngleIncrement')));
       

        
    },
    intersected:function() {
    
    }
});
/*cunt*/

