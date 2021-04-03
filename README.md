1. Create `EXPRESS_SESSION_SECRET` environment variable in `server/.env` file (create the file if it doesn't exist)
	```ini
	EXPRESS_SESSION_SECRET="my s@cret!!1"
	```

1. Install and startup the server, let it spin in the background
	```sh
	cd server # relative to the repo root
	npm ci
	npm start
	```

1. Install and startup the client application, let it spin in the background
	```sh
	cd client # relative to the repo root
	npm ci
	npm start
	```

1. Open http://localhost:3000 in your browser of choice

1. Enjoy!
