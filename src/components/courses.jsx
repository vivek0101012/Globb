
import { motion } from "framer-motion";
export default function Courses(){

 
       
  const resources = [
    {
      title: "AvaTrade – Ava Academy",
      description: "Offers free courses covering trading platforms, asset classes, online strategies, and more. Includes interactive videos, quizzes, and certificates for on-the-go learning.",
      url: "https://academy.avatrade.com/courses/",
      image: "avatrade.png"
    },
    {
      title: "Udemy – Free Stock Trading Courses",
      description: "Provides a variety of free stock trading courses taught by real-world experts, featuring easy-to-understand videos and exercises.",
      url: "https://www.udemy.com/topic/stock-trading/free/",
      image: "udemy.png"
    },
    {
      title: "IG Academy – Free Online Trading Courses",
      description: "Offers free webinars and in-person seminars for personal guidance from experts, covering a wide range of trading topics.",
      url: "https://www.ig.com/en/learn-to-trade/ig-academy/courses",
      image: "ig.png"
    },
    {
      title: "Coursera – Online Trading Courses",
      description: "Features a variety of trading courses from top universities. While auditing is free, certificates and graded assignments may require payment.",
      url: "https://www.coursera.org/courses?query=trading",
      image: "coursera.png"
    },
    {
      title: "Angel One – Smart Money Trading Courses",
      description: "Provides in-depth free trading courses covering technical analysis tools, various instruments (equity, commodity, currency), and strategy development.",
      url: "https://www.angelone.in/smart-money/trading-courses",
      image: "angelone.png"
    },
    {
      title: "Khan Academy – Personal Finance & Investing",
      description: "Covers basics of investing, markets, and personal finance. Simple explanations and beginner-friendly format make it a great starting point.",
      url: "https://www.khanacademy.org/college-careers-more/personal-finance",
      image: "khanacademy.png"
    },
    {
      title: "Skillshare – Free Investing Basics",
      description: "Includes beginner-friendly stock and crypto investing classes. Free with trial; many are self-paced and cover practical strategies.",
      url: "https://www.skillshare.com/browse/investing",
      image: "skillshare.png"
    },
    {
      title: "TradingAcademy – Free Trading Lessons",
      description: "Online Trading Academy offers free introductory lessons on professional trading techniques and risk management strategies.",
      url: "https://www.tradingacademy.com/education/online-trading-courses.aspx",
      image: "tradingacademy.png"
    }
  ];
  
 
 
 return (
     <motion.div className="py-16 w-full  "
     
     
     initial={{ opacity: 0 }}
     whileInView={{ opacity: 1 }}
     transition={{ duration: 1 }}
     viewport={{ once: true }}
     >

<h1 className=" text-center text-white mb-4 md:text-2xl"> ONLINE <span className="text-blue-600"> TRADING COURSES</span> </h1>

 <div className="grid md:grid-cols-4 grid-rows-1 overflow-x-auto px-8 gap-4 py-4 ">
 {
     resources.map((e,index)=>
 (
 <div className="flex border-gray-800 hover:scale-105 duration-200 bg-gray-900 scroll-smooth flex-col max-w-[284px]  py-4 border rounded-xl text-white gap-3 px-4 justify-between space-y-2" key={index}>
 
 <img src={e.image} className=" h-[200px] rounded-t-xl " alt="" />
 <div className=" space-y-2">

 <div>{e.title}</div>
 <div className="text-sm opacity-35">{e.description} </div>
 </div>

 <div className="flex space-x-4   items-center">  <div className="text-blue-600">Learn More</div> <a href={e.url}><img src="rightarrow.png" className=" w-10 h-10" alt="" /> </a>  </div>
 </div>
 
 
 )
     ,)
 }
 
 
 </div>
     </motion.div>
 )
 
 
 
 
 
 
 
 
 }