$(document).ready(function(){
    $('#send').click(function() {
        var msg = $('#words').val();
        websocket.send(msg);
        $('#words').val('');
    });

    var wsUri = "ws://echo.websocket.org/"; 
    websocket = new WebSocket(wsUri);
    websocket.onmessage = function(m) { onMessage(m) };

    function onMessage(m){
        $('#chat').append('<p>' + m.data + '</p>');
    };
});





