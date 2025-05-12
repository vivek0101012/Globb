import { StockContext } from "../context/Stocklistcontext";
import { useContext, useState } from "react";


import { useEffect } from "react";
import { motion,AnimatePresence } from "framer-motion";
import { AnimatedNumber } from "./animatenumber";
import Watch from "./watch";


export default function Sidebarportfolio(){
    const {  Balance } = useContext(StockContext);


    const[expand,setexpand]=useState(false)

    const portfolioOverview = [
        
            
        {
          "title": "Total Investment",
          "value": 15000
        },
        {
          "title": "Current Value",
          "value": 16500
        },
        {
          "title": "Total Profit/Loss",
          "value": 1500
        },
        {
          "title": "Overall Change (%)",
          "value": 10
        },
        {
          "title": "Risk Mode",
          "value": "Moderate"
        },
        {
          "title": "Total Stocks",
          "value": 10
        }
  
    
];


    const newsFeed = [
        "Global Markets Surge as New Tech Giant Emerges",
        "Oil Prices Crash After Unexpected Policy Shift",
        "Major Bank Announces Record-Breaking Profits This Quarter",
        "Breakthrough in AI Technology Disrupts Stock Predictions",
        "New Cryptocurrency Skyrockets 300% in One Day"
      ];
   
      const categories = [
        "Technology",
        "Healthcare",
        "Energy",
        "Finance",
        "Consumer Goods"
      ];
      
   
   return  (<div className="py-4 sm:mt-2 max-h-screen mt-2 font-lemonMilk  text-white/70 rounded-2xl  bg-gray-900">

<div className="flex flex-col md:w-[280px] px-2 py-2 space-y-2 ">




<div className="  bg-gray-950
 border-gray-800 border  
rounded-2xl
  backdrop-blur-md
  hover:scale-105 
  transition-transform duration-300  
  p-2
  
   border-white/10
  flex flex-col space-y-4 md:space-y-4   
  text-white font-satoshi 
  justify-center items-center">
    <div className=" text-center  md:text-3xl text-lg font-semibold">
    <span className="text-blue-500 drop-shadow-[0_0_10px_#3b82f6] shadow-sm hover:drop-shadow-[0_0_20px_#3b82f6]"> Balance</span>
</div>
<div className="space-y-2 text-center">
<p className="bg-gradient-to-r text-xl from-blue-400 to-pink-500 bg-clip-text text-transparent text-3xl font-bold">
  ${Balance.toFixed(2)}
</p>
</div>
<div className="text-center flex">
<p>Total Profit/Loss   </p>
<p className="text-green-500 mx-1">   +$1500 </p>
</div>


<div className="flex items-center space-y-4 justify-center flex-col">

<button className="py-2 px-6 rounded-2xl bg-indigo-700 border-2 border-gray-800 " onClick={()=>setexpand(!expand)
} >  { (expand)?"collapse ":"expand" } </button>



{<AnimatePresence>
 { (expand)?( <motion.div className="w-full duration-300 transition-all  grid md:grid-cols-2 gap-3"
  
    initial={{  opacity: 0 }}
    animate={{  opacity: 1 }}
    transition={{
      duration: 0.5,
      ease: "easeInOut"
    }}
    exit={{  opacity: 0 }}
  layout
  
  >


{
  portfolioOverview.map( (e,index)=>(
<motion.div className=" bg-gray-900 rounded-2xl py-2 px-4 text-center md:hover:scale-105 duration-200 text-white" key={index}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{
    duration: 0.9, // match parent
    ease: "easeInOut",
  }}
>

<p className="text-[8px] text-center">{e.title}</p>
<p className="  opacity-70 text-center text-[12px]">{e.value}</p>

</motion.div>


  ) ,)
}

  </motion.div>   ):<></>}

  </AnimatePresence>
}



</div>
  </div>












</div>


</div>
    )







}