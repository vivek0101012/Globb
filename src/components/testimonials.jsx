/* eslint-disable react/prop-types */
import { useState } from "react";
const testimonials = [
    {
        image: "https://i.ibb.co/GQk9QYNj/1.jpg",
        name: "Aarav Mehta",
        review: "The trading interface is fantastic! The tools are easy to use, and I love the live updates. It's a great platform for both beginners and experienced traders.",
        stars: 3
    },
    {
        image: "https://i.ibb.co/QF4xqCwt/2.jpg",
        name: "Rohan Sharma",
        review: "I’ve tried multiple trading apps, but this one stands out for its speed and ease of use. The real-time updates and detailed analytics make trading more exciting.",
        stars: 4
    },
    {
        image: "https://i.ibb.co/rRVRBCB0/3.jpg",
        name: "Vikram Kapoor",
        review: "Impressive platform! The smooth execution of trades and insightful charts helped me make informed decisions. It’s the best virtual trading experience I’ve had so far.",
        stars: 5
    },
    {
        image: "https://i.ibb.co/XxRKz6wx/4.jpg",
        name: "Neel Khanna",
        review: "Great app, but there could be a bit more guidance for beginners. Overall, it’s a great tool for practicing trades without real financial risk.",
        stars: 2
    },
    {
        image: "https://i.ibb.co/yBYfqCTT/5.jpg",
        name: "Arjun Verma",
        review: "The platform’s user interface is clean, but I feel like I need more advanced tools to analyze the market. Still, it’s a good starting point for virtual trading.",
        stars: 1
    },
    {
        image: "https://i.ibb.co/PsG25Cfg/6.jpg",
        name: "Kabir Malhotra",
        review: "The virtual trading app is great for testing strategies and understanding market trends. I highly recommend it for anyone interested in trading or investing.",
        stars: 4
    },
    {
        image: "https://i.ibb.co/G4M9L86k/7.jpg",
        name: "Ishaan Kaur",
        review: "The app works smoothly, and the real-time simulation is very accurate. It’s been a fantastic way for me to learn about trading before diving into real markets.",
        stars: 3
    }
];



export default function Testimonials() {


  return (
    <div className="text-white flex flex-col wmt-10 items-center justify-center font-playfair">
      <h2 className="text-center mt-8 text-lg font-semibold text-blue-500 ">TESTIMONIALS</h2>
      <h1 className="text-center md:text-3xl text-2xl text-white font-semibold">
        What our Customers say...
      </h1>

     <div className=" flex flex-row w-full mt-4 overflow-x-auto gap-8 px-10 py-4  no-scrollbar scroll-smooth  snap-x snap-mandatory pl-4">
     {
        testimonials.map((e,index)=>(
     
     
     
     <Card reviews={e} key={index} ></Card>
     
     
     
     
           
         ))
     }
     
     
     
     </div>

     
    </div>
  );
}

export function Card({reviews}){

  // eslint-disable-next-line react/prop-types
  const { image, name, review ,stars} = reviews;
 return <div className="   rounded-md h-[300px] border-2 border-gray-600 min-w-[250px]  flex flex-col shadow-lg py-2 px-4  space-y-2   " >

<div className=" w-full flex items-center justify-center">

<img src={image} className=" w-24  rounded-full " alt="" />
</div>

   



     <div className="flex flex-col  px-4 py-2 flex-grow ">
     <h1 className=" text-opacity-70   text-center text-lg text-nowrap "> {name}</h1>
<Stars stars={stars}></Stars>
<div className=" mt-2 px-3">



</div>

     <h1 className=" text-sm text-wrap text-center  opacity-55 "> {review}</h1>

  



   
       
    

    </div>
 


        </div>
}



export function Stars({stars}){
   let  arr = new Array(stars).fill(0)

return <div className="flex flex-row items-center justify-center space-x-3">




{
    arr.map((e,id)=>(
    <div key={id}>
<img src="/images/rating.png" width={20} alt="" />
        </div>
    ))

}

</div>


}