import app from "./app";

const port = 8081; // must be 8081, this is currently expected in the client app

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
