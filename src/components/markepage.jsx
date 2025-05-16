import { useEffect, useState } from "react";
import YouTube from "./skeleton";
import { StockContext } from "../context/Stocklistcontext";
import { useContext } from "react";
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from "framer-motion";

export  default function  Market(){

  
  const {  addstocks, removestocks, decreasecount,changeBalance } = useContext(StockContext);



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

 if(currentindex+19<=stockSymbols.length){ 
  
  {

    setloading(true)
setTimeout(() => {
  


  {setsym((prev)=>{

    const newarr= stockSymbols.slice(currentindex ,currentindex+9 );
    currentindex+=19;
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
    





    return <AnimatePresence>{<motion.div className=" z-0 w-full  flex flex-col space-y-28 items-center text-white  justify-center"
    
      layout
      
      >
  
  
  
  
  
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
  
  
  
  
  
  
      </motion.div>
  }</AnimatePresence> 














}

const Stockcard = ({symbol, count, isloading}) => {
  const {  addstocks, removestocks,Balance,setBalance , decreasecount,changeBalance } = useContext(StockContext);
  const keys = JSON.parse(import.meta.env.VITE_API_KEYS || "[]");
  const [isBuyPopupOpen, setBuyPopupOpen] = useState(false);
  const { user } = useAuth(); // Add this to get user context

const [Card,setcard]=useState({})
const [quantity, setQuantity] = useState(1);


useEffect (()=>{




const asynfn= async ()=>{





    const res= await  fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${keys[count]}`)
    const rem= await res.json();
    const data=rem;
    setcard(data)







}



{
  asynfn();
};






} ,[symbol] )




if (Card.pc === undefined || Card.pc === null) {
  return <></>;
}

const handleBuy = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/portfolio/buy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.userId,
        productName: symbol,
        price: Card.c,
        quantity: quantity
      })
    });

    const data = await response.json();
    if (data.status) {
      addstocks({ title: symbol });
      changeBalance(-Card.c * quantity);
      setBuyPopupOpen(false);
      setQuantity(1); // Reset quantity after purchase
    }
  } catch (error) {
    console.error('Buy request failed:', error);
  }
};


return  ( isloading ?( <YouTube/>):
  (<motion.div className="  bg-gradient-to-br from-white/10 to-white/5
  backdrop-blur-md
  hover:scale-105 
  transition-transform duration-300  
  p-6 rounded-lg 
  border border-white/10
  shadow-md shadow-white/10
  flex flex-col space-y-4 md:space-y-8   
  text-white font-satoshi 
  justify-center items-center"
  
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    viewport={{ once:false, amount: 0.2 }}
  
  >
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
    <button className= {`px-4 py-2 hover:bg-green-400 transition-all duration-300 text-center rounded-xl active:scale-95  bg-green-600 ${Card.c>Card.pc?"animate-pulse":"" }`   } 
    
    onClick={() => setBuyPopupOpen(true)}
    >  Buy</button>
    <button className=  {`px-4 hover:bg-red-400 transition-all duration-300 py-2 text-center rounded-xl active:scale-95  bg-red-600 ${Card.pc>Card.c?"animate-pulse":"" }` }
    
    onClick={  ()=>{ decreasecount( {title: symbol} ),  changeBalance(Card.pc)  } }

    >  Sell</button>
</div>

{isBuyPopupOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-[#1E293B] p-6 rounded-lg border-2 border-white/20 max-w-md w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Confirm Purchase</h2>
        <button 
          onClick={() => {
            setBuyPopupOpen(false);
            setQuantity(1); // Reset quantity when closing
          }}
          className="text-gray-400 hover:text-white"
        >
          <img src="/images/close.png" className="w-5 h-5" alt="close" />
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Stock:</span>
          <span className="font-semibold">{symbol}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Price per share:</span>
          <span className="font-semibold">${Card.c}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Quantity:</span>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              className="px-2 py-1 bg-gray-600 rounded hover:bg-gray-700"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 px-2 py-1 bg-gray-700 rounded text-center"
            />
            <button 
              onClick={() => setQuantity(prev => prev + 1)}
              className="px-2 py-1 bg-gray-600 rounded hover:bg-gray-700"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between text-lg font-bold text-green-400">
          <span>Total Amount:</span>
          <span>${(Card.c * quantity).toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>User:</span>
          <span className="font-semibold">{user?.email}</span>
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <button
          onClick={() => {
            setBuyPopupOpen(false);
            setQuantity(1); // Reset quantity when canceling
          }}
          className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleBuy}
          className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition-colors"
        >
          Confirm Buy
        </button>
      </div>
    </div>
  </div>
)}

</motion.div>)





)


}




