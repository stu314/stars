var Speys = _.extend({}, Backbone.Events);

var Star = Backbone.Model.extend({
    initialize:function(){
        
    },
    defaults:{
        material: (new THREE.MeshLambertMaterial('0xffffff')),
        geometry: (new THREE.SphereGeometry(1,32,32))
    },
    createMesh: function(){
        this.set('mesh', new THREE.Mesh(this.get('geometry'), this.get('material')));
        this.get('mesh').position.set(this.get('x')*100, this.get('y')*100, this.get('z')*100);
        Speys.App.scene.add(this.get('mesh'));
    }
});

