
import { use } from "react";
import { useEffect, useState } from "react";
import { data, Link } from "react-router-dom";
import Loader from "./loader";
import YouTube from "./skeleton";
export  default function  Market(){



  let count=0;

    const stockSymbols = [
      
      "AAPL", "MSFT", "AMZN", "GOOGL", "TSLA", "META", "NVDA", "BRK.B", "JNJ", "JPM",
      "V", "PG", "UNH", "HD", "MA", "PFE", "KO", "DIS", "NFLX", "CRM",
      "INTC", "PYPL", "ABBV", "CSCO", "NKE", "XOM", "WMT", "AMD", "BA", "IBM",
      "PEP", "T", "VZ", "MRK", "ORCL", "CAT", "CVX", "LLY", "COST", "UPS",
      "HON", "TMO", "MDT", "BMY", "DHR", "LIN", "UNP", "GS", "RTX", "ADP",
      "ELV", "SPGI", "ZTS", "AMGN", "C", "ABT", "CB", "MO", "PLD", "DE",
      "AMT", "SCHW", "USB", "SO", "MMC", "TXN", "BKNG", "PGR", "LOW", "GE",
      "BSX", "GILD", "LMT", "FIS", "ADI", "DUOL", "ATVI", "ITW", "MCD", "MAR",
      "MS", "AXP", "SYK", "INTU", "TJX", "REGN", "CME", "WM", "CCI", "F",
      "HUM"
  


      ];
      
      const [sym,setsym]=useState(stockSymbols.slice(0,19))

let currentindex=20;


      const [query, setQuery] = useState(""); 
      
      const [querym, setQuerym] = useState("");
    
const [isloading ,setloading]=useState(false)

    //   const [name,setname]=useState("");

    //   useEffect(()=>{fakff
      
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



useEffect( ()=>{


    const handlescroll =()=>{   if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10){

 if(currentindex+9<=stockSymbols.length){ 
  
  {

    setloading(true)
setTimeout(() => {
  


  {setsym((prev)=>{

    const newarr= stockSymbols.slice(currentindex ,currentindex+9 );
    currentindex+=9;
        return    [...prev,...newarr]
     }
    )}


    setloading (false)
}, 1000);

    
    
  };
  
}

    }
    
    
    }
    
    
    window.addEventListener( "scroll",handlescroll )
    return () => window.removeEventListener("scroll", handlescroll);
     
    
    },[] )
    





    return <div className=" z-0 w-full  flex flex-col space-y-28 items-center text-white  justify-center">





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






(isopen ? <div className=" p-6 rounded-lg border-white border-2 flex flex-col space-y-4 md:space-y-6   text-white font-satoshi justify-center items-center">

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



<div className=" md:text-3xl text-2xl font-semibold">
  Market <span className="text-blue-500 drop-shadow-[0_0_10px_#3b82f6] shadow-sm hover:drop-shadow-[0_0_20px_#3b82f6]">Insight</span>
</div>



 <div className="grid md:grid-cols-4  transition-transform duration-300  grid-cols-1 justify-center gap-10 ">


{
  sym.map((e,index)=>(

<Stockcard key={index} isloading={isloading}  count={index % 9}  symbol={e}></Stockcard>



  ))

    
        

}


{


}

</div>






    </div>















}

export function Stockcard({symbol,count ,isloading}){


    const keys=[ 

"cvbhj19r01qob7udmbdgcvbhj19r01qob7udmbe0"
,

 "cv9fb89r01qkfpsjhdj0cv9fb89r01qkfpsjhdjg"

 ,

 "cvbhjgpr01qob7udmeggcvbhjgpr01qob7udmeh0"
 ,

 "cvbhjopr01qob7udmg80cvbhjopr01qob7udmg8g"
 ,
 "cvbhjv9r01qob7udmhe0cvbhjv9r01qob7udmheg"
 ,

"cvbhk91r01qob7udmjb0cvbhk91r01qob7udmjbg"
,
"cvbhkfhr01qob7udmkggcvbhkfhr01qob7udmkh0"
,
"cvbhkn1r01qob7udmlr0cvbhkn1r01qob7udmlrg"
,
"cvbhlj9r01qob7udmqhgcvbhlj9r01qob7udmqi0"

    ]
const [Card,setcard]=useState({})


// if(count==keys.length){ count=0;}


useEffect (()=>{




const asynfn= async ()=>{





    const res= await  fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${keys[count]}`)
    const rem= await res.json();
    const data=rem;
    setcard(data)


console.log( count)





}



{
  asynfn();
};






} ,[symbol] )




if (Card.pc === undefined || Card.pc === null) {
  return <></>;
}




return ( isloading ?( <YouTube/>):
  (<div className=" hover:scale-105 transition-transform duration-300  p-6 rounded-lg border-white border-2 flex flex-col space-y-4 md:space-y-8   text-white font-satoshi justify-center items-center ">
<div><img src={`https://financialmodelingprep.com/image-stock/${symbol}.png`} className="w-10 h-10" alt="" /></div>

<div className=" text-sm  md:text-lg  flex space-x-2  items-center justify-center"> <h1> Current: ${Card.c ?? "N/A"}  </h1>
                                    <img 
                    className="w-4 h-4 "
                      src={Card.c > Card.pc ? "/images/up.png" : "/images/down.png"} 
                      alt="Stock Trend" 
                    />  </div>
<div className="text-sm  md:text-lg ">Previous Close: ${Card.pc ?? "N/A"}</div>
<div className={` text-sm  md:text-lg  ${Card.c>Card.pc?"text-green-500":"text-red-500"
} ` } >Change: {Card.dp ? `${Card.dp}%` : "N/A"}</div>

<div className=" flex items-center justify-center space-x-4 ">
    <button className= {`px-4 py-2 hover:bg-green-400 transition-all duration-300 text-center rounded-xl active:scale-95  bg-green-600 ${Card.c>Card.pc?"animate-pulse":"" }` }>  Buy</button>
    <button className=  {`px-4 hover:bg-red-400 transition-all duration-300 py-2 text-center rounded-xl active:scale-95  bg-red-600 ${Card.pc>Card.c?"animate-pulse":"" }` }>  Sell</button>
</div>



</div>)





)


}




