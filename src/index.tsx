import ReactDOM from "react-dom/client"
import "./index.css"
import Index from "./pages/Index"
import Callback from "./pages/Callback"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { CookiesProvider } from "react-cookie"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Index />
	},
	{
		path: "/callback",
		element: <Callback />
	}
])
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
	<CookiesProvider>
		<RouterProvider router={router} />
	</CookiesProvider>
)
