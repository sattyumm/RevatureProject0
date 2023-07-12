app.service("userService", [
    "$http",
    function ($http) {


        this.registerUser = function (user, cb) {
            console.log("Inside Service");
            console.log(user);

            $http({
                method: "POST",
                url: "http://localhost:5000/users",
                data: user,
            }).then(
                function (response) {
                    // console.log(response);
                    cb(response.data);
                },
                function (error) {
                    console.log(error);
                }
            );
        };
        this.getData = function (cb) {

            $http({
                method: 'GET',
                url: ("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
            }).then(function (response) {

                cb(response.data);
                // return response.data;

            }, function (error) {
                console.log(error);
            })



        }


        this.getUsers = function (cb) {
            $http({
                method: "GET",
                url: "http://localhost:5000/users",
            }).then(
                function (myData) {
                    cb(myData.data);
                },
                function (error) {
                    console.log(error);
                }
            );
        };
    }]);