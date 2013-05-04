$(function() {
    Speys.Universe.fetch({
        success:function(){
            console.log(Speys);
            Speys.App = new App();
            Speys.Universe.createMeshes();
            console.log(Speys);
        }
    });
});