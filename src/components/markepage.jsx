
import { use } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export  default function  Market(){

    const sym = [
        "AAPL",  // Apple
        "AMZN",  // Amazon
        "GOOGL", // Alphabet (Google)
        "MSFT",  // Microsoft
        "NVDA",  // Nvidia
        "META",  // Meta (Facebook)
        "NFLX",  // Netflix
        "AMD",   // Advanced Micro Devices
        "INTC",  // Intel
        "BABA",  // Alibaba
        "NIO",   // Nio Inc
        "SPCE",  // Virgin Galactic
        "PLTR",  // Palantir Technologies
        "RIVN",  // Rivian Automotive
        "LCID",  // Lucid Motors
        "ARKK"   // ARK Innovation ETF
      ];





      const [query, setQuery] = useState(""); 
      
      const [querym, setQuerym] = useState("");
    


    //   const [name,setname]=useState("");

    //   useEffect(()=>{
      
    //   const fn= async ()=>{
      
    //       const res= await fetch(`https://api.twelvedata.com/symbol_search?symbol=${symbol}`)
    //       const data= await res.json();
      
    //   setname(data.data[0].instrument_name)
          
    //   }
      
      
    //   fn()
    //   },
      
    //   [])
      
      
      const [isopen,setisopen ]=useState(false)
      
          const apiKey = "cv9fb89r01qkfpsjhdj0cv9fb89r01qkfpsjhdjg";
      const [Card,setcard]=useState({})
      
      useEffect (()=>{
      
      const asynfn= async ()=>{
      
      
      
          const res= await  fetch(`https://finnhub.io/api/v1/quote?symbol=${querym}&token=${apiKey}`)
          const rem= await res.json();
          const data=  await rem;
          setcard(data)
      
      
      
      
      
      
      
      
      }
      asynfn();
      
      
      } ,[querym] )

    
const add = ()=>{
    setQuerym(query);
    setisopen(!isopen)
}

    return <div className=" w-full  flex flex-col space-y-28 items-center text-white  justify-center">





      <div className=" w-full ">

<div className="flex justify-center items-center gap-2 p-4">
  <div className="relative w-full max-w-md">
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Enter NASDAQ ticker (e.g., AAPL, MSFT)"
      className="w-full p-3 pl-5 border border-gray-600 rounded-full 
                 bg-[#1E293B] text-white placeholder-gray-400 shadow-md
                 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
    />
    <button
      className="absolute right-1 top-1/2 -translate-y-1/2 px-5 py-2 
                 bg-blue-600 hover:bg-blue-700 active:scale-95 
                 text-white font-semibold rounded-full shadow-md 
                 transition-all duration-200"
      onClick={add}
    >
      Search
    </button>
  </div>
</div>




</div>


{ 






(isopen ? <div className=" p-6 rounded-lg border-white border-2 flex flex-col space-y-4 md:space-y-8   text-white font-satoshi justify-center items-center">

<div className="w-full flex justify-end " onClick={()=>{ setisopen(!isopen)}}>      <img src="/images/close.png " className="active:scale-95" width={20}  alt="" />  </div>

<div><img src={`https://financialmodelingprep.com/image-stock/${querym}.png`} className="w-10" alt="" /></div>
<div className=" flex space-x-2  items-center justify-center"> <h1> Current: ${Card.c ?? "N/A"}  </h1>
                                    <img 
                    className="w-4 h-4 "
                      src={Card.c > Card.pc ? "/images/up.png" : "/images/down.png"} 
                      alt="Stock Trend" 
                    />  </div>
<div className="">Previous Close: ${Card.pc ?? "N/A"}</div>
<div className={` ${Card.c>Card.pc?"text-green-500":"text-red-500"
} ` } >Change: {Card.dp ? `${Card.dp}%` : "N/A"}</div>

<div className=" flex items-center justify-center space-x-4 ">
    <button className= {`px-4 py-2 text-center rounded-xl active:scale-95  bg-green-500 ${Card.c>Card.pc?"animate-pulse":"" }` }>  Buy</button>
    <button className=  {`px-4 py-2 text-center rounded-xl active:scale-95  bg-red-500 ${Card.pc>Card.c?"animate-pulse":"" }` }>  Sell</button>
</div>


</div>:<></> )



}





<div className=" text-3xl  text-wrap "> Market <span className=" text-blue-600"> Overview</span> </div>


 <div className="grid md:grid-cols-4  grid-cols-1 justify-center gap-10 ">


{
  sym.map((e,index)=>(

<Stockcard key={index} symbol={e}></Stockcard>



  ))

    
        

}

</div>


    </div>















}

export function Stockcard({symbol}){
    const apiKey = "cv9fb89r01qkfpsjhdj0cv9fb89r01qkfpsjhdjg";
const [Card,setcard]=useState({})

useEffect (()=>{

const asynfn= async ()=>{



    const res= await  fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`)
    const rem= await res.json();
    const data=  await rem;
    setcard(data)








}
asynfn();


} ,[symbol] )


if(!Card ){return}

return <div className=" p-6 rounded-lg border-white border-2 flex flex-col space-y-4 md:space-y-8   text-white font-satoshi justify-center items-center ">
<div><img src={`https://financialmodelingprep.com/image-stock/${symbol}.png`} className="w-10 h-10" alt="" /></div>

<div className=" flex space-x-2  items-center justify-center"> <h1> Current: ${Card.c ?? "N/A"}  </h1>
                                    <img 
                    className="w-4 h-4 "
                      src={Card.c > Card.pc ? "/images/up.png" : "/images/down.png"} 
                      alt="Stock Trend" 
                    />  </div>
<div className="">Previous Close: ${Card.pc ?? "N/A"}</div>
<div className={` ${Card.c>Card.pc?"text-green-500":"text-red-500"
} ` } >Change: {Card.dp ? `${Card.dp}%` : "N/A"}</div>

<div className=" flex items-center justify-center space-x-4 ">
    <button className= {`px-4 py-2 text-center rounded-xl active:scale-95  bg-green-500 ${Card.c>Card.pc?"animate-pulse":"" }` }>  Buy</button>
    <button className=  {`px-4 py-2 text-center rounded-xl active:scale-95  bg-red-500 ${Card.pc>Card.c?"animate-pulse":"" }` }>  Sell</button>
</div>


</div>

}







