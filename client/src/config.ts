export interface Config {
	serverOrigin: string;
}

/** @public */
// shared configuration object
const config = Object.create(null) as Config;

if (process.env.NODE_ENV === "development")
	config.serverOrigin = "http://localhost:8081";

else if (process.env.NODE_ENV === "production")
	throw new Error("Production server isn't set up!");

export default config;
