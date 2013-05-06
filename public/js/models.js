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
        if(this.get('size'))
            this.set('geometry', new THREE.SphereGeometry(this.get('size'), 256, 256));
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
    addMesh:function(){
        Speys.App.scene.add(this.get('mesh'));
    },
    removeMesh:function(){
        Speys.App.scene.remove(this.get('mesh'));
    },
    intersected:function(){
        var that = this;
        new SolarSystem({iD:that.get('iD')});
    }
});

var Planet = Backbone.Model.extend({
    initialize:function() {
        console.log('new planet');
        this.set('material', new THREE.MeshLambertMaterial({color: this.get('color')}))
        this.set('geometry', new THREE.SphereGeometry(this.get('size'), 256, 256));
        this.set('mesh', _.extend(new THREE.Mesh(this.get('geometry'), this.get('material')), Backbone.Events));
        this.set('rotationAngle', 0);
        this.set('rotationAngleIncrement', (Math.PI/(180*60))*this.get('orbit'));
        Speys.App.scene.add(this.get('mesh'));   
    },
    update:function(){
        this.rotate();
        this.orbit();  
    },
    rotate:function() {
        var newRotX, that = this;
        newRotX = (this.get('mesh').rotation.x)+(Math.PI/(180*60))*this.get('rotation');
        this.get('mesh').rotation.set(newRotX, 0, 0);
        

        
    },
    orbit:function() {
        var newX, newZ, that = this;
        newX = this.get('distance')*(Math.cos(this.get('rotationAngle')));
        newZ = this.get('distance')*(Math.sin(this.get('rotationAngle')));
        this.get('mesh').position.set(newX,0,newZ);
        this.set('rotationAngle', (this.get('rotationAngle')+this.get('rotationAngleIncrement')));        
    },
    intersected:function() {
    
    }
});
/*cunt*/

