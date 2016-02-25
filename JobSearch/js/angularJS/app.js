var app = angular.module('myApp', ['ngRoute', 'ngSanitize', 'ui.bootstrap', 'summernote', 'ngAnimate', 'ngDropzone', 'angularFileUpload', 'angularUtils.directives.dirPagination'])

app.config(['$routeProvider',
       function ($routeProvider) {
           $routeProvider.
               when('/', {
                   templateUrl: 'views/home.html',
                   //controller: 'homeController'
               }).
               when('/permission_staff', {
                   templateUrl: 'views/permission_staff.html',
                   controller: 'PermissionController'
               }).
               when('/staff', {
                   templateUrl: 'views/staff.html',
                   controller: 'staffController'
               }).
               when('/patchs', {
                   templateUrl: 'views/patchs.html',
                   // controller: 'ViewStudentsController'
               }).
               when('/upload', {
                   templateUrl: 'views/upload.html',
                   controller: 'uploadController'
               }).
               when('/Patchs_Collection', {
                   templateUrl: 'views/uploadList.html',
                   controller: 'MyPatchController'
               }).
               when('/add_staff', {
                   templateUrl: 'views/add_staff.html',
                   controller: 'staffController'
               }).
               when('/add_permission', {
                   templateUrl: 'views/add_permission.html',
                   controller: 'PermissionController'
               }).
               when('/staffProfile/:id', {
                   templateUrl: 'views/staffProfile.html',
                   controller: 'staffController'
               }).
               when('/edit_staff_role/:id', {
                   templateUrl: 'views/edit_staff_role.html',
                   controller: 'PermissionController'
               }).
               when('/edit_staff_profile/:id', {
                   templateUrl: 'views/edit_staff_profile.html',
                   controller: 'staffController'
               }).
               when('/change_password/:id', {
                   templateUrl: 'views/change_password.html',
                   controller: 'staffController'
               }).
               when('/editProfile/:id', {
                   templateUrl: 'views/editProfile.html',
                   controller: 'staffController'
               }).
               when('/editPatch/:patchID', {
                   templateUrl: 'views/editPatch.html',
                   controller: 'MyPatchController'
               }).
               when('/login', {
                   templateUrl: 'login.html',
                   controller: 'LoginController'
               }).
              otherwise({
                  redirectTo: '/login.html'
              });
       }]);

//------------------------------------------------- Directive Confirm Password ------------------------------------------------//

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

