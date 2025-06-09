import React from 'react'
import { useNavigate } from 'react-router-dom';

const Six = ({aaru,sixsearch}) => {
  const navigate=useNavigate();
  const click=(movie)=>{
    navigate("/bahu",{state: movie});
  }
  return (
    <div id="Thaladiv">
      {aaru.filter((movie)=>{
        if(sixsearch === "")
        {
          return true;
        }  
        else if(movie.title.toLowerCase().includes(sixsearch.toLowerCase()))
        {
           return true;
        }
        return false;  
      })
      .map((movie,index)=>(
        <img onClick={()=>click(movie)} key={index} src={movie.image1} alt="" />
      ))
      }
      
    </div>
  )
}

export default Six
