import { useEffect, useState } from "react"

export default function Marketupdate(){
const prices=[
    "AAPL",  
    "MSFT",  
    "GOOGL", 
    "AMZN", "TSLA"
  ]
  const apiKey = "cv9fb89r01qkfpsjhdj0cv9fb89r01qkfpsjhdjg";

  const [det,setdetails]=useState([])
  

  useEffect( ()=>{

const fetchdata = async ()=>{
    const requests = prices.map(symbol => 
        fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`)
          .then(response =>response.json())
          .then(data => ({symbol, ...data }))
        )

          const data = await Promise.all(requests);
          setdetails(data)




}


fetchdata();




  },[])
  

return <div className=" py-16 text-white font-satoshi mt-[-40px]">
    <div className="flex flex-col space-y-8  ustify-center items-center ">


    <div className=" text-3xl  text-wrap "> Market <span className=" text-blue-600"> Overview</span> </div>

<div className=" w-11/12 isolate rounded-xl bg-white/5 shadow-lg ring-1 ring-black/5 rounded-full  p-4 space-y-4">
<div className="overflow-x-auto ml-4 px-4 no-scrollbar  mt-8">
        <table className="min-w-full  border-collapse border-y-2 border-gray-500 border-opacity-40 table-auto">
      
          <tbody>
            {det.map((e, index) => (
              <tr key={index} className="">
              
                <td className="px-4 py-2  border-b-2 border-opacity-40  border-gray-500 border-opacity-4   ">
                    <div className=" flex justify-center items-center space-x-5 md:space-x-10">
                                             <img className=" " src={`/images/${e.symbol}.png`} alt="" /> 
                                        
                            
                    
                    
                                    <img 
                    className="w-8 md:h-8 h-4 "
                      src={e.c > e.pc ? "/images/up.png" : "/images/down.png"} 
                      alt="Stock Trend" 
                    />
                    </div>



                </td>
                <td className="px-4 py-2  border-b-2 border-opacity-40  border-gray-500 border-opacity-4 "> $  {e.c} </td>
                <td className={`px-4 py-2  border-b-2  border-opacity-40  border-gray-500 border-opacity-4 ${e.d >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {e.d}
                </td>
                <td className={`px-4 py-2 border-b-2 border-opacity-40 border-gray-500 border-opacity-4 ${e.dp >= 0 ? "text-green-500" : "text-red-500"}`}>{e.dp}%</td>
             
              </tr>
            ))}
          </tbody>
        </table>
      </div>

</div>




    </div>

</div>


}