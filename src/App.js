import React, { useState } from 'react';
import './App.css';
import Heading from './Heading';
import Search from './Search';
import 'bootstrap/dist/css/bootstrap.min.css';
import Drop from './Drop';
import Lang from './Lang';
import { Sixteen, Fifteen, Eighteen, english, tamil } from './keys';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Thala from './Thala';
import Five from './Five';
import Eight from './Eight';
import Player from './Player';
import Poster1 from './Poster1';
import FrontPage from './FrontPage';
import Year from './Year';
import Login from './Login'
import Signup from './Signup';
import Six from './Six';
// import Speech from './Speech';
import Add from './Add';
import About from './About';
import English from './English';
import Tamil from './Tamil';
// import Buttons from './Buttons';
// import { ContactUs } from './ContactUs';
// import ResetPassword from './ResetPassword';
// import ForgotPassword from './ForgotPassword'
// import SampleLoader from './SampleLoader';
// import ReviewForm from './ReviewForm';






const App = () => {
  const [you, setYou] = useState(Fifteen);
  const [eight, setEight] = useState(Eighteen);
  const [six,setSix]=useState(Sixteen);
  const [en,setEn]=useState(english);
  const [type, setType] = useState('');
  const [prac, setPrac] = useState('');
  const [ta,setTa]=useState(tamil);
  const userEmail = localStorage.getItem("userEmail");
  

  

  return (
    <BrowserRouter> 
      <div className="App">
        <div className="header">
          <HeaderWithSearch type={type} setType={setType} six={six}/>
          <Hidethis/>
        </div>
       <Routes>
          <Route path="/" element={<FrontPage/>} />
          <Route path='/Loginpage' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path="/Year" element={<Year  S={type} E={eight} F={you}/>}/>
          <Route path="/2016" element={<Six aaru={six} sixsearch={type}/>}/>
          <Route path="/2017" element={<Thala userEmail={userEmail}  V={type}  />} />
          <Route path="/2015" element={<Five B={type} fiv={you} />} />
          <Route path="/2018" element={<Eight  J={type} R={eight} />} />
          {/* <Route path="/player" element={<Player />} /> */}
          <Route path="/bahu" element={<Poster1 />} />
          {/* <Route path="/speech" element={<Speech/>}/> */}
          <Route path='/about' element={<About/>}/>
          <Route path='/english' element={<English e={en} et={type}/>}/>
          <Route path='/tamil' element={<Tamil t={ta} tam={type}/>}/>
          
          {/* <Route path='/buttons' element={<Buttons/>}/> */}
          {/* <Route path='/contact' element={<ContactUs/>}/> */}
          {/* <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/reset-password" element={<ResetPassword />} /> */}
          {/* <Route path="/loader" element={<SampleLoader/>}/> */}
          {/* <Route path='/userdata' element={<UserData/>}/>
          <Route path='/userprofile' element={<UserProfile/>}/>
          
          <Route path='/moviedetails' element={<MovieDetails/>}/> */}
          {/* <Route path='/reviewform' element={<ReviewForm/>}/> */}
       </Routes>
      </div>
    </BrowserRouter>
  );
};

const HeaderWithSearch = ({setType, six}) => {
  const location=useLocation();
  const hideHeader = location.pathname === "/" || location.pathname === "/bahu" || location.pathname === "/Loginpage" || location.pathname === "/signup" || location.pathname === "/about"; 
  return (
    <div>
    <>
      {!hideHeader &&  <Heading  path="/head"/> }
      {!hideHeader && <Search allMovies={six} onChange={(e) => setType(e.target.value)} />}
      {!hideHeader && <Drop/>}
      {!hideHeader && <Lang/>}
    </>
    </div>
  );
};
const Hidethis=()=>{
  const locations=useLocation();
  const hidethiss=  locations.pathname==='/Loginpage' || locations.pathname==='/signup' || locations.pathname==='/'
  return(
    <div>
      {!hidethiss && <Add/>}
    </div>
  )
}


export default App

