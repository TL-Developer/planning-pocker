angular.module('planning-pocker').factory('ServiceUsers', function(){
  var users = [];

  var _saveUser = function(user){
    users.push(user);
  };

  var _getUsers = function(){
    return users;
  };

  return {
    saveUser: _saveUser,
    getUsers: _getUsers
  }
});
