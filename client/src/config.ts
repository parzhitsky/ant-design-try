export interface Config {
	serverOrigin: string;
}

/** @public */
// shared configuration object
const config = Object.create(null) as Config;

config.serverOrigin = "http://localhost:8081";

export default config;
