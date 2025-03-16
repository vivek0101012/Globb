


export default function Footer(){


  const LINKS = [
    {
      title: "Product",
      items: ["Overview", "Features", "Solutions", "Tutorials"],
    },
    {
      title: "Company",
      items: ["About us", "Careers", "Press", "News"],
    },
    {
      title: "Resource",
      items: ["Blog", "Newsletter", "Events", "Help center"],
    },
  ];


    return <div className=" z-30 mt-32 font-playfair     bg-[#131A2C] ">
<div className="flex space-x-2 space-y-4  justify-evenly items-center md:p-4 ">


<div className=" hidden  md:flex flex-col justify-center items-center space-y-2 text-white">

<div className="flex md:justify-center text-white items-center space-x-4">
    <h1 className="  md:text-[64px]"> G</h1>
    <h1 className=" md:text-[64px]"> l</h1>
    <img src="images/logo.png" 
     className="animate-pulse h-16 w-16 drop-shadow-[0_0_10px_rgba(144,175,238,0.8)]" 
     alt="" />
    <h1 className=" md:text-[64px]"> b</h1>
    <h1 className=" md:text-[64px]"> b</h1>

</div>

<div>Your gateway to risk-free trading!</div>

</div>




{
  
LINKS.map((e,index)=>(

  <div className=" text-white flex flex-col space-y-3" key={ index}>

<h1 className="text-[12px]  md:text-lg">  {e.title}</h1>

{e.items.map( (e1,index)=>(
<div key={index} className="flex text-center">
<a href="#" className=" text-opacity-50 text-[10px]  md:text-sm text-slate-200  ">  {e1}</a>

</div>


))




}
  </div>


))



}









</div>


<p className="text-sm mt-2 mb-0 h-10 text-center bg-[#080E1A] flex items-center justify-center text-white text-opacity-70 ">
  &copy; 2025 Globb. All rights reserved.
</p>



    </div>

}




