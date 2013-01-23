$(document).ready(function(){
    $('#send').click(function() {
        var msg = $('#words').val();
        websocket.send(msg);
        $('#words').val('');
    });

    var wsUri = "ws://localhost:8888/"; 
    websocket = new WebSocket(wsUri);
    websocket.onmessage = function(m){
        $('#chat').append('<p>' + m.data + '</p>');
    };
});





