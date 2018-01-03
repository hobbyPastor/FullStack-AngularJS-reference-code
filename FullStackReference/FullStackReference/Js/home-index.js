//home-index.js
angular.module('homeIndex', []);

homeIndex.config(function ($routeProvider) {
    $routeProvider.when("/", {
        controller: "TopicsController",
        templateUrl: "/Template/topicsView.html"
    });
    $routeProvider.otherwise({ redirectTo: "/" });
});

homeIndex.controller('homeIndexController', function ($scope, $http) {
    $scope.data = [];
    $scope.isBusy = true;

    $http.get("/api/v1/topics?includeReplies=true")
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
});