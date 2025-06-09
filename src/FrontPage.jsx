import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
const FrontPage = () => {
  const navigate = useNavigate();

   useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/Loginpage"); 
    }, 5000);
    

     
   }, [navigate]);

  return (
    <div>
      <img className="Mainimage" src="MovieBackgroundimage.jpeg" alt="" />
      <div className="Loader"></div>
      <h1 className="LH">Loading...</h1>
      
    </div>
  );
};

export default FrontPage;
