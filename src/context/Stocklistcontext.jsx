/* eslint-disable react/prop-types */

import { createContext,useState } from "react";
export const StockContext = createContext();



export function  StockProvider ({children}){


    const [stocks,setstocks]=useState([]);

    const addstocks =( element)=>{

console.log(element)
setstocks ((prev)=>{
const found = prev.some((item)=>item.title===element.title);



if(found ){ return   prev.map((e)=> e.title==element.title ?{...e,count:e.count+1 }:e  )   }
else{
    return [...prev, {title:element.title,count:1}]
}



} )


    }





    const removestocks = (element)=>{

setstocks((prev)=>{

return prev.filter( (e)=> e.title!==element.title )

} )
}

const decreasecount=  ( element)=>{

setstocks ( (prev)=>{
    return prev.map( (e)=>
      (  e.title==element.title? {...e,count:e.count-1}:e )    ).filter((ele)=> ele.count>0 )
})

}



return <StockContext.Provider value={{stocks,decreasecount,removestocks,addstocks}   } >

{children}

</StockContext.Provider>


}

