$(function() {
    Speys.Universe.fetch({
        success:function(){
            console.log(Speys.Universe);
            new App();
        }
    });
});