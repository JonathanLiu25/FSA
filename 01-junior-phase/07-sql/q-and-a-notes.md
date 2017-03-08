## Takeaways from this workshop

- What is SQL
- Common operations
- What does it mean for a language to be "declarative"
- Querying can be super slow
- Why it's important, what it gives us (persistence and structured queries)
- Indexing!

## What does the future hold?

- We'll be moving on to use and "ORM" (so JS library in our case) to talk to SQL
- Pratice SQL code wars problems, other problems

## How could this fit into an application?

- We could write sql commands in .sql files
- We could use bash or something to execute those sql files
- Tomorrow: we'll use node-postgres to send SQL queries from our node program to an SQL database, and get that result back into our node program

## SQL and datatypes (coercion)?

Apparently, sort of. Quotes group things, do not necessarily delineate "string" versus "number".

## Performance of SQL queries

- There are tools to help with this
- EXPLAIN to see a query's execution plan, research what different execution details mean

## Indexing

Coming up with a "hidden" table / glossary / grocery-aisle / alphabetical dictionary thing to speed up our queries.

Assigning order, can be faster to search!

Indexes are varied: unique indexes, ordered (sorted) indexes, clustered indexes, text indexes.

Indexes must be constantly updated as information is added / changed.

## Double join?

Yes!

## Errors in SQL

This will get better in Postgres. Also, if we were writing SQL files, the SQL engine (sqlite) might be able to point us to line numbers / characters.

Look into different SQL envrionments.

## Inner join or "implicit join" (might not be the right word), preferred in workforce

I'm not sure. Probably wherever you end up people will have strong feelings about it, but those will vary based on where you go.
