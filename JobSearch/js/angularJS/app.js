var app = angular.module('myApp', ['ngRoute'])

app.config(['$routeProvider',
       function ($routeProvider) {
           $routeProvider.
               when('/', {
                   templateUrl: 'views/home.html',
                   //controller: 'homeController'
               }).
               when('/registerEmployer', {
                   templateUrl: 'registerEmployer.html',
                   controller: 'RegisterEmployerController'
               }).
               when('/registerSeeker', {
                   templateUrl: 'registerSeeker.html',
                   controller: 'RegisterSeekerController'
               }).
               when('/newJob', {
                   templateUrl: 'views/newJob.html',
                   controller: 'NewJobController'
               }).
               when('/alljob', {
                   templateUrl: 'views/alljob.html',
                   controller: 'AlljobController'
               }).
               when('/applicant', {
                   templateUrl: 'views/applicant.html',
                   controller: 'ApplicantController'
               }).
               when('/cooperativeEducation', {
                   templateUrl: 'views/cooperativeEducation.html',
                   controller: 'CooperativeController'
               }).
               when('/fullTime', {
                   templateUrl: 'views/fullTime.html',
                   controller: 'FullTimeController'
               }).
               when('/partTime', {
                   templateUrl: 'views/partTime.html',
                   controller: 'PartTimeController'
               }).
               when('/internship', {
                   templateUrl: 'views/internship.html',
                   controller: 'InternshipController'
               }).
               when('/profile', {
                   templateUrl: 'views/profile.html',
                   //controller: 'NewJobController'
               }).
              when('/login', {
                  templateUrl: 'login.html',
                  controller: 'LoginController'
              }).
              otherwise({
                  redirectTo: '/login.html'
              });
       }]);


app.directive('passwordConfirm', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        scope: {
            matchTarget: '=',
        },
        require: 'ngModel',
        link: function link(scope, elem, attrs, ctrl) {
            var validator = function (value) {
                ctrl.$setValidity('match', value === scope.matchTarget);
                return value;
            }

            ctrl.$parsers.unshift(validator);
            ctrl.$formatters.push(validator);

            // This is to force validator when the original password gets changed
            scope.$watch('matchTarget', function (newval, oldval) {
                validator(ctrl.$viewValue);
            });
        }
    };
}]);

app.controller("RegisterEmployerController", function ($scope, $http, $routeParams) {

    //$scope.password = null;
    //$scope.passwordConfirmation = null;

    //----------------------------------------------------- GET businesstype -----------------------------------------------------//

    $http.get("api/job/businesstype").success(function (data) {

        $scope.businesstype = data;

    });

    //------------------------------------------------------ GET PROVINCE -----------------------------------------------------//

    $http.get("api/job/province").success(function (data) {

        $scope.province = data;
        //console.log($scope.province);
    });

    //------------------------------------------------------- ADD Employers -------------------------------------------------------//

    $scope.addemployers = function () {

            if ($scope.Firstname == null, $scope.Lastname == null, $scope.Gender == null, $scope.EmployerAddress == null, $scope.Domicile == null, $scope.PresentAddress == null,
                $scope.StatusID == null, $scope.Education == null, $scope.Specialskill == null, $scope.Position == null, $scope.Email == null,
                $scope.Telephone == null, $scope.District == null, $scope.SubDistrict == null, $scope.Postcode == null) {

                $scope.Firstname = "";
                $scope.Lastname = "";
                $scope.Gender = "";
                $scope.EmployerAddress = "";
                $scope.Domicile = "";
                $scope.PresentAddress = "";
                $scope.StatusID = "";
                $scope.Education = "";
                $scope.Specialskill = "";
                $scope.Position = "";
                $scope.Email = "";
                $scope.Telephone = "";
                $scope.District = "";
                $scope.SubDistrict = "";
                $scope.Postcode = ""
            }
            $scope.RoleID = 2;
            $scope.PictureName = "Employer.jpg";

            var employer = {
                "Username": $scope.Username,
                "Password": $scope.Password,
                "RoleID": $scope.RoleID,
                "Companyname": $scope.Companyname,
                "BusinessTypeID": $scope.BusinessTypeID,
                "EmployerAddress": $scope.EmployerAddress,               
                "ProvinceID": $scope.ProvinceID,
                "District": $scope.District,
                "SubDistrict": $scope.SubDistrict,
                "Postcode": $scope.Postcode,
                "Website": $scope.Website,
                "PictureName": $scope.PictureName
            };

            console.log(employer);
            $http.post("api/job/employer", employer).success(function (data, header, status, config) {

                $scope.employer = data;
                window.location = "login.html"
            });

            //window.alert("Add staff successful!");
            //window.location = "login.html"
            //window.location.reload(true);
    }

    //$scope.reload = function () {
    //    window.location.reload(true);
    //}

    //$scope.status = localStorage.getItem('StaffStatus');

    //if ($scope.status != 'true') {
    //    //alert($scope.status);
    //    window.location = 'login.html';
    //}
});

