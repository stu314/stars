var App = Backbone.View.extend({
    el:'#container',
    initialize:function() {
        console.log(Speys);
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
        this.projector = new THREE.Projector();
        console.log('finished, nearly');
    },
    events:{
        'click':'imgClicked'
    },  
    render:function() {
        Speys.App.controls.update(1000/60);
        Speys.App.renderer.render(Speys.App.scene, Speys.App.camera);
        window.requestAnimationFrame(Speys.App.render);
    },
    imgClicked:function(event){
        console.log('Scumbag');
        var vector,ray,intersects,location;
        vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
        Speys.App.projector.unprojectVector(vector, Speys.App.camera);
        console.log(vector);
        ray = new THREE.Ray(Speys.App.camera.position, vector.sub(Speys.App.camera.position).normalize());
        console.log(ray);
        intersects = ray.intersectObjects( Speys.App.scene.__objects );
        
        if ( intersects.length > 0 ) {
            location = intersects[ 0 ].point;
            $('.pop-up .text').html("Co-ordinates of this star\nX:="+location.x + "\nY:="+location.y + "\nZ:=" + location.z).show;
            control.freeze = true;
            $('.pop-up').show();
            $('.fade').show();    
        };
    }
});