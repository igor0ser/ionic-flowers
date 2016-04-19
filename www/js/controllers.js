angular.module('flowers')

.controller('AddCtrl', function($scope, $rootScope, $state, account) {
  $scope.newFlower = {
    name: '',
    days: '',
    photo: 'img/default-flower.png'
  };


  $scope.add = function(){
    console.log($scope.newFlower);
    account.add($scope.newFlower);
    console.log(account);
    $scope.newFlower.name = '';
    $scope.newFlower.days = '';
    $state.go('tab.flowers');
  };

})

.controller('FlowersCtrl', function($scope, account) {
  $scope.flowers = account.get().flowers;
  $scope.$on('$ionicView.loaded', function() {
    $scope.flowers = account.get().flowers;
  });
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});


  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
