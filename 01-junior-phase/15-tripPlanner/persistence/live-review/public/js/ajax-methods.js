var ajaxMethodsModule = (function () {
  
  var publicApi = {
    setDayHotel: function (dayId, hotelId) {
      return $.ajax({
        method: 'PUT',
        url: `/api/days/${dayId}`,
        data: {
          hotelId: hotelId
        }
      });
    },
    addDayRestaurant: function (dayId, restaurantId) {
      return $.ajax({
        method: 'POST',
        url: `/api/days/${dayId}/restaurants`,
        data: {
          restaurantId: restaurantId
        }
      });
    },
    addDayActivity: function (dayId, activityId) {
      return $.ajax({
        method: 'POST',
        url: `/api/days/${dayId}/activities`,
        data: {
          activityId: activityId
        }
      });
    }
  };

  return publicApi;

}());
