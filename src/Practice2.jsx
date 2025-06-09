import React from 'react';

const Practice2 = ({p}) => {
  const Pract=[{
    heading1:"Rajesh",
    title1:"good boy"
  },
  {
     heading1:"Eshwar",
     title1:"Annoying"
  },
  {
     heading1:"Vamsi",
     title1:"Calm"
  }
  ]
  return (
    <div>
      {Pract.filter((value) => {
        if (p === "") {
          return true;
        } else if (value.title1.toLowerCase().includes(p.toLowerCase())) {
          return true;
        }
        return false; 
      }).map((value, index) =>{
        return(
          <div className='practice2' key={index}>
            <p>{value.title1}</p>
            
          </div>

        )

      }
        
      )}
    </div>
  );
};

export default Practice2;
