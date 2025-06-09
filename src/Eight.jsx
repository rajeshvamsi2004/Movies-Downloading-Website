import React from 'react'
import { useNavigate } from 'react-router-dom';

const Eight = ({R,J}) => {
  const navigate=useNavigate();
  const handle=(movie)=>{
    navigate('/bahu',{state: movie})
      
  }
  

    return (
      <div id="Thaladiv">
        {R.filter((movie) => {
          if (J === "") {
            return true; 
          } else if (movie.title.toLowerCase().includes(J.toLowerCase())) {
            return true; 
          }
          return false;
        }).map((movie, index) => (
          <img onClick={() => handle(movie)} key={index} src={movie.image1} alt={movie.title} />
        ))}
      </div>
    );
  };


export default Eight;
