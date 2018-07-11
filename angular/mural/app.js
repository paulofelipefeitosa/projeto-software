(function () {
  const app = angular.module('mural', []);

  app.controller('UserCtrl', function UserCtrl() {
    const vm = this;
    vm.age = 15;
    vm.height = 1.70;
  });
}());
