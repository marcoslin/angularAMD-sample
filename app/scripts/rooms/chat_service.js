define(['app'], function (app) {
  'use strict';
  app.factory('ChatService', function () {
    // Simulate a service
    return {
      getRooms: function () {
        return 'From chat_service: Here is a list of rooms';
      }
    };
  });
});
