var firebase = new Firebase("https://agora.firebaseio.com");

$(document).ready(function(){
    var name = window.prompt("Your name?");

    $('.send').click(function() {
        var chat_num = this.classList[1];
        var msg = $('#words' + chat_num).val();
        var thread = firebase.child('thread' + chat_num);
        thread.push({'user':name,'msg': msg});
        $('#words' + chat_num).val('');
    });

    firebase.child('threads').on('child_added', function(snapshot) {
        var t = snapshot.val();
        console.log(t);
        firebase.child('thread' + t).on('child_added', function(snapshot){
            $('#chat' + t).append(
                '<p>' + '<img src="http://www.gravatar.com/avatar.php?gravatar_id='
                + MD5(snapshot.val()['user']) + '&r=PG&s=25&default=identicon"'
                + ' <span class="user">' + snapshot.val()['user'] +
                ': </span>' + snapshot.val()['msg'] + '</p>');
        });
    });
});
