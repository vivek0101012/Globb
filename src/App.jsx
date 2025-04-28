
import { lazy,Suspense } from "react"


const Market=  lazy (()=> import ('./components/markepage') )
import Footer from "./components/footer"
import Home from "./components/home"
// import Market from "./components/markepage"
import Marketupdate from "./components/marketupdate"
import Navbar from "./components/navbar"
import Testimonials from "./components/testimonials"
 import { StockProvider } from "./context/Stocklistcontext"
import Loader from "./components/loader"


import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Courses from "./components/courses"
import Portfolio2 from "./components/portfolio2"


function App(){

  return <div className=" font-lemonMilk w-full min-h-screen bg-[#080E1A]">

<StockProvider>
<Router>
<Navbar></Navbar> 
<Routes>


<Route path="/" element={<> <Home /> <Marketupdate />   <Courses/>  <Testimonials /> </> } />



<Route path="/market" element={
  <Suspense fallback={<Loader></Loader> }>

<Market />

  </Suspense>
  
} />

<Route path="/portfolio" element={<Portfolio2 />} />
</Routes>



</Router>

<Footer></Footer>
</StockProvider>


  </div>

}

export default App