window.log = console.log.bind(console);

requirejs(["Riddle"], function(Riddle){
    var riddle = window.riddle = new Riddle({
        width : 5,
        height : 5
    });

    // setInterval(function(){
    //     riddle.pass("privetkakdela");
    // }.bind(window), 1000);

});