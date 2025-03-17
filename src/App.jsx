import Footer from "./components/footer"
import Home from "./components/home"
import Market from "./components/markepage"
import Marketupdate from "./components/marketupdate"
import Navbar from "./components/navbar"
import Portfolio from "./components/portfoliopage"
import Testimonials from "./components/testimonials"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App(){

  return <div className=" font-lemonMilk w-full min-h-screen bg-[#080E1A]">

<Router>
<Navbar></Navbar> 
<Routes>


<Route path="/" element={<> <Home /> <Marketupdate /> <Testimonials /> </> } />

<Route path="/market" element={<Market />} />
<Route path="/portfolio" element={<Portfolio />} />
</Routes>



</Router>

<Footer></Footer>

  </div>

}

export default App