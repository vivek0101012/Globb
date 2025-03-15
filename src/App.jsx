import Home from "./components/home"
import Marketupdate from "./components/marketupdate"
import Navbar from "./components/navbar"
import Testimonials from "./components/testimonials"



function App(){

  return <div className=" font-lemonMilk w-full min-h-screen bg-[#080E1A]">

<Navbar></Navbar>
<Home></Home>
<Marketupdate></Marketupdate>
<Testimonials></Testimonials>
  </div>

}

export default App