app.directive('ngThumb', ['$window', function($window) {
    var helper = {
        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
        isFile: function(item) {
            return angular.isObject(item) && item instanceof $window.File;
        },
        isImage: function(file) {
            var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    };

    return {
        restrict: 'A',
        template: '<canvas/>',
        link: function(scope, element, attributes) {
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

//--------------------------------------------------- Controller Upload Image --------------------------------------------------//

app.controller('ImageController', ['$scope', 'FileUploader', function($scope, FileUploader) {
    var uploader = $scope.uploader = new FileUploader({
        url: 'api/staff/image',
        formData: {
            'StaffID' : localStorage.getItem('StaffID')
        }

    });

    // FILTERS

    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    // CALLBACKS

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);

        setTimeout(
            function () {
                window.location.reload(true);
            }, 1000);
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');

    };

    console.info('uploader', uploader);
    
}]);


//------------------------------------------------- Controller StaffController ------------------------------------------------//

app.controller("staffController", function ($scope, $http, $routeParams) {

    $scope.password = null;
    $scope.passwordConfirmation = null;

    //------------------------------------------------------- GET STAFF -------------------------------------------------------//

    $http.get("api/staff/staffall").success(function (data) {

        $scope.staff = data;
        //console.log($scope.staff);
    });

    //------------------------------------------------- Plus id in page html --------------------------------------------------//

    $scope.EDstaff = function (id) {
        window.location = "#/edit_staff_profile/" + id;
    };

    $scope.profile = function (id) {
        window.location = "#/staffProfile/" + id;
    };

    $scope.EDstaffprofile = function (id) {
        window.location = "#/editProfile/" + id;
    };

    $scope.EDpassword = function (id) {
        window.location = "#/change_password/" + id;
    };

    //---------------------------------------------------- GET ONLY STAFF -----------------------------------------------------//

    $scope.getstaff = function () {
        $http.get("api/staff/staffall/" + $routeParams.id).success(function (data) {

            $scope.staffonly = data;

            $scope.StaffId = localStorage.getItem('StaffID');
            //console.log($scope.StaffId)

            var buttonedit = 0;
            if ($scope.StaffId == $scope.staffonly.StaffID)
                buttonedit = 1;

            $scope.ButtonEdit = buttonedit;
            //console.log($scope.ButtonEdit)
        });
    };

    //----------------------------------------------------- GET STAFFROLE -----------------------------------------------------//

    $http.get("api/staff/staffrole").success(function (data) {

        $scope.staffrole = data;

    });

    //------------------------------------------------------ GET PROVINCE -----------------------------------------------------//

    $http.get("api/staff/province").success(function (data) {

        $scope.province = data;

    });

    //------------------------------------------------------- GET GENDER ------------------------------------------------------//

    $http.get("api/staff/gender").success(function (data) {

        $scope.gender = data;

    });

    //------------------------------------------------------- ADD STAFF -------------------------------------------------------//

    $scope.addstaff = function () {
        
        swal({
            title: "Do you want to add staff",
            type: "info", showCancelButton: true,
            confirmButtonColor: "#00BFFF",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, function () {


            $scope.onFileSelect = function ($files) {
                $scope.selectedFile = $files;
                console.log($scope.selectedFile)
            };

            $scope.selectedFile = [];

            var file = $scope.selectedFile;
            console.log($scope.selectedFile)

            if ($scope.StaffLastname == null, $scope.Address1 == null, $scope.Address2 == null, $scope.City == null, $scope.Zipcode == null, $scope.Telephone == null, $scope.Mobile == null, $scope.Email == null) {
                $scope.StaffLastname = "";
                $scope.Address1 = "";
                $scope.Address2 = "";
                $scope.City = "";
                $scope.Zipcode = "";
                $scope.Telephone = "";
                $scope.Mobile = "";
                $scope.Email = "";
                
            }
            $scope.Picture = "default-user-icon-profile.png";
            var staff = {

                "StaffCode": $scope.StaffCode,
                "StaffPassword": $scope.StaffPassword,
                "StaffRoleID": $scope.StaffRoleID,
                "GenderID": $scope.GenderID,
                "StaffFirstname": $scope.StaffFirstname,
                "StaffLastname": $scope.StaffLastname,
                "Address1": $scope.Address1,
                "Address2": $scope.Address2,
                "City": $scope.City,
                "ProvinceID": $scope.ProvinceID,
                "Zipcode": $scope.Zipcode,
                "Telephone": $scope.Telephone,
                "Mobile": $scope.Mobile,
                "Email": $scope.Email,
                "Picture": $scope.Picture
            };

            //console.log(staff);
            $http.post("api/staff/staffall", staff, file).success(function (data, header, status, config) {

                $scope.staff = data;

            });

            //window.alert("Add staff successful!");
            window.location = "#/staff"
            window.location.reload(true);
        });
    }

    //---------------------------------------- EDIT STAFF page edit_staff_profile.html ----------------------------------------//

    $scope.editstaff = function () {

        swal({
            title: "Do you want to update staff",
            type: "info", showCancelButton: true,
            confirmButtonColor: "#00BFFF",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, function () {

            var staff = {
                "StaffID": $scope.staffonly.StaffID,
                "StaffCode": $scope.staffonly.StaffCode,
                "StaffRoleID": $scope.staffonly.StaffRoleID,
                "GenderID": $scope.staffonly.GenderID,
                "StaffFirstname": $scope.staffonly.StaffFirstname,
                "StaffLastname": $scope.staffonly.StaffLastname,
                "Address1": $scope.staffonly.Address1,
                "Address2": $scope.staffonly.Address2,
                "City": $scope.staffonly.City,
                "ProvinceID": $scope.staffonly.ProvinceID,
                "Zipcode": $scope.staffonly.Zipcode,
                "Telephone": $scope.staffonly.Telephone,
                "Mobile": $scope.staffonly.Mobile,
                "Email": $scope.staffonly.Email
            };

            //console.log(staff);
            $http.post("api/staff/staffedit", staff).success(function (data, header, status, config) {

                $scope.staff = data;
                //console.log(data);
            });
            window.location = "#/staff"
            window.location.reload(true);
        });
    }

    //-------------------------------------------- EDIT STAFF page editProfile.html -------------------------------------------//

    $scope.editstaffprofile = function () {

        swal({
            title: "Do you want to update profile",
            type: "info", showCancelButton: true,
            confirmButtonColor: "#00BFFF",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, function () {
            var staff = {
                "StaffID": $scope.staffonly.StaffID,
                "StaffCode": $scope.staffonly.StaffCode,
                "StaffRoleID": $scope.staffonly.StaffRoleID,
                "GenderID": $scope.staffonly.GenderID,
                "StaffFirstname": $scope.staffonly.StaffFirstname,
                "StaffLastname": $scope.staffonly.StaffLastname,
                "Address1": $scope.staffonly.Address1,
                "Address2": $scope.staffonly.Address2,
                "City": $scope.staffonly.City,
                "ProvinceID": $scope.staffonly.ProvinceID,
                "Zipcode": $scope.staffonly.Zipcode,
                "Telephone": $scope.staffonly.Telephone,
                "Mobile": $scope.staffonly.Mobile,
                "Email": $scope.staffonly.Email
            };

            //console.log(staff);
            $http.post("api/staff/staffedit", staff).success(function (data, header, status, config) {

                $scope.staff = data;
                //console.log(data);
            });
            window.location = "#/staffProfile/" + $scope.staffonly.StaffID;
            window.location.reload(true);
        });
    }

    //---------------------------------------------------- Change Password ----------------------------------------------------//

    $scope.editpasswordstaff = function (id, password) {

        swal({
            title: "Do you want to update newpassword",
            type: "info", showCancelButton: true,
            confirmButtonColor: "#00BFFF",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, function () {
            var staff = {
                "StaffID": id,
                "StaffPassword": password
            };

            //console.log(staff);
            $http.post("api/staff/editpasswordstaff", staff).success(function (data, header, status, config) {

                $scope.staff = data;
            });
            window.location = "#/staffProfile/" + id;
            window.location.reload(true);
        });
    }

    //----------------------------------------------------- DELETE STAFF ------------------------------------------------------//

    $scope.deletestaff = function (id) {

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

            var staff = {
                "StaffID": id,
                "Deleted": 1
            };

            //console.log(staff);
            $http.post("api/staff/staffdelete", staff).success(function (data, header, status, config) {

                $scope.staff = data;
                //console.log(data);

            });

            window.location.reload(true);
        });
    }

    $scope.reload = function () {
        window.location.reload(true);
    }

    $scope.status = localStorage.getItem('StaffStatus');

    if ($scope.status != 'true') {
        //alert($scope.status);
        window.location = 'login.html';
    }
});

//---------------------------------------------- Controller PermissionController ----------------------------------------------//

app.controller("PermissionController", function ($scope, $http, $routeParams) {

    //----------------------------------------------------- GET STAFFROLE -----------------------------------------------------//

    $http.get("api/staff/staffrole").success(function (data) {

        $scope.staffrole = data;

    });

    //------------------------------------------------- Plus id in page html --------------------------------------------------//

    $scope.EDpromission = function (id) {
        window.location = "#/edit_staff_role/" + id;
    };

    //---------------------------------------------------- GET Permission -----------------------------------------------------//

    $scope.getstaffrole = function () {
        $http.get("api/staff/staffroleaccess/" + $routeParams.id).success(function (data) {
            $scope.staffroleonly = data[0];
            //console.log($scope.staffroleonly);

            var staff = new Array();
            staff = $scope.staffroleonly.PermissionItemID.split(',').map(Number);
            $scope.permissionrole = staff;
            //console.log($scope.permissionrole);

        });
    };

    //--------------------------------------------- Value of checkbox permission ----------------------------------------------//

    $scope.headpermissions = [
        { id: 1, text: 'Manage Permission' }
    ];

    $scope.permissions = [
    { id: 2, text: 'Add StaffRole' },
    { id: 3, text: 'Edit StaffRole' },
    { id: 4, text: 'Delete StaffRole' }
    ];

    $scope.headstaffs = [
        { id: 5, text: 'Manage Staff' }
    ];

    $scope.staffs = [
    { id: 6, text: 'Add Staff' },
    { id: 7, text: 'Edit Staff' },
    { id: 8, text: 'Delete Staff' },
    { id: 9, text: 'View Profile' }
    ];

    $scope.headpatchs = [
        { id: 10, text: 'Manage Patchs' }
    ];

    $scope.patchs = [
    { id: 11, text: 'Download File' },
    { id: 12, text: 'Uploads File' },
    { id: 13, text: 'Sent Mail' }
    ];

    //$scope.headuploads = [
    //    { id: 12, text: 'Uploads File' }
    //];

    //$scope.uploads = [
    //{ id: 13, text: 'Upload File' }
    //];

    $scope.headfiles = [
        { id: 14, text: 'Manage File' }
    ];

    $scope.files = [
    { id: 15, text: 'Edit File' },
    { id: 16, text: 'Delete File' }
    ];

    $scope.permissions2 = [

    ];

    //------------------------------------ toggle selection for a given staffrole by id ---------------------------------------//

    $scope.toggleSelection = function toggleSelection(PermisstionID) {

        var idx = $scope.permissions2.indexOf(PermisstionID);

        // is currently selected
        if (idx > -1) {
            $scope.permissions2.splice(idx, 1);
        }

            // is newly selected
        else {
            $scope.permissions2.push(PermisstionID);
        }
    };

    //---------------------------------------------------- ADD STAFFROLE ------------------------------------------------------//

    $scope.addstaffrole = function () {
        //console.log($scope.permissions2)

        swal({
            title: "Do you want to add permission",
            type: "info", showCancelButton: true,
            confirmButtonColor: "#00BFFF",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, function () {
            var staffaccess = {
                "StaffRoleName": $scope.StaffRoleName,
                "PermissionItemID": $scope.permissions2,

            };

            //var parameters = { 'staffaccess': { 'StaffRoleName': $scope.StaffRoleName }, 'permissionItemdata': $scope.permissions2 };
            //var parameters = {'StaffRoleName': $scope.StaffRoleName , 'permissionItemdata': $scope.permissions2 };
            //console.log(staffaccess);
            $http.post("api/staff/staffaccess", staffaccess).success(function (data, header, status, config) {

                $scope.staffaccess = data;
                //console.log(data);
            });
            //window.alert("Add staffrole successful!");
            window.location = "#/permission_staff"
            window.location.reload(true);
        })
    }

    //--------------------------- toggle selection for a given staffrole by id for EDIT STAFFROLE -----------------------------//

    $scope.toggleEditSelection = function toggleEditSelection(PermisstionID) {

        var idx = $scope.permissionrole.indexOf(PermisstionID);

        // is currently selected
        if (idx > -1) {
            $scope.permissionrole.splice(idx, 1);
        }

            // is newly selected
        else {
            $scope.permissionrole.push(PermisstionID);
        }
    };

    //---------------------------------------------------- EDIT STAFFROLE -----------------------------------------------------//

    $scope.editstaffrole = function () {

        swal({
            title: "Do you want to update permission",
            type: "info", showCancelButton: true,
            confirmButtonColor: "#00BFFF",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, function () {
            var staffaccess = {
                "StaffRoleID": $scope.staffroleonly.StaffRoleID,
                "StaffRoleName": $scope.staffroleonly.StaffRoleName,
                "PermissionItemID": $scope.permissionrole
            };

            //console.log(staffaccess);
            $http.post("api/staff/staffaccessedit", staffaccess).success(function (data, header, status, config) {

                $scope.staffaccess = data;
                //console.log(data);
            });
            //window.alert("Update staffrole successful!");
            window.location = "#/permission_staff"
            window.location.reload(true);
        })
    }

    //--------------------------------------------------- DELETE STAFFROLE ----------------------------------------------------//

    $scope.deletestaffrole = function (id) {

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

            var staffaccess = {
                "StaffRoleID": id,
                "Deleted": 1
            };

            //console.log(staffaccess);
            $http.post("api/staff/staffroledelete", staffaccess).success(function (data, header, status, config) {

                $scope.staffaccess = data;
                //console.log(data);
            });

            window.location.reload(true);
        });
    }

    $scope.status = localStorage.getItem('StaffStatus');

    if ($scope.status != 'true') {
        //alert($scope.status);
        window.location = 'login.html';
    }
});

//------------------------------------------ Controller PermissionGroupController ---------------------------------------------//

app.controller("PermissionGroupController", function ($scope, $http, $routeParams) {

    //-------------------------------------------- GET permissiongroup by id --------------------------------------------------//

    $scope.StaffRole = localStorage.getItem('StaffRoleID');
    var permission = {
        "StaffRoleID": $scope.StaffRole
    }
    $http.post("api/staff/permissiongroup", permission).success(function (data) {

        $scope.permissiongroup = data;
        //console.log($scope.permissiongroup);
   
    });

    //------------------------------------------------------- Log out ---------------------------------------------------------//

    $scope.logout = function () {
        localStorage.clear();
        window.location = 'login.html';
    }

    //--------------------------------------------- GET Staff on page index.html ----------------------------------------------//

    $scope.StaffId = localStorage.getItem('StaffID');
    var staffid = {
        'StaffID': $scope.StaffId
    }
    $http.post("api/staff/staffpageindex", staffid).success(function (data) {

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
                notify('Welcome back ' + $scope.staffindex.StaffFirstname, 'inverse');
            }
        });
    });

    //--------------------------------------- GET Profile onClick dropdown view profile ---------------------------------------//

    $scope.profile = function (id) {
        //window.location.reload(true);
        window.location = "#/staffProfile/" + id;
    };

    $scope.getstaff = function () {
        $http.get("api/staff/staffall/" + $routeParams.id).success(function (data) {

            $scope.staffonly = data;
            console.log($scope.staffonly)
        });
    };

    //------------------------------------------- GET permission hide/show button ---------------------------------------------//

    $scope.StaffroleID = localStorage.getItem('StaffRoleID');
    var staffroleid = {
        'StaffRoleId': $scope.StaffroleID
    }

    $http.post("api/staff/permissionitem", staffroleid).success(function (data) {

        $scope.PermissionItem = data[0];
        //console.log($scope.PermissionItem);

        var Permission = new Array();
        Permission = $scope.PermissionItem.PermissionItemID.split(',').map(Number);
        $scope.permissionID = Permission;
        console.log($scope.permissionID);

        var addpermission = 0, editpermission = 0, deletedpermission = 0, addstaff = 0, viewstaff = 0, editstaff = 0, deletedstaff = 0;
        var download = 0, editupload = 0, deletedupload = 0;

        for (i = 0; i < Permission.length; i++) {

            if (Permission[i] == 2)
                addpermission = 1;
            if (Permission[i] == 3)
                editpermission = 1;
            if (Permission[i] == 4)
                deletedpermission = 1;

            if (Permission[i] == 6)
                addstaff = 1;
            if (Permission[i] == 7)
                editstaff = 1;
            if (Permission[i] == 8)
                deletedstaff = 1;
            if (Permission[i] == 9)
                viewstaff = 1;

            if (Permission[i] == 11)
                download = 1;
            if (Permission[i] == 15)
                editupload = 1;
            if (Permission[i] == 16)
                deletedupload = 1;
        }
        $scope.addRole = addpermission;
        $scope.editRole = editpermission;
        $scope.deleteRole = deletedpermission;

        $scope.addProfile = addstaff;
        $scope.viewProfile = viewstaff;
        $scope.editProfile = editstaff;
        $scope.deleteProfile = deletedstaff;

        $scope.downloadFile = download;
        $scope.editFile = editupload;
        $scope.deleteFile = deletedupload;
    });

    $scope.status = localStorage.getItem('StaffStatus');

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
            "StaffCode": username,
            "StaffPassword": password
        };
        //console.log(login);
        $http.post("api/staff/login", login).success(function (data, header, status, config) {
            
            $scope.login = data;
            console.log($scope.login)
            localStorage.setItem('StaffID', data.StaffID);
            localStorage.setItem('StaffRoleID', data.StaffRoleID);
            localStorage.setItem('StaffFirstName', data.StaffFirstname);
            localStorage.setItem('StaffName', data.StaffName);
            localStorage.setItem('StaffEmail', data.Email);
            localStorage.setItem('Picture', data.Picture);
            localStorage.setItem('StaffStatus', data.status);
            localStorage.setItem('ma-layout-status', 1);
            $scope.status = localStorage.getItem('StaffStatus');
            //console.log($scope.status);

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
