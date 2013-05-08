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
        Speys.App.camera.position.y = 200;
        Speys.App.camera.position.z = 200;
        Speys.App.camera.lookAt(new THREE.Vector3(0,0,0));
    },
    url:function(){
        return '/solarsystems/'+this.get('iD');
    }
});

var Star = Backbone.Model.extend({
    initialize:function(){
        if(this.get('size'))
            this.set('geometry', new THREE.SphereGeometry(this.get('size'), 256, 256));
        this.set('texture', THREE.ImageUtils.loadTexture('/images/moon.jpg'));
        this.set('material',  new THREE.MeshBasicMaterial({map: this.get('texture') }));
    },
    url:function(){
        return '/content/'+this.get('iD');
    },
    defaults:{
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
        this.set('texture', THREE.ImageUtils.loadTexture(this.get('texture')));
        this.set('material', new THREE.MeshBasicMaterial({map: this.get('texture') }))
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
        var newRotY, that = this;
        newRotY = (this.get('mesh').rotation.y)+(Math.PI/(180*60))*this.get('rotation');
        this.get('mesh').rotation.set(0, newRotY, 0);
        

        
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

