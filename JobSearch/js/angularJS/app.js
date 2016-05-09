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
               when('/editJob/:id', {
                   templateUrl: 'views/editJob.html',
                   controller: 'EditJobController'
               }).
               when('/editprofileemployer/:id', {
                   templateUrl: 'views/editProfileEmployer.html',
                   controller: 'EditProfileEmployer'
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

    $scope.applycoop = function (id) {

        var applycoopjob = {
            "DataID" : localStorage.getItem('DataID'),
            "JobID": id
        };

        //console.log(applycoopjob);
        $http.post("api/job/applycoop", applycoopjob).success(function (data, header, status, config) {

            $scope.applycoopjob = data;
        });
        setTimeout(
                function () {
                    window.location.reload(true);
                }, 1000);
    }

    $scope.detail = function (id) {

        var detailjob = {
                "JobID": id
            };

            //console.log(staff);
        $http.post("api/job/detailjob", detailjob).success(function (data, header, status, config) {

            $scope.detailjob = data[0];
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

app.controller("InternshipController", function ($scope, $http, $routeParams) {

    //------------------------------------------------------- GET STAFF -------------------------------------------------------//

    $http.get("api/job/internship").success(function (data) {

        $scope.internship = data;
    });

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
            text: "You will not be able to recover this file!",
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

app.controller("PermissionGroupController", function ($scope, $http, $routeParams) {

    var dataNotification = {
        "DataID": localStorage.getItem('DataID')
    }

    $http.post("api/job/notificationemployer/", dataNotification).success(function (data) {

        $scope.notification = data;

        $scope.count = $scope.notification.length;
        //console.log($scope.count)
    });

    $scope.counthide = function (id) {

        var hide = {
            "ApplyID": id,
            "Hide": 1

        };

        $http.post("api/job/counthide", hide).success(function (data, header, status, config) {

            $scope.counthides = data;
            //console.log($scope.interviews)
        });
        setTimeout(
                function () {
                    window.location.reload(true);
                }, 1000);
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

        //$(document).ready(function () {
        //    //Welcome Message (not for login page)
        //    function notify(message, type) {
        //        $.growl({
        //            message: message
        //        }, {
        //            type: type,
        //            allow_dismiss: false,
        //            label: 'Cancel',
        //            className: 'btn-xs btn-inverse',
        //            placement: {
        //                from: 'top',
        //                align: 'right'
        //            },
        //            delay: 2500,
        //            animate: {
        //                enter: 'animated bounceIn',
        //                exit: 'animated bounceOut'
        //            },
        //            offset: {
        //                x: 20,
        //                y: 85
        //            }
        //        });
        //    };

        //    if (!$('.login-content')[0]) {
        //        notify('Welcome back ' + $scope.index.Firstname, 'inverse');
        //    }
        //});
    });

    //--------------------------------------- GET Profile onClick dropdown view profile ---------------------------------------//

    
    $scope.status = localStorage.getItem('Status');

    if ($scope.status != 'true') {
        window.location = 'login.html';
    }

    $scope.show = localStorage.getItem('DataID');

    var showimg = 0;
    if ($scope.show == 2)
        showimg = 1;

    $scope.ButtonShowImg = showimg;

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

