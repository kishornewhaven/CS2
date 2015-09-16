var customerQ = angular.module("customerQ",['ui.bootstrap'])

customerQ.controller('QueueCtrl',function($scope,$rootScope,$http){


    $http.get('customerQ/data.json').success(function(data) {
        // Adding Date to the JSON DATA
        $scope.customers = data;

        angular.forEach($scope.customers,function(item, i){
           item.date = new Date()
        })

        // Displaying Count of Pending Customers
        $scope.count = function(){

            if(angular.isDefined($scope.customers.length)){

                var length  = $scope.customers.length;
                var counter = length;
                angular.forEach($scope.customers,function(item, i){
                    if(item.status == true){
                        counter--;
                    }
                })
                // Updating Label Depending on the number of customers to be served
                if(length == counter){
                    return "label-danger"
                }
                if(counter < length/2){
                    return "label-warning"
                }
                if(counter < length/3){

                    return "label-success"
                }
            }
        }

    }).error(function() {


    });
    // Updating numerical count
    $scope.remainingQ = function() {
        var todoCount = 0;
        angular.forEach($scope.customers, function(value, key) {
            if(value.status == false){
                todoCount++
            }

        });
        return todoCount;
    };

    // Add a new Cutomer to Quere
    $scope.addCustomer = function(newCustomer){
        newCustomer.status = false
        $scope.customers.push(newCustomer)

    }

    // Selecting a Customer to Complete
    $scope.selectCustomer = function(customer){
       if(customer.status == true){
           customer.status = false
       }
        else{
        customer.status = true
       }
    }
});

// actions directive as it is repeated for every customer

customerQ.directive('angularActions',function(){
    return {
        restrict: 'E',
        scope:{
            permission:'=',
            data:'='
        },
        template:'<div class="btn-group" dropdown is-open="status.isopen">'+
        '<button type="button" class="btn btn-primary dropdown-toggle" dropdown-toggle ng-disabled="disabled">'+
        'Admin Actions <span class="caret"></span>'+
        '</button>'+
        '<ul class="dropdown-menu" role="menu">'+
        '<li><a href="" ng-click="edit(data)">Edit</a></li>'+
        '<li><a href="" ng-click="complete(data)">Complete</a></li>'+
        '<li><a href="" ng-click="hold(data)">Hold</a></li>'+
        '<li ng-if="$rootScope.role==admin"><a href="">Delete</a></li>'+
    '</ul></div>',
        controller:function($scope,$modal,$rootScope){

            $scope.complete = function(data){
                   data.status = true;
            }
            $scope.hold = function(data){
                data.status = false;
            }
            // On edit Opening a modal window jus to update a date
            $scope.edit = function(data){
              $modal.open({
                    templateUrl: 'myModalContent.html',
                    controller: "ModalCtrl",
                    resolve: {
                      modalData: function() {
                          return {
                              userdata: data
                          }
                      }
                  }

                })
            }
        }

    }
});
customerQ.controller('ModalCtrl',function($scope,$modalInstance, $modal,modalData){
    $scope.customername = modalData.userdata.name;

    $scope.ok = function(){
        console.log($scope.dt);
        $modalInstance.close();
    }
    $scope.cancel = function(){
        $modalInstance.close();
    }
})

customerQ.controller('DatepickerDemoCtrl', function ($scope) {
    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };


    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];




});
