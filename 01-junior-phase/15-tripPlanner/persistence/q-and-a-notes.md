## takeaways

Follow up: should I be worried that I don't really know much about AJAX yet (maybe)? And/or should I be worried that everything else confused me?

Short answer: no and no, respectively.

- introduced to AJAX
- visceral understanding that scaling up code is *difficult*
- jquery provides no wrapping / organization, it's just a bunch of tools
- frameworks are probably a good idea
- working with a fullstack application

## how do I know where/if I should make an AJAX request

When you have to communicate between the frontend and backend upon events like clicking or the document loading or the microphone giving back some statement.

If we want to change information on (or get information from) the database without changing what page / url we're at.

Maybe you want to load the view as-soon-as-possible, and shuffle the data into it as you retrieve it (later).

## sequelize magic `through`

Once you've defined an association, what "magic" methods get attached to instances?

- `hasOne`: http://docs.sequelizejs.com/en/v3/api/associations/has-one/
- `belongsTo`: http://docs.sequelizejs.com/en/v3/api/associations/belongs-to/
- `hasMany`: http://docs.sequelizejs.com/en/v3/api/associations/has-many/
- `belongsToMany`: http://docs.sequelizejs.com/en/v3/api/associations/belongs-to-many/

## `include`

Eager joining with include will work if you have the model name:

```js
...
Day.findAll({
  include: [Restaurant]
})
...
```

...unless you've aliased that association.

```js
...
Day.belongsToMany(Restaurant, {through: 'days_restaurants', as: 'placesToEat'});
...
Day.findAll({
  include: [{model: Restaurant, as: 'placesToEat'}]
})
...
```

## defaultScope

```js
...
var Activity = db.define('activity', {
  name: Sequelize.STRING,
  age_range: Sequelize.STRING
}, {
  defaultScope: {
    include: [Place]
  },
  getterMethods: {
    type: function () {
      return 'activity'
    }
  }
});
...
```

The default scope are rules / options to apply to queries *by default*.

So now: `Activity.findAll()` will automatically eagerly load `Place`.

## full stack trace

What happens when a user clicks the plus button next to the restaurants dropdown?

1. Click event fires in browser, click handlers run
2. We have click handler (over in line 44 of public/js/options.js)
3. Get restaurant id from DOM
4. Find the restaurant given the id
5. Attaches a restaurant to the frontend day object
6. Make AJAX call `PUT /api/days/someDayIdHere/restaurants` with that restaurant id in the request body
7. THE WHOLE DANG INTERNET
8. The server receives the request
9. Run through all the app middleware (logging, body parsing, static file serving)
10. Match router on backend for the given request (over on line 76 of routes/api/day.js)
11. Execute database query based on calling `req.day.addRestaurant()` with the given id from the request body
12. Data comes back from that query (assuming success), the server forms and sends a response containing that data
13. THE WHOLE DANG INTERNET (AGAIN)
14. Get a response from our server, on success (assumed) display attraction on DOM using `attraction.show()`
...
15. User sees new restaurant in itinerary list

See here for something outrageously specific: https://github.com/alex/what-happens-when.

## good strategy getting up to speed in a new codebase

See above. Do that exercise! Depth first!

Read comments, READMEs, ask the developers, ritual sacrifice.
