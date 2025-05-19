import { useState } from "react";
import Watch from "./watch";


import { motion,AnimatePresence } from "framer-motion";
import { fabClasses } from "@mui/material";
export default function Headerportfolio(){

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
      
   const [close,setclose]= useState(false)
   return  ( <AnimatePresence> <motion.div className={`py-2 duration-200 bg-gray-900 font-lemonMilk m-2 md:w-[24%] ${(close)? "h-[150px]":"max-h-screen "} text-white/70 rounded-2xl  `}
   
   initial={{ opacity: 0 }}
   animate={{ opacity: 1 }}
   exit={{ opacity: 0 }}
   transition={{
     duration: 0.9, // match parent
     ease: "easeInOut",
   }}
   
   >

<div className="flex flex-col   px-4 py-6 space-y-1">

<div className=" py-1 bg-gray-950 border-gray-800 border rounded-2xl">

<Watch/>
</div>


<div className="py-2 px-4 items-center   rounded-full border-gray-800 border  bg-gray-950  flex  space-x-2 ">    

<img src="usericon.png" className="w-6 " alt="" />
<p className="text-sm">User</p>

</div>

{
  (close)? <div className="flex justify-center items-center ">

    <img src={ (close) ? "expand.png" :"close.png"}  onClick={ ()=>{setclose(!close) }} className="w-4" alt="" />
  </div> : ( <AnimatePresence> <motion.div className="flex-col rounded-2xl  border-gray-800 border     py-4 bg-gray-950 px-4 space-y-4"
  
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{
    duration: 0.9, // match parent
    ease: "easeInOut",
  }}
  >

    <p className="font-semibold text-center">News feed </p>
    
    <div className="flex text-sm text-wrap opacity-75 flex-col text-white space-y-2 px-2">
    {
    newsFeed.map((e,index)=>(
    <div className=" text-[12px] px-2 py-1  truncate rounded-full bg-gray-800  " key={index}>
        {e }
    </div>
    ))
    
    }
    
    
    </div>
    
    
    
    
    </motion.div>
    
  
    <motion.div className="flex  rounded-2xl bg-gray-950 px-2  border-gray-800 border   py-4 flex-col space-y-4"
    
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{
      duration: 0.9, // match parent
      ease: "easeInOut",
    }}
    >

    <p className="text-center font-semibold">categories </p>
    
    <div className=" text-white opacity-75  grid grid-cols-2 text-[10px] gap-4">
    {
    categories.map((e,index)=>(
    <div className="  px-1 py-1  text-center  bg-gray-800  rounded-full " key={index}>
       <p className="px-2 truncate py-1"> {e }</p> 
    </div>
    ))
    
    }
    
    
    </div>
    
    </motion.div>

    <div className="flex justify-center items-center ">

<img src= "expand.png"   onClick={ ()=>{setclose(!close) }} className="w-4 rotate-180 duration-150 transition-transform" alt="" />
</div> 

  </AnimatePresence>  
  )
  
}









</div>


</motion.div>
</AnimatePresence>
    )







}