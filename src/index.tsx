import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import Index from "./pages/Index"
import SpotifyCallback from "./pages/SpotifyCallback"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { CookiesProvider } from "react-cookie"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Index />
	},
	{
		path: "/spotify-callback",
		element: <SpotifyCallback />
	}
])
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
	<CookiesProvider>
		<RouterProvider router={router} />
	</CookiesProvider>
)
