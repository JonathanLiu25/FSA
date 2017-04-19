##steps for auth
1) ``` run the seed file```

2) add a google button on the form
3) go to https://console.developers.google.com/iam-admin/projects
4) create a project
5) enable google+ api
6) fill in form - remember you are requesting from your server
7) the redirect URI must be the same as how it is configured in the google/facebook/github strategy:
```http://localhost:1337/api/auth/login/google```
8) create creds
9) create a .my_app_name.env.json in your root directory
10) add port, client id and client secret
11) restart server
12) ????
13) profit

BONUS: a decent walkthrough of [passport local auth - http://toon.io/understanding-passportjs-authentication-flow/

DOUBLE-BONUS: the passportjs docs are authome (awesome, geddit???) - http://passportjs.org/
