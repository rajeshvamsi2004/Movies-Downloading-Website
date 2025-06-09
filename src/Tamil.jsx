import React from 'react'
import { useNavigate } from 'react-router-dom';

const Tamil = ({t,tam}) => {
  const navigate=useNavigate();
  const handle=(movie)=>{
    navigate('/bahu',{state: movie})
      
  }
  

    return (
      <div id="Thaladiv">
        {t.filter((movie) => {
          if (tam === "") {
            return true; 
          } else if (movie.title.toLowerCase().includes(tam.toLowerCase())) {
            return true; 
          }
          return false;
        }).map((movie, index) => (
          <img onClick={() => handle(movie)} key={index} src={movie.image1} alt={movie.title} />
        ))}
      </div>
    );
  };


export default Tamil;
