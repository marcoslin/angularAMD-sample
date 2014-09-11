define(['rooms/chat_service'], function () {
  'use strict';
  return ['$scope', 'ChatService', function ($scope, ChatService) {
    $scope.message = 'Shows a list of chat rooms';
    $scope.rooms = ChatService.getRooms();
  }];
});
