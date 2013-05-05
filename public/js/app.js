$(function() {
    Speys.Universe.fetch({
        success:function(){
            Speys.App = new App();
            Speys.App.render();
            Speys.Universe.createMeshes();
        }
    });
});