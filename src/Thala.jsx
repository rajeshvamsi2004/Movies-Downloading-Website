import React from "react";
import { IoTerminal } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Thala = ({ V }) => {
  const navigate = useNavigate();

  const handleClick = (movie) => {
    navigate('/bahu', { state: movie });
  };

  const Seventeen = [
    { 
      image1: require("./pics/pos1.jpeg"), 
      year: "2017",
      Type: "Action/Drama",
      Cast: "Prabhas,Anushka,Rana,Tamanna",
      Crew: "Rajamouli,MM.Keeravani,Senthil",
      title: "Baahubali2",
      Trailer: "https://youtu.be/qD-6d8Wo3do?si=qCkhFOcgrXbUPn2h",
      fileId: "1I5ds9dXfq7GOPwxj6CSPT4ecJepq_8Uf"
    },
    { 
      image1: require("./pics/pos2.jpeg"),
      year: "2017",
      Type: "Action/Drama",
      Cast: "Chiranjeevi,Kajal,Ali",
      Crew: "VV Vinayak,DSP",
      title: "Khaidi No 150",
      Trailer: "https://youtu.be/UwYfxVlwy64?si=Bgo8fnmwGv4avpbl"
    },
    { 
      image1: require("./pics/pos3.jpeg"),
      year: "2017",
      Type: "Action/Drama",
      Cast: "Sharwanand,Anupama,PrakashRaj,JayaSudha",
      Crew: "Satish Vegesna,Mickey J. Meyer",
      title: "Shatamanambhavati",
      Trailer: "https://youtu.be/VLN2S6Jk6mQ?si=OQYmXF25SrXlTAKo"
    },
    { 
      image1: require("./pics/pos4.jpeg"),
      year: "2017",
      Type: "Action/Drama",
      Cast: "VijayDevaraKonda,Rahul Ramakrishna,Shalini Pandey",
      title: "Arjun Reddy",
      Trailer: "https://youtu.be/JMU0KE-7FVI?si=eoizsuyqIsTAu4YO"
    },
    { 
      image1: require("./pics/pos5.jpeg"),
      year: "2017",
      Type: "Action/Drama",
      Cast: "Nani,Sai Pallavi,Naresh,Bhumika",
      title: "MCA",
      Trailer: "https://youtu.be/9V0hw6QjzSw?si=cd877KbTdpM4uHRj"
    },
    { 
      image1: require("./pics/pos6.jpeg"),
      year: "2017",
      Type: "Action/Drama",
      Cast: "Varun Tej,Sai Pallavi,Satyam Rajesh",
      Crew: "Sekhar Kamula,Dilraju,Karthick",
      title: "Fidaa",
      Trailer: "https://youtu.be/AVtvjfoXNXc?si=ma8gaOXkHeewqHhX"
    },
    { 
      image1: require("./pics/pos7.jpeg"),
      year: "2017",
      Type: "Action/Drama",
      Cast: "RaviTeja,Mehreen Pirzada,Sampath Raj",
      Crew: "Anil Ravipudi",
      title: "Raja The Great",
      Trailer: "https://youtu.be/o3Liy7yJkHs?si=Qj-IRKI6rTPWlWRx"
    },
    { 
      image1: require("./pics/pos8.jpeg"),
      year: "2017",
      Type: "Action/Drama",
      Cast: "Nani,Keerthy Suresh,Rao Ramesh",
      Crew: "Trinadha Rao,Prasanna Kumar",
      title: "Nenu Local",
      Trailer: "https://youtu.be/lylc7eY6yRU?si=vDsvSbOL_FTeG1Hr"
    },
    {  
      image1: require("./pics/pos9.jpeg"),
      year: "2017",
      Type: "Action/Drama",
      Cast: "Sharwanand,Mehareen Pirzada,Vennela Kishore,Nasser",
      Crew: "Maruthi,S.Thaman",
      title: "MahanuBhavudu",
      Trailer: "https://youtu.be/CxcGYYkxvdE?si=Bxx4bukWS5Zja_Br"
    },
    { 
      image1: require("./pics/pos10.jpeg"), 
      year: "2017",
      Type: "Action/Drama",
      Cast: "Balakrishna,Hema Malini,Kabir Bedi",
      Crew: "RadhaKrishna,Chirantan Bhatt",
      title: "GouthamiPutraShatakarani",
      Trailer: "https://youtu.be/kYxP_WbF2O0?si=RvrTfL2pqn83Dt-E"
    }
  ];

  const filteredMovies = Seventeen.filter((movie) => {
    if (V === "") return true;
    const formattedTitle = movie.title.toLowerCase().replace(/\s/g, "").replace(/[0-9]/g, "no");
    const formattedSearch = V.toLowerCase().replace(/\s/g, "").replace(/[0-9]/g, "no");

    return formattedTitle.includes(formattedSearch);
  })

  return (
    <div id="Thaladiv">
      {filteredMovies.length > 0 ? (
        filteredMovies.map((movie, index) => (
          <img onClick={() => handleClick(movie)} key={index} src={movie.image1} alt={movie.title} />
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default Thala;
