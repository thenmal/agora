var users = {};

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

    var wsUri = "ws://localhost:8888/"; 
    websocket = new WebSocket(wsUri);
    sendJoin(name, email, websocket);
    websocket.onmessage = function(m){
        parseMessage(m.data);
    };
});

function parseMessage(m){
    var p = m.split('|');
    var n = parseInt(p[0]);
    if(n == 0){
        userJoined(m);
    } else {
        var user_email = users[parseInt(p[1])].email;
        var dom = '<p><img src="' + getGravatar(user_email) + '?s=40" />' + n[2] + '</p>';
        $('#chat' + n).append(dom);
    }
}

function userJoined(message){
    var parts = message.split('|');
    var user_number = parseInt(parts[0]);
    var user_name = parts[1];
    var user_email = parts[2];
    users[user_number] = {};
    users[user_number]['name'] = user_name;
    users[user_number]['email'] = user_email;
}

function sendJoin(username, email, ws){
    var message = '0|' + username + '|' + email;
    ws.send(message);
}

function getGravatar(email){
    var hash = CryptoJS.MD5(email.toLowerCase());
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
