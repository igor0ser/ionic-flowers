angular.module('flowers')

.controller('AddCtrl', function($scope, $rootScope, $state, ls, model) {
  $scope.flower = {
    name: '',
    days: ''
  };

  $scope.add = function(){
    var newFlower = {};
    angular.copy($scope.flower, newFlower);
    newFlower.id = '' + new Date().getTime();
    newFlower.photo = 'img/default-flower.png';
    model.flowers.push(newFlower);
    ls.set(model);
    $scope.flower.name = '';
    $scope.flower.days = '';
    $state.go('tab.flowers');
  };

})

.controller('FlowersCtrl', function($scope, model) {
  console.log(123);
  $scope.flowers = model.flowers;
  $scope.$on('$ionicView.loaded', function() {
    $scope.flowers = model.flowers;
  });
})

.controller('FlowerDetailsController', function($scope, $stateParams, model) {
  for (var i = 0; i < model.flowers.length; i++) {
    if ($stateParams.flowerId == model.flowers[i].id){
      $scope.flower = model.flowers[i];
    }
  }
  $scope.flower.created = new Date(+$scope.flower.id).toLocaleString("ua");
})

.controller('SettingsCtrl', function($scope, model) {
  $scope.time = model.time;
});


  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
