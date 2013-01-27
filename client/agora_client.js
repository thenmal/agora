$(document).ready(function(){
    var cookie = cookieToObject(document.cookie);
    var name = "";
    var email = "";
    if(cookie['username'] && cookie['email']){
        name = cookie['username'];
        email = cookie['email'];
    } else {
        name = window.prompt("Your name?");
        email = window.prompt("Your gravatar email?");
        createCookie(name, email);
    }


    $('.send').click(function() {
        var chat_num = this.classList[1];
        var msg = $('#words' + chat_num).val();
        msg = chat_num + '|' + name + ': ' + msg;
        websocket.send(msg);
        $('#words' + chat_num).val('');
    });

    var wsUri = "ws://10.72.10.163:8888/"; 
    websocket = new WebSocket(wsUri);
    websocket.onmessage = function(m){
        var data = m.data.split('|');
        $('#chat' + data[0]).append('<p>' + data[1] + '</p>');
    };
});

function getGravatar(email){
    var hash = md5sum(lower(email));
    return "http://www.gravatar.com/avatar/" + hash;
}

function cookieToObject(cookie){
    var dictionary = {};
    var c = cookie.split('; ');
    for (var i = 0; i < c.length; i++){
        var s = c[i].split('=');
        dictionary[s[0]] = s[1];
    }
    return dictionary;
}

function createCookie(username, email){
    var cookie = 'username=' + escape(username);
    document.cookie = cookie;
    cookie = 'email=' + escape(email);
    document.cookie = cookie;
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + 365);
    cookie = 'expires=' + exdate.toUTCString();
    document.cookie = cookie;
}
