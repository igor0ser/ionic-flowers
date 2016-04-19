angular.module('flowers')

.service('account', function($window){
  var KEY = 'my_flowers_list_account_for_ionic_application';
  var _this = this;

  this.add = add;
  this.get = get;
  this.set = set;


  function get(){
    var accountString = $window.localStorage.getItem(KEY);
    if (!accountString) return {
      time: 12,
      flowers: []
    };

    var accountObject = angular.fromJson(accountString);
/*    for (var i = 0; i < flowersObject.items.length; i++){
      flowersObject.items[i].deadline = new Date(profileObject.items[i].deadline);
    }*/
    return accountObject;
  }

  function set(account){
    var accountString = angular.toJson(account);
    $window.localStorage.setItem(KEY, accountString);
  }

  function add(flower){
    var account = _this.get();
    account.flowers.push(flower);
    _this.set(account);
  }



/*  function refresh(){
    $window.localStorage.removeItem(KEY);
    $window.location.reload();
  }*/

});