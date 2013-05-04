var App = Backbone.View.extend({
    el:'#container',
    initialize:function() {
        this.renderer = new THREE.WebGLRenderer({antialias: true, canvas:this.el});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1, 1500);
        this.scene.add(this.camera);
        this.controls = new THREE.FirstPersonControls(this.camera);
        this.controls.dragToLook = false;
        this.controls.lookSpeed = 0.001;
        this.controls.movementSpeed = 0.3;
        this.light = new THREE.AmbientLight(0xffffff);
        this.light.position.set(0,0,0);
        this.scene.add(this.light);
    },
    events:{
        'click img':'imgClicked'
    },
    render:function() {
        Speys.App.controls.update(1000/60);
        Speys.App.renderer.render(Speys.App.scene, Speys.App.camera);
        window.requestAnimationFrame(Speys.App.render);
    },
    imgClicked:function(event){
    
    }
});