import { useState } from "react"
import { motion } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";




export default function  Navbar(){
  const itemRefs = useRef([]);
 
  const [shadowProps, setShadowProps] = useState({ x:20, width: 68 });

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/market", label: "Market" },
    { to: "/portfolio", label: "Portfolio" },

  ];
  const [clickid,setclickid]=useState(0);

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


<div 


className=" relative hidden bg-gradient-to-br font-thin from-[#171F2E]/30 to-[#0A1E42]/30 backdrop-blur-lg border border-white/10  text-white shadow-lg rounded-full md:flex justify-center p-2 space-x-8">


<Hover x={shadowProps.x} width={shadowProps.width}   />




<div className="  flex justify-center space-x-6 px-4 items-center">  


{
  navLinks.map((e,i)=>(
    <div
    key={i}
    ref={(el)=>{itemRefs.current[i]=el}  }

onMouseEnter={ ()=>{
const el= itemRefs.current[i];
if(el){
  const x = el.offsetLeft-40;
  const width = el.offsetWidth;
  setShadowProps({ x, width });
}

}}

onClick={ ()=>{
  setclickid(i);
}}


onMouseLeave={ ()=>{

  const el= itemRefs.current[clickid];
  

  const x = el.offsetLeft-40;
  const width = el.offsetWidth;
  setShadowProps({ x, width });


}}



    className="relative z-10 px-4 py-1 text-white/70 hover:text-white cursor-pointer transition-all"
  >
    <Navitem to={e.to} label={e.label} />
  </div>
  ))
}








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




export function Navitem({to,label}){


  

return <Link to={to}>

<div
   
  
 className="z-10"

>





{label}

</div>











</Link>





}




export function Hover( {x,width}){ 

return  (<motion.div  className=" h-8 w-[32px] z-0 absolute  top-1/4 left-10


rounded-2xl
  rounded-2xl
  bg-gradient-to-br from-blue-500/20 to-blue-700/20
  shadow-xl shadow-blue-600/20
  backdrop-blur-sm
  border border-blue-400/30
   
"



      animate={{ x, width }}
      transition={{ type: "spring", stiffness: 600, damping: 50 }}


>




</motion.div>)


}