import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import App from "#/App";

const router = createBrowserRouter([
	{
		path: "/",
		Component: App,
	},
]);

const root = createRoot(document.querySelector("body"));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
