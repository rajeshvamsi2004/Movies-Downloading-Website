import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Five = ({fiv,B}) => {
  const navigate=useNavigate();
  const handle=(movie)=>{
    navigate("/bahu",{state : movie});
  }
  return (
    <div id='Fivediv'>
      {fiv.filter((movie)=>{
        if(B === "")
        {
          return true
        }  
        else if(movie.title.toLowerCase().includes(B.toLowerCase()))
        {
          return true;
        }  
        return false
      }).map((movie,index)=>{
        return(
          <img onClick={()=>handle(movie)} key={index} src={movie.image1} alt="" />
        )
      })

      }
    </div>
  )
}

export default Five;