var Speys = _.extend({}, Backbone.Events);

var Star = Backbone.Model.extend({
    initialize:function(){
        
    },
    url:'/db/content',
    defaults:{
        material: (new THREE.MeshLambertMaterial('0xffffff')),
        geometry: (new THREE.SphereGeometry(1,32,32))
    },
    createMesh: function(){
        Speys.App.count = Speys.App.count + 1;
        
        $('#loader .inner').css('width',Speys.App.count*(100/49999)+'%');
        $('#loader .loading-text').html('Creating star '+Speys.App.count+'/49999');
        this.set('mesh', _.extend(new THREE.Mesh(this.get('geometry'), this.get('material')), Backbone.Events));
        this.get('mesh').position.set(this.get('x')*100, this.get('y')*100, this.get('z')*100);
        Speys.App.scene.add(this.get('mesh'));
        this.listenTo(this.get('mesh'), 'intersected', this.intersected, this);
    },
    intersected:function(){
        console.log(this.get('iD'));
        this.freeze = !this.freeze; break;
        
    }
});

