import React from 'react'
import { useNavigate } from 'react-router-dom';

const English = ({e,et}) => {
  const navigate=useNavigate();
  const handle=(movie)=>{
    navigate('/bahu',{state: movie})
      
  }
  

    return (
      <div id="Thaladiv">
        {e.filter((movie) => {
          if (et === "") {
            return true; 
          } else if (movie.title.toLowerCase().includes(et.toLowerCase())) {
            return true; 
          }
          return false;
        }).map((movie, index) => (
          <img onClick={() => handle(movie)} key={index} src={movie.image1} alt={movie.title} />
        ))}
      </div>
    );
  };


export default English;
