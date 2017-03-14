## getters/setters alternative syntax

In general, in JS: a getter is something that "hooks into" *acessing* a property, e.g. `obj.prop`. If we have defined a getter on `obj` for `"prop"` that getter will run. A setter is something that hooks into *assigning* a property value, e.g. `obj.prop = whatever`. If we have defined a setter on `obj` for `"prop"` that setter will run.

```js
const obj = {};

var inc = 0;
Object.defineProperty(obj, 'thing', {
  get: function () {
    return inc++;
  },
  set: function (theValueToSet) {
    console.log('would have set', theValueToSet);
  }
});

obj.thing // ~> obj.runGetterFor('thing'); (pseudocode)

obj.thing = 'hello' // ~> obj.runSetterFor('thing', 'hello'); (pseudocode)
```

In sequelize...


One way (virtuals):

```js
...
db.define('person', {
  first_name: {
    type: Sequelize.STRING,
    get: function () { // this property must be call `get` for it to be a "getter"
      const actualValueInDb = this.getDataValue('first_name');
      const upperFirstLetter = actualValueInDb[0].toUpperCase() + actualValueInDb.slice(1).toLowerCase();
      return upperFirstLetter;
    }
  },
  last_name: Sequelize.STRING,
  full_name: {
    type: Sequelize.VIRTUAL, // this means "don't actually store me in the db" just "keep track of me in the JS sequelize model"
    get: function () {
      return this.getDataValue('first_name') + ' ' + this.getDataValue('last_name');
    }
  }
});
...
```

Other way (getter methods):

```js
...
db.define('person', {
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING
}, {
  getterMethods: { // this property has to be called `getterMethods` for it to define "getters"
    full_name: function () {
      return this.getDataValue('first_name') + ' ' + this.getDataValue('last_name');
    },
    first_name: function () {
      const actualValueInDb = this.getDataValue('first_name');
      const upperFirstLetter = actualValueInDb[0].toUpperCase() + actualValueInDb.slice(1).toLowerCase();
      return upperFirstLetter;
    }
  }
});
...
```

Neither of these causes a change in postgres! The database remains the same regardless of getters / setters defined on our sequelize models.

The above are equivalent. The main difference is code style. If we think we're going to want to look at ALL getter methods in one place, it makes sense to use the second option. If we think we're going to want to look at ALL *fields* regardless of being virtual or not, it makes sense to go with first option.

ON THE OTHER HAND: you can have "getters" associated with "non-virtual" fields (see `first_name` stuff above).

## `validate` property in model definition (e.g vs `allowNull`)

When we put properties in `validate` they tend to be "higher level" (i.e. sequelize) validations for that field.

Big list: http://docs.sequelizejs.com/en/v3/docs/models-definition/#validations.

There are validations we put outside of `validate`: `allowNull`, `unique`, and maybe some others. These tend to be "lower level" (i.e. SQL) validations for that field.

## eager loading (in url title route)

It's called "eager loading" because it loads everything right now—as opposed to "lazy loading" which loads data "as-needed" / "piece-by-piece".

```js
router.get('/:urlTitle', function (req, res, next) {

    Page.findOne({
            where: {
                urlTitle: req.params.urlTitle
            },
            // include will only work if we have previously set up an association
            include: [ // triggers a kind of "join"
                {model: User, as: 'author'}
            ]
        })
        .then(function (page) {
            // what does the page object look like
            /*
            {
              title,
              urlTitle,
              content,
              status,
              tags,
              authorId,
              author: { // <= is because of `include`
                email,
                name
              }
            }
            */
            // without `include` above
            /*
            {
              title,
              urlTitle,
              content,
              status,
              tags,
              authorId
            }
            */
            if (page === null) {
                res.status(404).send();
            } else {
                res.render('wikipage', {
                    page: page
                });

            }
        })
        .catch(next);

});
```

## passing object into `.build` or `.create` by order?

It does not. Order should not affect what happens here. And in general, with objects key order is moot.

## what does the first param in `db.define` mean?

It corresponds a model to a table name.

## what does `.sync` do (with `force`?)

When we call `.sync` it will retrieve the model's name (from `db.define`), pluralize it by default, then find or create a table in the database to correspond to that name. It triggers:

```SQL
CREATE TABLE IF NOT EXISTS ... 
```

What does the `force` do? If set to `true`, `.sync` will totally and utterly recreate the tables, by DROPing them and then CREATING. Forced reset! It triggers:

```SQL
DROP TABLE ... 
CREATE TABLE ...
```

It can serve the dark (accidental data deletion) or the light side (can help us redefine the table schema).

If you want to change your schemas without losing data (i.e. this is your production database) check out migrations: http://docs.sequelizejs.com/en/v3/docs/migrations/.

## `getWhatever` and `setWhatever` methods

When you define an association, it brings some named methods along with it. These methods are convenient ways to operate on data regarding this association (e.g. `page.setAuthor`).

## using `setAuthor` or `{... authorId: IDHERE ...}`?

Both should produce equivalent results.

By simply setting `{... authorId: IDHERE ...}`, no need for two round trips to the database.

On the other hand, `setAuthor` is perfectively effective when we're not changing *other* things about that page row. And furthermore, it is more semantic (my opinion). And slightly more abstract:

```js
User.hasOne(Address); // user.setAddress() (even though the foreign key is on the Address table)
Address.belongsTo(User); // address.setUser() (also works)
```

## class methods v instance methods

Class methods we define for functions that operate on many / all / no instances. That is, the function doesn't need to care / know about any *particular* instance (row). For example: `Page.findByTag('foo')` (upper case `p` `Page`) does not relate to any particular page.

Instance methods we define for functions that operate on a particular instance. For example, `page.findSimilar()` (lower case `p` `page`) cares entirely about which particular page we are finding others that are similar to.

What is `this` in either?

When a class method gets invoked, what's it's `this`: the object that invokes it, which is (generally) the class (e.g. `Page`). When an instance methods gets invoked what is it's `this`: the object that invokes it, which (generally) the instance (e.g. `page`).

```js
Page.findSimilar() // what happens? if it invokes properly, the `this` will be `Page` (the class)
// but instead it'll actually error: `Page.findSimilar` is not a function (it is undefined)
```

## `.belongsTo` how does it come up with foreign key name?

For example:

```js
Page.belongsTo(User, {
    as: 'author'
});
```

It takes the alias and adds `id` to it! So here it would be `authorId`. By default, sequelize goes with "camel casing" (camelCasing)—it can be set to other "casing". For example, "snake case" (snake_case). You have to go out of your way to configure it as such.

Where does the `foreignKey` end up? On the pages table: because that is how `belongsTo` works. If instead we had `Page.hasOne(User)` it would put the foreign key on the `User`.

Think pets! So `Pet.belongsTo(Owner)` which means the foreign key owner id, ends up on the pet, LIKE A COLLAR.

## `this` in getters / setters and hooks

In a getter or setter, `this` will generally be the instance.

In a hook, `this` will generally be the class. If you need the instance, the first argument to the hook should be the instance(s).
