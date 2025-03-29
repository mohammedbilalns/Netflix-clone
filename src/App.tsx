import NavBar from "./components/NavBar"
import { Routes , Route } from "react-router-dom"
import Home from "./pages/Home"
function App() {


	return (

		<>
			<NavBar></NavBar>
			<Routes>
				<Route path="/" element={<Home/>}></Route>
			</Routes>
		</>
	)
}

export default App
