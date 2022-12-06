import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import Index from "./pages/Index"
import SpotifyCallback from "./pages/SpotifyCallback"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

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
root.render(<RouterProvider router={router} />)
