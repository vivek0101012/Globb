import { lazy, Suspense } from "react"
import Register from "./components/backend/register";
import ProtectedRoute from "./components/ProtectedRoute"

const Market=  lazy (()=> import ('./components/markepage') )
import Footer from "./components/footer"
import Home from "./components/home"
import Marketupdate from "./components/marketupdate"
import Navbar from "./components/navbar"
import Testimonials from "./components/testimonials"
import { StockProvider } from "./context/Stocklistcontext"
import Loader from "./components/loader"
import Login from "./components/backend/login"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Courses from "./components/courses"
import Portfolio2 from "./components/portfolio2"
import { AuthProvider } from "./context/AuthContext"
import Profile from "./components/text"
import { PortfolioProvider } from './context/PortfolioContext';

function App() {
  return <div className="font-lemonMilk w-full min-h-screen bg-[#080E1A]">
    <AuthProvider>
      <StockProvider>
        <PortfolioProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<> <Home /> <Marketupdate /> <Courses/> <Testimonials /> </> } />
              
        
              <Route path="/test" element={
                <ProtectedRoute>
                  <Suspense fallback={<Loader />}>
                    <Profile/>
                  </Suspense>
                </ProtectedRoute>
              } />
              
              <Route path="/portfolio" element={
                <ProtectedRoute>
                  <Suspense fallback={<Loader />}>
                    <Portfolio2 />
                  </Suspense>
                </ProtectedRoute>
              } />

              {/* Public Routes */}
              <Route path="/market" element={
                <Suspense fallback={<Loader />}>
                  <Market />
                </Suspense>
              } />
              
              <Route path="/login" element={
                <Suspense fallback={<Loader />}>
                  <Login />
                </Suspense>
              } />
              
              <Route path="/register" element={
                <Suspense fallback={<Loader />}>
                  <Register />
                </Suspense>
              } />
            </Routes>

            <Footer />
          </Router>
        </PortfolioProvider>
      </StockProvider>
    </AuthProvider>
  </div>
}

export default App;