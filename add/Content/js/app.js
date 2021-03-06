﻿var app = angular.module('App', ['firebase']);


app.run(function ($rootScope, $firebaseObject) {
    console.log('--App.run');
    var ref = new Firebase("https://voteua-7b7a3.firebaseio.com/");
    //$rootScope.data = { votes: [{ answers: [{}] }] };
    $rootScope.data = {};
    var obj = $firebaseObject(ref);
    obj.$bindTo($rootScope, 'data');
    //$rootScope.$watch('data', function (newValue, oldValue) {
    //    $rootScope.$apply();
    //});
    obj.$loaded(function () {

    });
});

app.controller('AddVoteCtrl', function ($rootScope, $scope, $firebaseObject) {
    $scope.vote = {
        owner: "",
        password: "",
        nick: "",
        name: "",
        question: "",
        answers: []
    }
    $scope.AddAnswer = function (answername) {
        $scope.vote.answers.push({ name: answername, count: 0 });
        $('#addanswerfield').val('');
    }
    $scope.DeleteAnswer = function (answerindex) {
        $scope.vote.answers.splice(answerindex, 1);
    }
    $scope.AddQuestion = function (nick, password, name, question) {
        $scope.vote.owner = "No Alex";
        $scope.vote.nick = nick;
        $scope.vote.password = password;
        $scope.vote.name = name;
        $scope.vote.question = question;

        $('#confirmAddingModal').modal('show');
    }
    $scope.ConfirmAdd = function (password) {
        if (password == $scope.vote.password) {
            if (AvailableNick($scope.vote.nick)) {
                $rootScope.data.votes.unshift($scope.vote);
                //console.log('Adding was successesful!');
                $('#confirmAddingModal').modal('hide');
                setTimeout(function () { window.location = '/'; }, 500);
            } else {
                $('#confirmAddingModal').modal('hide');
                alert('Nick is not available!');
            }
        } else {
            $('#confirmAddingModal').modal('hide');
            alert('password is incorrect!');
        }
    }
    function AvailableNick(nick) {
        var av = true;
        for (var i = 0; i < $rootScope.data.votes.length; i++) {
            if ($rootScope.data.votes[i].nick == nick) {
                av = false;
            }
        }
        return av
    }
});

