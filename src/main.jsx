import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import App from "#/App";
import Form from "#/Form";
import Result from "#/Result";

const router = createBrowserRouter([
	{
		path: "/",
		Component: App,
		children: [
			{
				index: true,
				Component: Form,
			},
			{
				path: "result",
				Component: Result,
			},
		],
	},
]);

const root = createRoot(document.querySelector("body"));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
