


import { motion } from "framer-motion";

export default function Home(){

return <motion.div className=" py-10  mt-[-10] flex justify-center ">

<div className="relative ">

<div className=" bg-opacity-40 flex-col  text-white font-satoshi flex items-center font-light    justify-center text-center space-y-6">



<div className="absolute top-[35%] left-1/2 w-[250px] h-[120px] bg-blue-500 blur-[100px] opacity-40 rounded-full -translate-x-1/2"></div>

<div className="absolute bottom-[12%] left-1/2 w-24 h-24 bg-blue-500 blur-3xl opacity-30 rounded-full -translate-x-1/2"></div>


<div className="flex justify-center items-center space-x-4">
  <h1 className="md:text-[128px] text-[64px] bg-gradient-to-r 	from-[#00c9ff] via-[#92fe9d] to-[#f6d365] text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(141,173,255,0.6)] font-semibold">
    G
  </h1>

  <h1 className="md:text-[128px] text-[64px] bg-gradient-to-r 	from-[#00c9ff] via-[#92fe9d] to-[#f6d365] text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(141,173,255,0.6)] font-semibold">
    l
  </h1>

  <img
    src="images/logo.png"
    className="animate-pulse md:h-32 md:w-32 h-16 w-16 drop-shadow-[0_0_25px_rgba(144,175,238,0.9)]"
    alt="Logo"
  />

  <h1 className="md:text-[128px] text-[64px] bg-gradient-to-r 	from-[#00c9ff] via-[#92fe9d] to-[#f6d365] text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(141,173,255,0.6)] font-semibold">
    b
  </h1>

  <h1 className="md:text-[128px] text-[64px] bg-gradient-to-r 	from-[#00c9ff] via-[#92fe9d] to-[#f6d365] text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(141,173,255,0.6)] font-semibold">
    b
  </h1>
</div>


<div className="md:text-3xl text-lg text-center text-white font-light leading-snug drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
  Trade without limits, learn without risks.
  <br />
  <span className="text-sm md:text-base text-[#C0C0C0] opacity-70 tracking-wide">
    real-time, and 100% educational.
  </span>
</div>

<div className="flex flex-row items-center justify-center p-4">
  <button className="py-2 px-6 rounded-full text-white border border-[#90AFEE] bg-[#0d1b2a]/50 
    hover:bg-[#90AFEE]/20 backdrop-blur-md shadow-inner shadow-[#90AFEE]/30 
    transition-all duration-200 ease-in-out active:scale-95">
    Get Started
  </button>
</div>




</div>





</div>

</motion.div>





}