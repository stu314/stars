var App = Backbone.View.extend({
    el:'#container',
    initialize:function() {
        console.log(Speys);
        this.renderer = new THREE.WebGLRenderer({antialias: true, canvas:this.el});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.scene = _.extend(new THREE.Scene(), Backbone.Events);
        this.camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1, 1500);
        this.scene.add(this.camera);
        this.controls = new THREE.FirstPersonControls(this.camera);
        this.controls.dragToLook = false;
        this.controls.lookSpeed = 0.001;
        this.controls.movementSpeed = 0.3;
        this.light = new THREE.AmbientLight(0xffffff);
        this.light.position.set(0,0,0);
        this.scene.add(this.light);
        this.projector = new THREE.Projector();
        console.log('finished, nearly');
    },
    events:{
        'click':'intersectCheck'
    },  
    render:function() {
        Speys.App.controls.update(1000/60);
        Speys.App.renderer.render(Speys.App.scene, Speys.App.camera);
        window.requestAnimationFrame(Speys.App.render);
    },
    intersectCheck:function(event){
        var vector,ray,intersects,location;
        vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
        Speys.App.projector.unprojectVector(vector, Speys.App.camera);
        ray = new THREE.Raycaster(Speys.App.camera.position, vector.sub(Speys.App.camera.position).normalize(), 0, 500 );
        intersects = ray.intersectObjects( Speys.App.scene.__objects );
        if (intersects[0]) intersects[0]['object'].trigger('intersected');          
    }
});

var ContentView = Backbone.View.extend({
    tagName:"div",
    className:"content popup",
    initialize:function(){
        this.render();
    },
    render:function(){
        $('body').append(this.el);
        this.$el.html("<h1>"+this.model.get('title')+"</h1><p>"+this.model.get('body')+"</p>");
    }
});