## Deployment

- Releasing/share a new version of the application
- Give everyone who wants access to it, access to it
- Web app: put it on the internet
- The server itself is running on some remote computer
  - AWS (Amazon Web Services): 100000 different tools provided by amazon for web development, there's something called EC2 (Elastic Cloud Compute)
  - UDeploy??
  - DigitalOcean
  - Heroku

## With heroku (free)

To get started:

- Setup heroku account
- Install heroku cli stuff

Setup for each project:

- Create a new app
- Make a team or something
- Add the heroku remote locally
- Provision the postgres heroku add-on

To deploy:

- `npm run build`
- `git checkout -b deploy-branch`
- `git add -f public/bundle.js`
- `git commit -m "Whatever you want to say here"`
- `git push -f heroku deploy-branch:master`

...but there's an easier way:

- `npm run build-branch`
- `git checkout that-branch`
- `git push -f heroku that-branch:master`

...but there's an easier way:

- `npm run deploy-heroku`

## Commands that are useful

- `heroku logs ---tail` (in another terminal tab)
- `heroku run bash`, which opens a shell into your remote server

## Hosting

- Buying a domain name
- Pointing it to your deployed server
- The point: to have a named place for your app
- [See more here](https://ryanboland.com/blog/completely-free-easy-to-setup-ssl/)