app.controller("RegisterSeekerController", function ($scope, $http, $routeParams) {

    $http.get("api/job/gender").success(function (data) {

        $scope.gender = data;

    });

    $http.get("api/job/status").success(function (data) {

        $scope.status = data;
        //console.log($scope.province);
    });

    $http.get("api/job/province").success(function (data) {

        $scope.province = data;
        console.log($scope.province);
    });

    //------------------------------------------------------- ADD Employers -------------------------------------------------------//

    $scope.addjobseeker = function () {

        if ($scope.Username == null, $scope.Companyname == null, $scope.BusinessTypeID == null, $scope.EmployerAddress == null, $scope.Website == null, $scope.GenderID == null,
            $scope.Domicile == null, $scope.PresentAddress == null, $scope.StatusID == null, $scope.Education == null, $scope.Specialskill == null,
            $scope.District == null, $scope.SubDistrict == null, $scope.Postcode == null) {

            $scope.Username = "";
            $scope.Companyname = "";
            $scope.BusinessTypeID = "";
            $scope.Website = "";
            $scope.GenderID = "";
            $scope.EmployerAddress = "";
            $scope.Domicile = "";
            $scope.StatusID = "";
            $scope.Education = "";
            $scope.Specialskill = "";
            $scope.District = "";
            $scope.SubDistrict = "";
            $scope.Postcode = ""
        }
        $scope.RoleID = 3;
        $scope.PictureName = "default-user-icon-profile.png";

        var seeker = {
            "Firstname": $scope.Firstname,
            "Lastname": $scope.Lastname,
            "Email": $scope.Email,
            "Password": $scope.Password,
            "RoleID": $scope.RoleID,
            "GenderID": $scope.GenderID,
            "StatusID": $scope.StatusID,
            "Education": $scope.Education,
            "Specialskill": $scope.Specialskill,
            "Position": $scope.Position,          
            "Domicile": $scope.Domicile,
            "PresentAddress": $scope.PresentAddress,
            "ProvinceID": $scope.ProvinceID,
            "District": $scope.District,
            "SubDistrict": $scope.SubDistrict,
            "Postcode": $scope.Postcode,
            "Telephone": $scope.Telephone,
            "PictureName": $scope.PictureName
        };

        console.log(seeker);
        $http.post("api/job/seeker", seeker).success(function (data, header, status, config) {

            $scope.seeker = data;
            window.location = "login.html"
        });
    }

    //$scope.reload = function () {
    //    window.location.reload(true);
    //}

    //$scope.status = localStorage.getItem('StaffStatus');

    //if ($scope.status != 'true') {
    //    //alert($scope.status);
    //    window.location = 'login.html';
    //}
});

app.controller("NewJobController", function ($scope, $http, $routeParams) {

    //$scope.password = null;
    //$scope.passwordConfirmation = null;

    //----------------------------------------------------- GET businesstype -----------------------------------------------------//

    $http.get("api/job/jobtype").success(function (data) {

        $scope.jobtype = data;
        
    });

    //------------------------------------------------------- ADD Employers -------------------------------------------------------//

    $scope.addjob = function () {

        if ($scope.Keyskills == null, $scope.Salary == null, $scope.Qualification == null, $scope.DateRange == null, $scope.NumberPosition == null) {

            $scope.Keyskills = "";
            $scope.Salary = "";
            $scope.NumberPosition = "";
            $scope.Qualification = "";
            $scope.DateRange = "";
        }

        var postjob = {
            "JobTitle": $scope.JobTitle,
            "JobDescription": $scope.JobDescription,
            "Keyskills": $scope.Keyskills,
            "Salary": $scope.Salary,
            "NumberPosition": $scope.NumberPosition,
            "Qualification": $scope.Qualification,
            "JobTypeID": $scope.JobTypeID,
            "Contactname": $scope.Contactname,
            "Position": $scope.Position,
            "Email": $scope.Email,
            "Telephone": $scope.Telephone,
            "DateRange": $scope.DateRange
        };

        console.log(postjob);
        $http.post("api/job/postjob", postjob).success(function (data, header, status, config) {

            $scope.postjob = data;
            //window.location = "login.html"
        });
    }
});

app.controller("CooperativeController", function ($scope, $http, $routeParams) {

    //------------------------------------------------------- GET STAFF -------------------------------------------------------//

    $http.get("api/job/cooperative").success(function (data) {

        $scope.cooperative = data;
    });

});

app.controller("InternshipController", function ($scope, $http, $routeParams) {

    //------------------------------------------------------- GET STAFF -------------------------------------------------------//

    $http.get("api/job/internship").success(function (data) {

        $scope.internship = data;
    });

});

app.controller("AlljobController", function ($scope, $http, $routeParams) {

    //$scope.DataID = localStorage.getItem('StaffID');
    $scope.DataID = 2;
    var dataid = {
        'DataID': $scope.DataID
    }

    $http.post("api/job/alljob", dataid).success(function (data) {

        $scope.alljob = data;
        console.log($scope.alljob);

    });

});