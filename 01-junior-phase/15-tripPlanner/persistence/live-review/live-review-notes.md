## Fullstacktrace

What happens when we click + on the day add button?

1. Click event occurs, handlers for that event fire
2. One handler (the only one) triggers day add function (`addDay`)
3. We send AJAX request `POST /api/days` with body: `{number: nextDayNum}`
4. THE INTERNET
5. Server listening on right port, OS sends request to that port
6. All of our "setup middleware" runs (body parsing, logging, static file serving) (and call `next()`)
7. Router matches incoming post request
8. Sends query to postgres via sequelize `.create` function
9. Receive data from postgres query and send response with it (if it succeeds, if it fails do error handling middleware)
10. THE INTERNET
11. Receive response from server with day data
12. Create day instance on frontend
13. Create new html element (button) with data from this new day
14. Render new button on day buttons panel thing
