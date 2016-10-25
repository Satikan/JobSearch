var app = angular.module('myApp', ['ngRoute', 'angularFileUpload'])

app.config(['$routeProvider',
       function ($routeProvider) {
           $routeProvider.
               when('/', {
                   templateUrl: 'views/home.html',
                   controller: 'homeController'
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
               when('/postJob', {
                   templateUrl: 'views/postJob.html',
                   controller: 'PostJobController'
               }).
               when('/alljob', {
                   templateUrl: 'views/alljob.html',
                   controller: 'AlljobController'
               }).
               when('/alljobadmin', {
                   templateUrl: 'views/alljobadmin.html',
                   controller: 'AlljobAdminController'
               }).
               when('/detailJob/:id', {
                   templateUrl: 'views/detailJob.html',
                   controller: 'DetailjobController'
               }).
               when('/editJob/:id', {
                   templateUrl: 'views/editJob.html',
                   controller: 'EditJobController'
               }).
               when('/editJobAdmin/:id', {
                   templateUrl: 'views/editJobAdmin.html',
                   controller: 'EditJobAdminController'
               }).
               when('/editprofileemployer/:id', {
                   templateUrl: 'views/editProfileEmployer.html',
                   controller: 'EditProfileEmployer'
               }).
               when('/editprofileuser/:id', {
                   templateUrl: 'views/editProfileUser.html',
                   controller: 'EditProfileUser'
               }).
               when('/applicant/:id', {
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
               when('/profileUser/:id', {
                   templateUrl: 'views/profileUser.html',
                   controller: 'ProfileUserController'
               }).
               when('/profileEmployer/:id', {
                   templateUrl: 'views/profileEmployer.html',
                   controller: 'ProfileEmployerController'
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

//--------------------------------------------------- Directive Upload Image --------------------------------------------------//

app.directive('ngThumb', ['$window', function ($window) {
    var helper = {
        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
        isFile: function (item) {
            return angular.isObject(item) && item instanceof $window.File;
        },
        isImage: function (file) {
            var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    };

    return {
        restrict: 'A',
        template: '<canvas/>',
        link: function (scope, element, attributes) {
            if (!helper.support) return;

            var params = scope.$eval(attributes.ngThumb);

            if (!helper.isFile(params.file)) return;
            if (!helper.isImage(params.file)) return;

            var canvas = element.find('canvas');
            var reader = new FileReader();

            reader.onload = onLoadFile;
            reader.readAsDataURL(params.file);

            function onLoadFile(event) {
                var img = new Image();
                img.onload = onLoadImage;
                img.src = event.target.result;
            }

            function onLoadImage() {
                var width = params.width || this.width / this.height * params.height;
                var height = params.height || this.height / this.width * params.width;
                canvas.attr({ width: width, height: height });
                canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
            }
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

app.controller('FileuploadController', ['$scope', 'FileUploader', function ($scope, FileUploader) {
    var uploader = $scope.uploader = new FileUploader({
        url: 'api/job/fileupload',
        formData: {
            'DataID': localStorage.getItem('DataID')
        }
    });

    // FILTERS

    uploader.filters.push({
        name: 'customFilter',
        fn: function (item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 10;
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

    //----------------------------------------------------- GET businesstype -----------------------------------------------------//

    $http.get("api/job/businesstype").success(function (data) {

        $scope.businesstype = data;
        
    });

    //------------------------------------------------------ GET PROVINCE -----------------------------------------------------//

    $http.get("api/job/province").success(function (data) {

        $scope.province = data;
        console.log($scope.province);
    });

    //------------------------------------------------------- ADD Employers -------------------------------------------------------//

    $scope.addemployers = function () {

            if ($scope.Firstname == null, $scope.Lastname == null, $scope.Gender == null, $scope.EmployerAddress == null, $scope.Domicile == null, $scope.PresentAddress == null,
                $scope.StatusID == null, $scope.Education == null, $scope.Specialskill == null, $scope.Position == null, $scope.Email == null,
                $scope.Telephone == null, $scope.District == null, $scope.SubDistrict == null, $scope.Postcode == null, $scope.FileResume == null) {

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
                $scope.Postcode = "";
                $scope.FileResume = "";
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

            //console.log(employer);
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
            $scope.District == null, $scope.SubDistrict == null, $scope.Postcode == null, $scope.FileResume == null) {

            $scope.Username = "";
            $scope.Companyname = "";
            $scope.BusinessTypeID = "";
            $scope.EmployerAddress = "";
            $scope.Domicile = "";
            $scope.Education = "";
            $scope.Specialskill = "";
            $scope.FileResume = "";
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

app.controller("NewJobController", function ($scope, $http, $routeParams, $filter) {

    //----------------------------------------------------- GET businesstype -----------------------------------------------------//

    $http.get("api/job/jobtype").success(function (data) {

        $scope.jobtype = data;
        
    });

    //------------------------------------------------------- ADD Employers -------------------------------------------------------//

    $scope.addjob = function () {

        
        var date = $filter('date')(new Date(), 'yyyy-MM-d HH:mm:ss');//get current date
        var dataid = localStorage.getItem('DataID');

        var postjob = {
            "JobTitle": $scope.JobTitle,
            "DataID": dataid,
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
            "DateRange": $scope.DateRange,
            "DateStart": date,
            "ClosingDate": $scope.ClosingDate
        };
        //console.log(postjob);

        swal({
            title: "Do you want to post job",
            type: "info", showCancelButton: true,
            confirmButtonColor: "#00BFFF",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, function () {

        $http.post("api/job/postjob", postjob).success(function (data, header, status, config) {

            $scope.postjob = data;
        });
        setTimeout(
            function () {
                window.location.reload(true);
            }, 1000);
        //window.location.reload(true);
        });
    }
});

app.controller("PostJobController", function ($scope, $http, $routeParams, $filter) {

    //----------------------------------------------------- GET businesstype -----------------------------------------------------//

    $http.get("api/job/jobtype").success(function (data) {

        $scope.jobtype = data;

    });

    $http.get("api/job/province").success(function (data) {

        $scope.province = data;
    });

    //------------------------------------------------------- ADD Employers -------------------------------------------------------//

    $scope.postjob = function () {


        var date = $filter('date')(new Date(), 'yyyy-MM-d HH:mm:ss');//get current date
        var dataid = localStorage.getItem('DataID');

        var postjob = {
            "Companyname": $scope.Companyname,
            "JobTitle": $scope.JobTitle,
            "DataID": dataid,
            "JobDescription": $scope.JobDescription,
            "Keyskills": $scope.Keyskills,
            "Salary": $scope.Salary,
            "NumberPosition": $scope.NumberPosition,
            "Qualification": $scope.Qualification,
            "JobTypeID": $scope.JobTypeID,
            "Contactname": $scope.Contactname,
            "Position": $scope.Position,
            "EmployerAddress": $scope.EmployerAddress,
            "ProvinceID": $scope.ProvinceID,
            "District": $scope.District,
            "SubDistrict": $scope.SubDistrict,
            "Postcode": $scope.Postcode,
            "Email": $scope.Email,
            "Telephone": $scope.Telephone,
            "Website": $scope.Website,
            "DateRange": $scope.DateRange,
            "DateStart": date,
            "ClosingDate": $scope.ClosingDate
        };
        //console.log(postjob);

        swal({
            title: "Do you want to post job",
            type: "info", showCancelButton: true,
            confirmButtonColor: "#00BFFF",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, function () {

            $http.post("api/job/adminpostjob", postjob).success(function (data, header, status, config) {

                $scope.adminpostjob = data;
            });
            setTimeout(
                function () {
                    window.location.reload(true);
                }, 1000);
            //window.location.reload(true);
        });
    }
});

app.controller("EditJobController", function ($scope, $http, $routeParams, $filter) {

    $scope.getjobEdit = function () {
        $http.get("api/job/jobonly/" + $routeParams.id).success(function (data) {

            $scope.jobonly = data;
        });
    };

    //----------------------------------------------------- GET businesstype -----------------------------------------------------//

    $http.get("api/job/jobtype").success(function (data) {

        $scope.jobtype = data;

    });

    //------------------------------------------------------- ADD Employers -------------------------------------------------------//

    $scope.editjob = function () {

        var dataid = localStorage.getItem('DataID');

        var posteditjob = {
            "JobID": $scope.jobonly.JobID,
            "JobTitle": $scope.jobonly.JobTitle,
            "DataID": dataid,
            "JobDescription": $scope.jobonly.JobDescription,
            "Keyskills": $scope.jobonly.Keyskills,
            "Salary": $scope.jobonly.Salary,
            "NumberPosition": $scope.jobonly.NumberPosition,
            "Qualification": $scope.jobonly.Qualification,
            "JobTypeID": $scope.jobonly.JobTypeID,
            "Contactname": $scope.jobonly.Contactname,
            "Position": $scope.jobonly.Position,
            "Email": $scope.jobonly.Email,
            "Telephone": $scope.jobonly.Telephone,
            "DateRange": $scope.jobonly.DateRange,
            "ClosingDate": $scope.jobonly.ClosingDate
        };
        //console.log(postjob);

        swal({
            title: "Do you want to update job",
            type: "info", showCancelButton: true,
            confirmButtonColor: "#00BFFF",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, function () {

            $http.post("api/job/posteditjob", posteditjob).success(function (data, header, status, config) {

                $scope.posteditjob = data;
            });
            setTimeout(
                function () {
                    window.location.reload(true);
                }, 1000);
            //window.location.reload(true);
        });
    }
});

app.controller("EditJobAdminController", function ($scope, $http, $routeParams, $filter) {

    $scope.getjobEditAdmin = function () {
        $http.get("api/job/jobonlyadmin/" + $routeParams.id).success(function (data) {

            $scope.jobonlyadmin = data;
            console.log($scope.jobonlyadmin);
        });
    };

    //----------------------------------------------------- GET businesstype -----------------------------------------------------//

    $http.get("api/job/jobtype").success(function (data) {

        $scope.jobtype = data;

    });

    $http.get("api/job/province").success(function (data) {

        $scope.province = data;
        //console.log($scope.province);
    });

    //------------------------------------------------------- ADD Employers -------------------------------------------------------//

    $scope.editjobadmin = function () {

        var posteditjobadmin = {
            "JobID": $scope.jobonlyadmin.JobID,
            "Companyname": $scope.jobonlyadmin.Companyname,
            "JobTitle": $scope.jobonlyadmin.JobTitle,
            "DataID": $scope.jobonlyadmin.DataID,
            "JobDescription": $scope.jobonlyadmin.JobDescription,
            "Keyskills": $scope.jobonlyadmin.Keyskills,
            "Salary": $scope.jobonlyadmin.Salary,
            "NumberPosition": $scope.jobonlyadmin.NumberPosition,
            "Qualification": $scope.jobonlyadmin.Qualification,
            "JobTypeID": $scope.jobonlyadmin.JobTypeID,
            "Contactname": $scope.jobonlyadmin.Contactname,
            "Position": $scope.jobonlyadmin.Position,
            "EmployerAddress": $scope.jobonlyadmin.EmployerAddress,
            "ProvinceID": $scope.jobonlyadmin.ProvinceID,
            "District": $scope.jobonlyadmin.District,
            "SubDistrict": $scope.jobonlyadmin.SubDistrict,
            "Postcode": $scope.jobonlyadmin.Postcode,
            "Email": $scope.jobonlyadmin.Email,
            "Telephone": $scope.jobonlyadmin.Telephone,
            "Website": $scope.jobonlyadmin.Website,
            "DateRange": $scope.jobonlyadmin.DateRange,
            "ClosingDate": $scope.ClosingDate
        };
        //console.log(postjob);

        swal({
            title: "Do you want to update job",
            type: "info", showCancelButton: true,
            confirmButtonColor: "#00BFFF",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, function () {

            $http.post("api/job/posteditjobadmin", posteditjobadmin).success(function (data, header, status, config) {

                $scope.posteditjobadmins = data;
            });
            setTimeout(
                function () {
                    window.location.reload(true);
                }, 1000);
            //window.location.reload(true);
        });
    }
});

app.controller("CooperativeController", function ($scope, $http, $routeParams) {

    //------------------------------------------------------- GET STAFF -------------------------------------------------------//

    $http.get("api/job/cooperative").success(function (data) {

        $scope.cooperative = data;
        //console.log($scope.cooperative);
    });

    $scope.RoleId = localStorage.getItem('RoleID');
    var btdelete = 0;
    if ($scope.RoleId == 1)
        btdelete = 1;
    $scope.buttondelete = btdelete;

    var btapply = 0;
    if ($scope.RoleId == 3)
        btapply = 1;
    $scope.buttonapply = btapply;

    $scope.apply = function (id) {

        var applyjob = {
            "DataID" : localStorage.getItem('DataID'),
            "JobID": id
        };

        //console.log(applycoopjob);
        $http.post("api/job/apply", applyjob).success(function (data, header, status, config) {

            $scope.applyCooperative = data;
        });
        setTimeout(
                function () {
                    window.location.reload(true);
                }, 1000);
    }

    $scope.detailCooperative = function (id) {

        var detailcooperative = {
                "JobID": id
            };

            //console.log(staff);
        $http.post("api/job/detailjob", detailcooperative).success(function (data, header, status, config) {

            $scope.detailCooperativejob = data[0];
            //console.log($scope.detailjob);
            });
    }

    $scope.deleteCooperative = function (id) {

        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false

        }, function () {

            //swal("Deleted!", "Your file has been deleted.", "success");

            var Cooperative = {
                "JobID": id,
                "Deleted": 1
            };

            $http.post("api/job/jobdelete", Cooperative).success(function (data, header, status, config) {

                $scope.deleteCooperativejob = data;
                //console.log($scope.job)
            });
            setTimeout(
                function () {
                    window.location.reload(true);
                }, 1000);
        });
    }
});

app.controller("InternshipController", function ($scope, $http, $routeParams) {

    //------------------------------------------------------- GET STAFF -------------------------------------------------------//

    $http.get("api/job/internship").success(function (data) {

        $scope.internship = data;
    });

    $scope.RoleId = localStorage.getItem('RoleID');
    var btdelete = 0;
    if ($scope.RoleId == 1)
        btdelete = 1;
    $scope.buttondelete = btdelete;

    var btapply = 0;
    if ($scope.RoleId == 3)
        btapply = 1;
    $scope.buttonapply = btapply;

    $scope.apply = function (id) {

        var apply = {
            "DataID": localStorage.getItem('DataID'),
            "JobID": id
        };

        //console.log(applycoopjob);
        $http.post("api/job/apply", apply).success(function (data, header, status, config) {

            $scope.applyinternship = data;
        });
        setTimeout(
                function () {
                    window.location.reload(true);
                }, 1000);
    }

    $scope.detailInternship = function (id) {

        var detailinternship = {
            "JobID": id
        };

        $http.post("api/job/detailjob", detailinternship).success(function (data, header, status, config) {

            $scope.detailinternshipjob = data[0];
            //console.log($scope.detailjob);
        });
    }

    $scope.deleteInternship = function (id) {

        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false

        }, function () {

            //swal("Deleted!", "Your file has been deleted.", "success");

            var Internship = {
                "JobID": id,
                "Deleted": 1
            };
            //console.log(Internship)
            $http.post("api/job/jobdelete", Internship).success(function (data, header, status, config) {

                $scope.deleteInternshipjob = data;
                //console.log($scope.job)
            });
            setTimeout(
                function () {
                    window.location.reload(true);
                }, 1000);
        });
    }

});

app.controller("PartTimeController", function ($scope, $http, $routeParams) {

    //------------------------------------------------------- GET STAFF -------------------------------------------------------//

    $http.get("api/job/parttime").success(function (data) {

        $scope.parttime = data;
    });

    $scope.RoleId = localStorage.getItem('RoleID');
    var btdelete = 0;
    if ($scope.RoleId == 1)
        btdelete = 1;
    $scope.buttondelete = btdelete;

    var btapply = 0;
    if ($scope.RoleId == 3)
        btapply = 1;
    $scope.buttonapply = btapply;

    $scope.apply = function (id) {

        var apply = {
            "DataID": localStorage.getItem('DataID'),
            "JobID": id
        };

        //console.log(applycoopjob);
        $http.post("api/job/apply", apply).success(function (data, header, status, config) {

            $scope.applyinternship = data;
        });
        setTimeout(
                function () {
                    window.location.reload(true);
                }, 1000);
    }

    $scope.detailParttime = function (id) {

        var detailparttime = {
            "JobID": id
        };

        $http.post("api/job/detailjob", detailparttime).success(function (data, header, status, config) {

            $scope.detailparttimejob = data[0];
            //console.log($scope.detailjob);
        });
    }

    $scope.deleteParttime = function (id) {

        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false

        }, function () {

            //swal("Deleted!", "Your file has been deleted.", "success");

            var parttime = {
                "JobID": id,
                "Deleted": 1
            };
            //console.log(Internship)
            $http.post("api/job/jobdelete", parttime).success(function (data, header, status, config) {

                $scope.deleteParttimejob = data;
                //console.log($scope.job)
            });
            setTimeout(
                function () {
                    window.location.reload(true);
                }, 1000);
        });
    }

});

app.controller("FullTimeController", function ($scope, $http, $routeParams) {

    //------------------------------------------------------- GET STAFF -------------------------------------------------------//

    $http.get("api/job/fulltime").success(function (data) {

        $scope.fulltime = data;
    });

    $scope.RoleId = localStorage.getItem('RoleID');
    var btdelete = 0;
    if ($scope.RoleId == 1)
        btdelete = 1;
    $scope.buttondelete = btdelete;

    var btapply = 0;
    if ($scope.RoleId == 3)
        btapply = 1;
    $scope.buttonapply = btapply;

    $scope.apply = function (id) {

        var apply = {
            "DataID": localStorage.getItem('DataID'),
            "JobID": id
        };

        //console.log(applycoopjob);
        $http.post("api/job/apply", apply).success(function (data, header, status, config) {

            $scope.applyfulltime = data;
        });
        setTimeout(
                function () {
                    window.location.reload(true);
                }, 1000);
    }

    $scope.detailFulltime = function (id) {

        var detailfulltime = {
            "JobID": id
        };

        $http.post("api/job/detailjob", detailfulltime).success(function (data, header, status, config) {

            $scope.detailfulltimejob = data[0];
            //console.log($scope.detailjob);
        });
    }

    $scope.deleteFulltime = function (id) {

        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false

        }, function () {

            //swal("Deleted!", "Your file has been deleted.", "success");

            var fulltime = {
                "JobID": id,
                "Deleted": 1
            };
            //console.log(Internship)
            $http.post("api/job/jobdelete", fulltime).success(function (data, header, status, config) {

                $scope.deleteFulltimejob = data;
                //console.log($scope.job)
            });
            setTimeout(
                function () {
                    window.location.reload(true);
                }, 1000);
        });
    }

});

app.controller("AlljobController", function ($scope, $http, $routeParams) {

    var dataid = {
        'DataID': localStorage.getItem('DataID')
    }

    $http.post("api/job/alljob", dataid).success(function (data) {

        $scope.alljob = data;

    });

    $scope.applicantjob = function (id) {
        
        window.location = "#/applicant/" + id;
    };

    $scope.editjob = function (id) {
        window.location = "#/editJob/" + id;
    };

    $scope.deletejob = function (id) {

        swal({
            title: "Are you sure?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false

        }, function () {

            //swal("Deleted!", "Your file has been deleted.", "success");

            var job = {
                "JobID": id,
                "Deleted": 1
            };

            $http.post("api/job/jobdelete", job).success(function (data, header, status, config) {

                $scope.job = data;
                //console.log($scope.job)
            });

            setTimeout(
                function () {
                    window.location.reload(true);
                }, 1000);
        });
    }

});

app.controller("AlljobAdminController", function ($scope, $http, $routeParams) {

    var dataid = {
        'DataID': localStorage.getItem('DataID')
    }

    $http.post("api/job/alljob", dataid).success(function (data) {

        $scope.alljob = data;

    });

    $scope.applicantjob = function (id) {

        window.location = "#/applicant/" + id;
    };

    $scope.editjobadmin = function (id) {
        window.location = "#/editJobAdmin/" + id;
    };

    $scope.deletejob = function (id) {

        swal({
            title: "Are you sure?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false

        }, function () {

            //swal("Deleted!", "Your file has been deleted.", "success");

            var job = {
                "JobID": id,
                "Deleted": 1
            };

            $http.post("api/job/jobdelete", job).success(function (data, header, status, config) {

                $scope.job = data;
                //console.log($scope.job)
            });

            setTimeout(
                function () {
                    window.location.reload(true);
                }, 1000);
        });
    }

});

app.controller("DetailjobController", function ($scope, $http, $routeParams) {

    $scope.getdetailjob = function () {
        $http.get("api/job/detailjob/" + $routeParams.id).success(function (data) {

            $scope.detailjobonly = data;
            //console.log($scope.detailjobonly)
        });
    };

    $scope.apply = function (id) {

        var applyjob = {
            "DataID": localStorage.getItem('DataID'),
            "JobID": id
        };

        //console.log(applycoopjob);
        $http.post("api/job/apply", applyjob).success(function (data, header, status, config) {

            $scope.applyDetail = data;
        });
        setTimeout(
                function () {
                    window.location.reload(true);
                }, 1000);
        window.location = "#/";
    }
});

app.controller("ApplicantController", function ($scope, $http, $routeParams) {

    //------------------------------------------------------- GET STAFF -------------------------------------------------------//

    $scope.getapplicant = function () {
        $http.get("api/job/applicant/" + $routeParams.id).success(function (data) {

            $scope.applicant = data;
            //console.log($scope.applicant)
        });
    };

    $scope.profileApplicant = function (id) {

            window.location = "#/profileUser/" + id;
    }

    $scope.getinterview = function (id) {

        var interview = {
            "DataID": id
        };

        $http.post("api/job/interview", interview).success(function (data, header, status, config) {

            $scope.interviews = data;
            //console.log($scope.interviews)
        });
    };

    $scope.interview = function () {

        var emailinterview = {
            "DataID": $scope.interviews.DataID,
            "EmailFrom": $scope.EmailFrom,
            "PasswordEmailFrom": $scope.PasswordEmailFrom,
            "EmailTo": $scope.interviews.Email,
            "Subject": $scope.Subject,
            "MessageInterview": $scope.MessageInterview
        };
        console.log(emailinterview);
        $http.post("api/job/sentemail", emailinterview)
    }

    $scope.cancleApplicant = function (id) {

        swal({
            title: "Are you sure?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            closeOnConfirm: false

        }, function () {

            //swal("Deleted!", "Your file has been deleted.", "success");

            var applyCancle = {
                "ApplyID": id,
                "Deleted": 1
            };

            $http.post("api/job/applycancle", applyCancle).success(function (data, header, status, config) {

                $scope.applyCancle = data;
                //console.log($scope.job)
            });

            setTimeout(
                function () {
                    window.location.reload(true);
                }, 1000);
        });
    }
});

app.controller("ProfileUserController", function ($scope, $http, $routeParams) {

    $scope.editprofileUser = function (id) {
        window.location = "#/editprofileuser/" + id;
    };

    $scope.profileOnly = function () {
        $http.get("api/job/useronly/" + $routeParams.id).success(function (data) {

            $scope.useronly = data;
            //console.log($scope.useronly);
        });
    };

    $scope.Role = localStorage.getItem('RoleID');
    var buttonuploadFile = 0;
    if ($scope.Role == 3)
        buttonuploadFile = 1;

    $scope.ButtonUploadFile = buttonuploadFile;

});

app.controller("EditProfileUser", function ($scope, $http, $routeParams, $filter) {

    $http.get("api/job/gender").success(function (data) {

        $scope.gender = data;

    });

    $http.get("api/job/status").success(function (data) {

        $scope.status = data;
    });

    $http.get("api/job/province").success(function (data) {

        $scope.province = data;
    });

    $scope.getprofileUser = function () {
        $http.get("api/job/useronly/" + $routeParams.id).success(function (data) {

            $scope.profileuser = data;
            //console.log($scope.profileuser);
        });
    };

    //------------------------------------------------------- ADD Employers -------------------------------------------------------//

    $scope.editProfileUser = function () {

        var posteditProfileUs = {
            "DataID": $scope.profileuser.DataID,
            "Firstname": $scope.profileuser.Firstname,
            "Lastname": $scope.profileuser.Lastname,
            "Email": $scope.profileuser.Email,
            "GenderID": $scope.profileuser.GenderID,
            "StatusID": $scope.profileuser.StatusID,
            "Education": $scope.profileuser.Education,
            "Specialskill": $scope.profileuser.Specialskill,
            "Position": $scope.profileuser.Position,
            "Domicile": $scope.profileuser.Domicile,
            "PresentAddress": $scope.profileuser.PresentAddress,
            "ProvinceID": $scope.profileuser.ProvinceID,
            "District": $scope.profileuser.District,
            "SubDistrict": $scope.profileuser.SubDistrict,
            "Postcode": $scope.profileuser.Postcode,
            "Telephone": $scope.profileuser.Telephone
        };
        console.log(posteditProfileUs);

        swal({
            title: "Do you want to update profile",
            type: "info", showCancelButton: true,
            confirmButtonColor: "#00BFFF",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, function () {

            $http.post("api/job/editprofileuser", posteditProfileUs).success(function (data, header, status, config) {

                $scope.posteditProfileuser = data;
            });
            setTimeout(
                function () {
                    window.location.reload(true);
                }, 1000);
            window.location = '#/profileUser/' + localStorage.getItem('DataID');
            //window.location.reload(true);
        });
    }

    $scope.btnCancel = function () {

        window.location = '#/profileUser/' + localStorage.getItem('DataID');
    }

});

app.controller("ProfileEmployerController", function ($scope, $http, $routeParams) {

    $scope.editprofileEmployer = function (id) {
        window.location = "#/editprofileemployer/" + id;
    };

    $scope.profileEmployerOnly = function () {
        $http.get("api/job/employeronly/" + $routeParams.id).success(function (data) {

            $scope.employeronly = data;
            //console.log($scope.employeronly);
        });
    };

    $scope.Role = localStorage.getItem('RoleID');
    var buttonuploadFile = 0;
    if ($scope.Role == 2)
        buttonuploadFile = 1;

    $scope.ButtonUploadFile = buttonuploadFile;

});

app.controller("EditProfileEmployer", function ($scope, $http, $routeParams, $filter) {

    //----------------------------------------------------- GET businesstype -----------------------------------------------------//

    $http.get("api/job/businesstype").success(function (data) {

        $scope.businesstype = data;

    });

    //------------------------------------------------------ GET PROVINCE -----------------------------------------------------//

    $http.get("api/job/province").success(function (data) {

        $scope.province = data;
        //console.log($scope.province);
    });

    $scope.getprofileEm = function () {
        $http.get("api/job/EmployerOnly/" + $routeParams.id).success(function (data) {

            $scope.profileemployer = data;
            console.log($scope.profileemployer);
        });
    };

    //------------------------------------------------------- ADD Employers -------------------------------------------------------//

    $scope.editProfileEm = function () {

        //var dataid = localStorage.getItem('DataID');

        var posteditProfileEm = {
            "DataID": $scope.profileemployer.DataID,
            "Companyname": $scope.profileemployer.Companyname,
            "BusinessTypeID": $scope.profileemployer.BusinessTypeID,
            "EmployerAddress": $scope.profileemployer.EmployerAddress,
            "ProvinceID": $scope.profileemployer.ProvinceID,
            "District": $scope.profileemployer.District,
            "SubDistrict": $scope.profileemployer.SubDistrict,
            "Postcode": $scope.profileemployer.Postcode,
            "Website": $scope.profileemployer.Website
        };
        //console.log(postjob);

        swal({
            title: "Do you want to update profile",
            type: "info", showCancelButton: true,
            confirmButtonColor: "#00BFFF",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, function () {

            $http.post("api/job/editprofileemployer", posteditProfileEm).success(function (data, header, status, config) {

                $scope.posteditProfileemployer = data;
            });
            setTimeout(
                function () {
                    window.location.reload(true);
                }, 1000);
            //window.location.reload(true);
        });
    }

    $scope.btnCancel = function () {
        
        window.location = '#/profileEmployer/' + localStorage.getItem('DataID');
    }

});

app.controller("homeController", function ($scope, $http, $routeParams, $filter) {

    $http.get("api/job/newfeed").success(function (data) {

        $scope.newfeed = data;
        console.log($scope.newfeed)
    });

});

app.controller("PermissionGroupController", function ($scope, $http, $routeParams) {
   
    //-----------------------------------------------------------------------------//

    $scope.Role = localStorage.getItem('RoleID');
    var notificationuser = 0;
    if ($scope.Role == 3)
        notificationuser = 1;

    $scope.notificationusers = notificationuser;

    //-----------------------------------------------------------------------------//

    $scope.Role = localStorage.getItem('RoleID');
    var notificationemployer = 0;
    if ($scope.Role == 2)
        notificationemployer = 1;

    $scope.notificationemployers = notificationemployer;

    //-----------------------------------------------------------------------------//

    var dataNotificationuser = {
        "Position": localStorage.getItem('Position')
    }

    $http.post("api/job/notificationuser/", dataNotificationuser).success(function (data) {

        $scope.notificationuser = data;

        $scope.countuser = $scope.notificationuser.length;
        //console.log($scope.count)
    });

    //-----------------------------------------------------------------------------//

    $scope.counthideuser = function (id) {

        var hideuser = {
            "JobID": id,
            "Hide": 1
        };

        $http.post("api/job/counthideuser", hideuser).success(function (data, header, status, config) {

            $scope.counthideusers = data;
            //console.log($scope.interviews)
        });
        setTimeout(
                function () {
                    window.location.reload(true);
                }, 500);
    };

    //-----------------------------------------------------------------------------//

    var dataNotification = {
        "DataID": localStorage.getItem('DataID')
    }

    $http.post("api/job/notificationemployer/", dataNotification).success(function (data) {

        $scope.notification = data;

        $scope.countemployer = $scope.notification.length;
        //console.log($scope.count)
    });

    //-----------------------------------------------------------------------------//

    $scope.counthideemployer = function (id) {

        var hideemployer = {
            "ApplyID": id,
            "Hide": 1

        };

        $http.post("api/job/counthide", hideemployer).success(function (data, header, status, config) {

            $scope.counthideemployers = data;
            //console.log($scope.interviews)
        });
        setTimeout(
                function () {
                    window.location.reload(true);
                }, 500);
    };

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

    $scope.profile = function (id) {
        
        if ($scope.Role == 1) {
            window.location = "#/profileUser/" + id;
        }
        if ($scope.Role == 2) {
            window.location = "#/profileEmployer/" + id;
        }
        if ($scope.Role == 3) {
            window.location = "#/profileUser/" + id;
        }

        //window.location.reload(true);
    }

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

        $scope.index = data;
        //console.log($scope.index);

    });

    //--------------------------------------- GET Profile onClick dropdown view profile ---------------------------------------//

    
    $scope.status = localStorage.getItem('Status');

    if ($scope.status != 'true') {
        window.location = 'login.html';
    }

    $scope.show = localStorage.getItem('DataID');

    //var showimg = 0;
    //if ($scope.show == 2)
    //    showimg = 1;

    //$scope.ButtonShowImg = showimg;

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
            //console.log($scope.login);
            localStorage.setItem('DataID', data.DataID);
            localStorage.setItem('Username', data.Username);
            localStorage.setItem('RoleID', data.RoleID);
            localStorage.setItem('Firstname', data.Firstname);
            localStorage.setItem('Lastname', data.Lastname);
            localStorage.setItem('Position', data.Position);
            localStorage.setItem('Companyname', data.Companyname);
            localStorage.setItem('PictureName', data.PictureName);
            localStorage.setItem('E-mail', data.Email);
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

