(function () {
  const app = angular.module('mural');

  app.controller('AppCtrl', function AppCtrl($timeout) {
    const vm = this;
    vm.dado = "Eu tenho um controller (objeto JS) que pode ser usado no HTML! :)"
    vm.msg = "oi (vindo do controller)";

    $timeout(function () {
      vm.msg = 'OI!!! (mudado pelo controller)';
    }, 3000);
  });
}());
