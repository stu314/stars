$(function() {
    Speys.Universe.fetch({
        success:function(){
            Speys.App = new App();
            Speys.Universe.createMeshes();
        }
    });
});