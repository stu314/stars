$(function() {
    Speys.Universe.fetch({
        success:function(){
            Speys.App = new App();
            Speys.App.render();
           // Speys.Universe.createMeshes();
            new Planet({
                size: 50,
                texture: '/Images/moon.png'
                
            });
        }
    });
});