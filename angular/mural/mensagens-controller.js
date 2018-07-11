(function () {
  const app = angular.module('mural');

  app.controller('MensagensCtrl', function MensagensCtrl() {
    const vm = this;
    vm.mensagens = [
          {autor: "fulano",    texto: "mensagem 1"},
          {autor: "beltrano",  texto: "outra mensagem"},
          {autor: "sicrano",   texto: "terceira mensagem"},
          {autor: "beltrano",  texto: "quarta mensagem"}
        ];
  });
}());
