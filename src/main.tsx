import { render } from "preact";
import Router, { Route } from "preact-router";
import { App } from "./App";
import "./index.css";

function Main() {
	return (
		<Router>
			<Route path="/:path*" component={App} />
		</Router>
	);
}

render(<Main />, document.getElementById("app")!);
