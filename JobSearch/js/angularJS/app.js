var app = angular.module('myApp', ['ngRoute', 'angularFileUpload'])

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
               when('/editJob', {
                   templateUrl: 'views/editJob.html',
                   controller: 'EditJobController'
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
                   templateUrl: 'views/profileUser.html',
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

app.controller('ImageController', ['$scope', 'FileUploader', function ($scope, FileUploader) {
    var uploader = $scope.uploader = new FileUploader({
        url: 'api/job/image',
        formData: {
            'DataID': localStorage.getItem('DataID')
        }

    });

    // FILTERS

    uploader.filters.push({
        name: 'imageFilter',
        fn: function (item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    // CALLBACKS

    uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function (fileItem) {
        console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function (addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function (item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function (fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function (progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function (fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function (fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function (fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function (fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);

        setTimeout(
            function () {
                window.location.reload(true);
            }, 1000);
    };
    uploader.onCompleteAll = function () {
        console.info('onCompleteAll');

    };

    console.info('uploader', uploader);

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
    });

    $http.get("api/job/province").success(function (data) {

        $scope.province = data;
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

    });

});

app.controller("PermissionGroupController", function ($scope, $http, $routeParams) {

    //-------------------------------------------- GET permissiongroup by id --------------------------------------------------//

    $scope.Role = localStorage.getItem('RoleID');
    var permission = {
        "RoleID": $scope.Role
    }
    $http.post("api/job/permissiongroup", permission).success(function (data) {

        $scope.permissiongroup = data;
        //console.log($scope.permissiongroup);

    });

    $scope.PictureName = localStorage.getItem('PictureName');
    $scope.Firstname = localStorage.getItem('Firstname');
    $scope.Lastname = localStorage.getItem('Lastname');
    $scope.Companyname = localStorage.getItem('Companyname');
    $scope.Email = localStorage.getItem('Email');

    //------------------------------------------------------- Log out ---------------------------------------------------------//

    $scope.logout = function () {
        localStorage.clear();
        window.location = 'login.html';
    }

    $scope.DataID = localStorage.getItem('DataID');
    var dataid = {
        'DataID': $scope.DataID
    }
    $http.post("api/job/pageindex", dataid).success(function (data) {

        $scope.staffindex = data;
        //console.log($scope.staffindex);

        $(document).ready(function () {
            //Welcome Message (not for login page)
            function notify(message, type) {
                $.growl({
                    message: message
                }, {
                    type: type,
                    allow_dismiss: false,
                    label: 'Cancel',
                    className: 'btn-xs btn-inverse',
                    placement: {
                        from: 'top',
                        align: 'right'
                    },
                    delay: 2500,
                    animate: {
                        enter: 'animated bounceIn',
                        exit: 'animated bounceOut'
                    },
                    offset: {
                        x: 20,
                        y: 85
                    }
                });
            };

            if (!$('.login-content')[0]) {
                notify('Welcome back ' + $scope.staffindex.Firstname, 'inverse');
            }
        });
    });

    //--------------------------------------- GET Profile onClick dropdown view profile ---------------------------------------//

    
    $scope.status = localStorage.getItem('Status');

    if ($scope.status != 'true') {
        //alert($scope.status);
        window.location = 'login.html';
    }
});

//------------------------------------------------ Controller LoginController -------------------------------------------------//

app.controller("LoginController", function ($scope, $location, $http, $routeParams) {

    //--------------------------------------------- Check password at Log in --------------------------------------------------//

    $scope.submit = function (username, password) {

        var login = {
            "Username": username,
            "Password": password
        };
        //console.log(login);
        $http.post("api/job/login", login).success(function (data, header, status, config) {

            $scope.login = data;
            console.log($scope.login);
            localStorage.setItem('DataID', data.DataID);
            localStorage.setItem('Username', data.Username);
            localStorage.setItem('RoleID', data.RoleID);
            localStorage.setItem('Firstname', data.Firstname);
            localStorage.setItem('Lastname', data.Lastname);
            localStorage.setItem('Companyname', data.Companyname);
            localStorage.setItem('PictureName', data.PictureName);
            localStorage.setItem('Email', data.Email);
            localStorage.setItem('Status', data.status);
            localStorage.setItem('ma-layout-status', 1);
            $scope.status = localStorage.getItem('Status');
            console.log($scope.status);

            if ($scope.status == 'true') {
                //alert($scope.status);
                window.location = 'index.html';
            }
            else {
                window.location = 'login.html';
            }
        });
    };
});
