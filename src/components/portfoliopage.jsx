export default function  Portfolio (){


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
      


return <div className=" py-4 justify-center text-white items-center w-full flex flex-col">



<div className=" md:text-3xl text-2xl font-semibold">
  Portfolio <span className="text-blue-500 drop-shadow-[0_0_10px_#3b82f6] shadow-sm hover:drop-shadow-[0_0_20px_#3b82f6]"> Overview</span>
</div>

<div className=" border p-4  mt-10 rounded-lg grid md:grid-cols-3 grid-cols-1 space-x-5  ">


{ 
portfolioOverview.map((e,index)=>(
    <div className="  flex flex-row  justify-start  mt-[20px] text-white" key={ index}>

 <div> {e.title}</div>
 <div className="text-slate-400"> {e.value}</div>


    </div>
))

}




</div>















</div>










}