var firebase = new Firebase("https://agora.firebaseio.com");
var agoraApp = angular.module('agoraApp', ["firebase"]);

agoraApp.controller('MessageController', ['$scope', 'angularFire', 
        function MessageController($scope, angularFire){
    $scope.messages = [];
    angularFire(firebase, $scope, "messages");
    $scope.addMessage = function(e) {
        if(e.keyCode != 13) return;
        $scope.messages.push({user: name, message:$scope.msg, md5:MD5(name)});
        $scope.msg = "";
    };
}]);

var name = window.prompt("Your name?");

