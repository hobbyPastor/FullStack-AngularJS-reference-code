//home-index.js
var homeIndex = angular.module('homeIndex', ['ngRoute']);

homeIndex.config(function ($routeProvider) {


    $routeProvider.when("/newMessage", {
        controller: "newTopicController",
        templateUrl: "/Template/newTopicView.html"
    });

    $routeProvider.when("/", {
        controller: "topicsController",
        templateUrl: "/Template/topicsView.html"
    });

    $routeProvider.otherwise({ redirectTo: "" });
});

homeIndex.service('dataService', ['$http', '$q', function ($http, $q) {

    var _topics = [];

    var _getTopics = function () {
        var deferred = $q.defer();
        $http.get("/api/v1/topics?includeReplies=true")
            .then(function (result) {
                // success
                angular.copy(result.data, _topics);
                deferred.resolve();
            },
            function () {
                // error
                deferred.reject();
            })
        return deffered.promise;
    }

});

homeIndex.controller("topicsController", ['$scope', '$http', function ($scope, $http) {

    $scope.data = [];
    $scope.isBusy = true;

    dataService._getTopics
        .then(function (result) {
            // success
            angular.copy(result.data, $scope.data);
        },
        function () {
            // error
            alert("could not load topics");
        })
        .then(function () {
            $scope.isBusy = false;
        });
}]);

homeIndex.controller("newTopicController", ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.newTopic = {};

    $scope.save = function () {
        $http.post("/api/v1/topics", $scope.newTopic)
            .then(function (result) {
                //success
                var newTopic = result.data;
                $location.path("/");
            },
            function () {
                //error
                alert("Cannot save topic!");
            }
            );
    };
}]);