var Speys = _.extend({}, Backbone.Events);

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
        this.addMesh();
        this.listenTo(this.get('mesh'), 'intersected', this.intersected, this);
    },
    removeMesh:function() {
        Speys.App.scene.remove(this.get('mesh'));
    },
    addMesh:function() {
        Speys.App.scene.add(this.get('mesh'));
    },
    intersected:function(){
        var that = this;
        new SolarSystem({iD:this.get('iD')});
       /* this.fetch({
            success:function(){
                //Speys.Content.remove();
                console.log(that);
            }
        });*/

        console.log(this.get('iD'));
        this.freeze = !this.freeze;
        
    }
});

var Planet = Backbone.Model.extend({
    initialize:function() {
         console.log('hey im a paperpabs planet and my size is...:  '+this.get('size'));               
    },
    rotate:function() {
            
    },
    orbit:function() {
        
    },
    intersected:function() {
    
    }
});

