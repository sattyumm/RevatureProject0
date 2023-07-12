var app = angular.module('app', ['ngRoute']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/',
        {
            templateUrl: 'signIn.html',
            controller: 'signInCtrl'
        }).when('/signup', {
            templateUrl: 'signUp.html',
            controller: 'signUpCtrl'
        }).when('/dashboard', {
            templateUrl: 'dashboard.html'
        }).when('/fetch', {
            templateUrl: 'fetch.html',
            controller: 'fetchCtrl'
        }).otherwise({
            redirectTo: '/'
        });
}]);


// app.controller("fetchCtrl", ["$scope", "$http", function ($scope, $http) {
//     $scope.data = []; // Array to store the fetched data
//     $scope.imageUrl = '';

//     $scope.fetchData = function () {
//         console.log("inside fetch data");
//         $http.get("https://api.nasa.gov/planetary/apod?api_key=323RvwaltFIaZ5jtipyUbm2uheUDzybfLdjbvzUg")
//             .then(function (response) {
//                 console.log(response.data);
//                 $scope.imageUrl = response.data.url;
//                 $scope.data = response.data; // Assign the fetched data to $scope.data
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });
//     };
// }]);
app.controller("fetchCtrl", ["$scope", "$http", function($scope, $http) {
    $scope.imageUrl = ''; // Variable to store the image URL
    $scope.apodData = null; // Variable to store the APOD data
  
    $scope.fetchData = function() {
      var apiKey = "323RvwaltFIaZ5jtipyUbm2uheUDzybfLdjbvzUg";
      var date = $scope.selectedDate; // Get the selected date from the input field or date picker
  
      var url = "https://api.nasa.gov/planetary/apod?api_key=" + apiKey + "&date=" + date;
  
      $http.get(url)
        .then(function(response) {
          $scope.apodData = response.data;
          $scope.imageUrl = response.data.url;
        })
        .catch(function(error) {
          console.log(error);
        });
    };
  }]);
  
  
//signIn
app.controller('signInCtrl', ['$scope', '$location', 'userService', function ($scope, $location, userService) {
    $scope.redirect = function () {
        $location.path('/fetch');
    }
    $scope.signIn = function () {

        var flag = true;
        $scope.isLoggedin = false;

        userService.getUsers(function (data) {

            userData = data;
            for (user of userData) {
                if (user.email == $scope.useremail && user.password == $scope.userpass) {
                    var test = false;
                    console.log("Sucess");
                    $scope.redirect();
                    $scope.failed = false;
                    flag = false;
                    //$scope.isLoggedin=true;

                }
            }
            if (flag) {
                $scope.failed = true;
                console.log("Failed");
                alert("wrong password");

            }
        });

    }
}]);
//signUp
app.controller('signUpCtrl', ['$scope', '$location', 'userService', function ($scope, $location, userService) {

    $scope.redirect = function () {
        $location.path('/signin');
    }
    console.log("inside signup")
    // $scope.redirect = function () {
    //     $location.path('/dashboard');
    // }
    $scope.username;
    $scope.useremail;
    $scope.userpass;
    $scope.signUp = function () {

        var user = {
            name: $scope.username,
            email: $scope.useremail,
            password: $scope.userpass
        }
        userService.registerUser(user, function (data) {
            $scope.redirect();
            console.log(data);

        });


    }

}]);