$(function() {
    Speys.Universe.fetch({
        success:function(){
            console.log('fetched');
            console.log(Speys.Universe);
        }
    });
});