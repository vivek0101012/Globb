import { useState } from "react"
import { Link } from "react-router-dom"
export default function  Navbar(){

const [isopen,setisopen ]=useState(false);

return <div className=" w-full p-1 flex flex-col justify-center items-center  font-satoshi text-white text-opacity-50 text-sm font-extralight space-y-1">


<div className=" w-full p-10 flex  justify-center font-satoshi text-white text-opacity-50 text-sm font-extralight space-x-2">



<div className="  bg-gradient-to-br from-[#171F2E]/30 to-[#0A1E42]/30 backdrop-blur-lg border-[0.25px] border-white/10  text-white shadow-lg  rounded-full p-2  flex justify-center items-center  ">



<Link to={"/"}>

<div className=" flex justify-center items-center space-x-4 px-6   ">
<img src="/images/logo.png" className="md:h-[24px] h-4 " alt="" />


<div className=" active:scale-90"> Globb </div>
</div>


</Link>
</div>


<div className=" hidden bg-gradient-to-br font-thin from-[#171F2E]/30 to-[#0A1E42]/30 backdrop-blur-lg border border-white/10  text-white shadow-lg rounded-full md:flex justify-center p-2 space-x-8">

<div className=" flex justify-center space-x-6 px-4 items-center">  

<Link to="/"><div className=" active:scale-90">Home</div></Link>

<Link to="/market"><div className=" active:scale-90">Market</div></Link>
<Link to="/portfolio"><div className=" active:scale-90">Portfolio</div></Link>
<Link to="/trade"><div className=" active:scale-90">Trade</div></Link>


</div>



<div className="  flex rounded-lg justify-center items-center px-2  space-x-4">

<div>Login</div>
<div className="py-2 px-4  flex justify-center  active:scale-90 border-[0.25px]  border-[#90AFEE] opacity-80 shadow-inner  shadow-sm shadow-[#90AFEE] rounded-full  " >signin</div>

</div>




</div>

<div className="  md:hidden bg-gradient-to-br font-thin from-[#171F2E]/30 to-[#0A1E42]/30 backdrop-blur-lg border border-white/10  text-white shadow-lg rounded-full sm:flex flex justify-center items-center p-2 px-2 space-x-4">

<Link to="/"><div className=" active:scale-90">Home</div></Link>

<div>Login</div>
<div className="flex items-center justify-center w-8" onClick={()=>{setisopen(!isopen)} } >
{ isopen? 
          
          <img src="/images/close.png " className="active:scale-95" width={20}  alt="" /> 
      :
        <img src="/images/menu.png " className="active:scale-95" width={20} alt="" /> 

      }


</div>

  </div>


</div>



<div className="w-full flex justify-center mt-[-10] items-center ">{isopen &&< Mobilemenu/>}</div>






</div>







}



export function Mobilemenu(){

return <div className=" w-9/12 bg-gradient-to-br font-thin from-[#171F2E]/30 to-[#0A1E42]/30 backdrop-blur-lg border border-white/10  text-white shadow-lg rounded-lg flex-col sm:flex flex justify-center items-center mt-[-20px] space-y-4 p-4 "> 


<Link to="/"><div className=" active:scale-90">Home</div></Link>

<Link to="/market"><div className=" active:scale-90">Market</div></Link>
<Link to="/portfolio"><div className=" active:scale-90">Portfolio</div></Link>
<Link to="/trade"><div className=" active:scale-90">Trade</div></Link>

<div>Login</div>
<div className="py-2 px-4  flex justify-center items-center active:scale-90 border-[0.25px]  border-[#90AFEE] opacity-80 shadow-inner  shadow-sm shadow-[#90AFEE] rounded-full  " >signin</div>

</div>


}