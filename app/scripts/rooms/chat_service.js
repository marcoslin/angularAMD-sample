define(['app'], function (app) {
  app.factory("ChatService", function () {
    // Simulate a service
    return {
      getRooms: function () {
        return "Here is a list of rooms";
      }
    };
  })
});
