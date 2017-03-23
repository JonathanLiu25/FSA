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

## full stack trace

## good strategy getting up to speed in a new codebase
