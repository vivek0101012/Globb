import { StockContext } from "../context/Stocklistcontext";
import { useContext, useState } from "react";


import { useEffect } from "react";
import { motion,AnimatePresence } from "framer-motion";
import { AnimatedNumber } from "./animatenumber";
export default function  Mainportfolio (){
  const { stocks } = useContext(StockContext);
const [holdings,setholdings]=useState([])





const {  Balance } = useContext(StockContext);












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
      



      const apiKey = "cv9fb89r01qkfpsjhdj0cv9fb89r01qkfpsjhdjg";

      const [details,setdetails]=useState([])
      const[expand,setexpand]=useState(false)
    console.log(stocks)
  
      



return <div className=" py-8  text-white items-center  bg-gray-900 rounded-2xl w-full flex flex-col"> 





<div className="    md:text-3xl text-lg font-semibold">
  Portfolio <span className="text-blue-500 drop-shadow-[0_0_10px_#3b82f6] shadow-sm hover:drop-shadow-[0_0_20px_#3b82f6]"> Overview</span>
</div>


 {stocks.length>0 && <div className=" mt-4   isolate rounded-xl bg-gray-950 shadow-lg ring-1 ring-black/5   py-2 text-white font-satoshi ">


    <div className="w-full   ">



<div className=" w-full   text-sm rounded-full ">



<div className="overflow-x-auto    max-h-[340px] overflow-y-scroll px-4 no-scrollbar w-full mt-">
        <table className="min-w-full rounded-xl  overflow-scroll  border-gray-500 border-opacity-40 table-auto">

          <tbody>
            {stocks.map((e, index) => 


<Holdingstable key={index} e={e} ></Holdingstable>)
}
          </tbody>
        </table>
      </div>

</div>




    </div>

</div>

}



</div>






















}


export function Holdingstable({e}){


let symbol=e.title ;
const [data,setdata]=useState({});
const key= "cvbhlj9r01qob7udmqhgcvbhlj9r01qob7udmqi0"
useEffect( 


()=>{
const loaddata= async ()=>{

  const res= await  fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${key}`)
  const rem= await res.json();

  setdata((prev)=>{return {...prev,...rem} });

}

loaddata()
}

  ,[])


console.log(data)
return   <tr className="w-full max-h-[320px] overflow-y-scroll z-10 text-[9px] md:text-sm">
              
<td className="px-4 py-2   border-opacity-40  border-gray-500 border-opacity-4   ">
    <div className=" flex justify-center items-center space-x-5 md:space-x-10">
                        
    <img src={`https://financialmodelingprep.com/image-stock/${symbol}.png`} className="md:w-6 md:h-6" alt="" />
    
    
                    <img 
    className="w-2 md:w-6 md:h-6 h-2 "
      src={data.c > data.pc ? "/images/up.png" : "/images/down.png"} 
      alt="Stock Trend" 
    />
    </div>



</td>
<td className="px-4 py-2    border-opacity-40  border-gray-500 border-opacity-4 "> $  {data.c}  <span>x</span> {e.count} </td>
<td className={`px-4 py-2   border-opacity-40  border-gray-500 border-opacity-4 ${data.d >= 0 ? "text-green-500" : "text-red-500"}`}>
  {data.d}
</td>
<td className={`px-4 py-2  border-opacity-40 border-gray-500 border-opacity-4 ${data.dp >= 0 ? "text-green-500" : "text-red-500"}`}>{data.dp}%</td>
<td className="px-4 py-2   border-opacity-40  border-gray-500 border-opacity-4 "> $  {data.c*e.count} </td>
</tr>



}