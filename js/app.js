var app = angular.module('instagramSearchApp', ['ngAnimate'])
  .controller('InstagramSearchController', function($scope, $q, $http) {

    
    function wait(){
      var defer = $q.defer();
      setTimeout(function() {
        defer.resolve();
      }, 1000);
      return defer.promise;
    }

    /* Function to Check if API Notifications are Permitted */
    function notification() {
      return wait().then(function() {
        $scope.showNotification = "";
      });
    }
    
    /* Function to Get Results*/
    $scope.getInstagramResults = function() {
      $scope.hasError = false;
      $scope.results = null;

    /* Warning Message if No Keywords Are Entered by the User */
    if($scope.instasearch.$invalid) {
        $scope.showNotification = "Please Enter A Search Keyword";
        $scope.hasError = true;
        return;
      }

    /* Credentials to Access Instagram */
    var url = 'https://api.instagram.com/v1/tags/'+ $scope.searchTerm +'/media/recent';
    var request = {
        callback: 'JSON_CALLBACK',
        client_id: '40f58b3815c04090b0918afa12312859'
      };

    $http({
        method: 'JSONP',
        url: url,
        params: request
      })

    /* Success Getting Results */
    .success(function(result) {
      notification().then(function() {
          $scope.results = result.data;
          var numberOfResults = $scope.results.length;
          $scope.showNotification = "We've found " + $scope.results.length + " results";
        });
      })

    /* Error Getting Results */
    .error(function(result){
      notification().then(function() {
          $scope.showNotification = "Sorry, We Are Experiencing an Error";
          $scope.hasError = true;
        })
      });
    }; 
  });