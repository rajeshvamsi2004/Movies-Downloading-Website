const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movies");
const Movie = require("./models/Movie");

const app = express();
const path = require("path");

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" })); // Allow frontend access
app.use("/pics", express.static(path.resolve(__dirname, "public/pics"))); // ✅ Correct image path
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

// ✅ Route to Get Movie Recommendations
app.get("/recommend", async (req, res) => {
  const movieTitle = req.query.title;
  if (!movieTitle) return res.status(400).json({ error: "Title is required" });

  try {
    // ✅ Find the requested movie
    const movie = await Movie.findOne({ title: { $regex: movieTitle, $options: "i" } });

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    // ✅ Find similar movies based on at least one common field (genre, cast, crew)
    const recommendedMovies = await Movie.find({
      $or: [
        { type: { $in: movie.type } }, // ✅ At least one matching genre
        { cast: { $in: movie.cast } }, // ✅ At least one matching cast member
        { crew: { $in: movie.crew } }  // ✅ At least one matching crew member
      ],
      _id: { $ne: movie._id } // ✅ Exclude the original movie
    }).select("title image type cast crew"); // ✅ Fetch only required fields

    // ✅ Format the response (add full image URL)
    const formattedMovies = recommendedMovies.map((m) => ({
      title: m.title,
      image: m.image ? `http://localhost:5000/pics/${m.image}` : `http://localhost:5000/pics/default.jpeg`
    }));

    console.log("📌 Sending Recommendations:", formattedMovies); // ✅ Debugging
    res.json({ recommended_movies: formattedMovies });

  } catch (error) {
    console.error("❌ Error fetching recommendations:", error);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected Successfully");

    // ✅ Sample Movie Data (For Initial Database Population)
    const moviesData = [
      { title: "Bahubali1", type: ["Action"], cast: ["Prabhas", "Anushka"], crew: ["Rajamouli"], image: "pos11.jpeg" },
      { title: "Srimanthudu", type: ["Action"], cast: ["MaheshBabu", "Shruthi Hassan"], crew: ["KoratalSiva"], image: "pos12.jpeg" },
      { title: "I", type: ["Love"], cast: ["Vikram", "Amy Jackson"], crew: ["Shankar"], image: "pos13.jpeg" },
      { title: "Loafer", type: ["Romance"], cast: ["Varun Tej", "Disha Patani"], crew: ["Puri Jagannadh"], image: "pos14.jpeg" },
      { title: "Surya Vs Surya", type: ["Action"], cast: ["Nikhil", "Tridha Choudhary"], crew: ["Karthik Gattamneni"], image: "pos15.jpeg" },
      { title: "Patas", type: ["Action", "Drama"], cast: ["Kalyan Ram", "Shruti Sodhi"], crew: ["Anil Ravipudi"], image: "pos16.jpeg" },
      { title: "Temper", type: ["Action", "Drama"], cast: ["NTR", "Kajal"], crew: ["Puri Jagannadh"], image: "pos17.jpeg" },
      { title: "Bhale Bhale Magadivoy", type: ["Action"], cast: ["Nani", "Lavanya"], crew: ["Maruthi"], image: "pos18.jpeg" },
      { title: "Son Of Sathyamurthy", type: ["Action"], cast: ["Alluarjun", "Samantha"], crew: ["Trivikram"], image: "pos19.jpeg" },
      { title: "Bruceli", type: ["Action"], cast: ["RamCharan", "Rakul"], crew: ["Sreenu Vaitla"], image: "pos20.jpeg" },
      { 
        image: "pos41.jpeg", 
        type: "Action",
        cast: ["Christian Bale, Aaron Eckhart"],
        crew: ["Christopher Nolan"],
        title: "The Dark Knight",
      },
      { 
        type: "Action",
        cast: ["Sam Worthington, Sigourney Weaver"],
        crew: ["James Cameron"],
        title: "Avatar",
        image: "pos42.jpeg"
      },
      { 
        type: "Action",
        cast: ["Leonardo DiCaprio, Billy Zane"],
        crew: ["James Cameron"],
        title: "Titanic",
        image: "pos43.jpeg"
      },
      { 
        type: "Time Travel",
        cast: "Arnold Schwarzenegger,Michael Biehn",
        crew: "James Cameron",
        title: "Terminator",
        image: "pos44.jpeg"
      },
      { 
        image: "pos45.jpeg",
        type: "Action",
        cast: ["Kevin Bacon, JOsh Brolin"],
        crew: ["Paul Verhoeven"],
        title: "Hollow Man",
      },
      { 
         type: "Adventure",
         cast: ["Dwayne Johnson, Kevin Hart"],
         crew: ["Jake Kasdan"],
         title: "Jumanji",
         image: "pos46.jpeg"
      },
      { 
         image: "pos47.jpeg",
         type: "Epic",
         cast: ["Leonardo DiCaprio, Elliot Page"],
         crew: ["Christopher Nolan"],
         title: "Inception",
      },
      { 
         image: "pos48.jpeg",
         type: "Action",
         cast: ["Lubna Azabal, Maxim Gaudette"],
         crew: ["Denis Villeneuve"],
         title: "Incendies",
      },
      {  
         image: "pos49.jpeg",
         type: "Thriller",
         cast: ["Grace Caroline Currey,Mason Gooding"],
         crew: ["Scott Mann"],
         title: "Fall",
      },
      { 
        image: "pos50.jpeg",
        type: "Action",
        corsast: ["Sam Neill, Jeff Goldblum"],
        crew: ["Stevern Spielberg"],
        title: "Jurassic Park",
      },
      { 
        image: "pos21.jpeg",
        type: "Action",
        cast: "RamCharan,Samantha",
        crew: "Sukumar",
        title: "RangaSthalam",
      },
      { 
        image: "pos22.jpeg",
        type: "Action",
        cast: ["NTR,Pooja,JagapathiBabu"],
        crew: ["Trivikram"],
        title: "AravindaSametha Veera Raghava",
        
      },
      { 
        image: "pos23.jpeg",
        type: "Action",
        cast: ["Mahesh Babu,KiaraAdvani"],
        crew: ["Koratala Shiva"],
        title: "Bharat Ane Nenu",
      },
      { 
        image: "pos24.jpeg",
        type: "Action",
        cast: ["VijayDevaraKonda, Rahul Ramakrishna,Rashmika"],
        crew: ["Parasuram"],
        title: "Geetha Govindam",
      },
      { 
        image: "pos25.jpeg",
        type: "Action",
        cast: ["PawanKalyan,Keerthy Suresh,Anu Emmanuel"],
        crew: ["Trivikram"],
        title: "Agnyathavasi",
      },
      { 
         image: "pos26.jpeg",
         type: "Action",
         cast: ["Keerthy Suresh,Samantha, Vijay,Dulquer Salamaan"],
         crew: "Nag Ashwin",
         title: "Mahanati",
        
      },
      { 
         image : "pos27.jpeg",
         type: "Action",
         cast: ["BalaKrishna,Nayanthara"],
         crew: ["K.S RaviKumar"],
         title: "Jai Simha"
      },
      { 
         image: "pos28.jpeg",
         type: "Action",
         cast: ["AlluArjun,Anu Emmanuel"],
         crew: ["Vakkantham Vamsi"],
         title: "Na Peru Surya Na Illu India",
      },
      {  
         image: "pos29.jpeg",
         type: "Love",
         cast: ["Nani,Nagarjuna"],
         crew: ["Sriram Aditya"],
         title: "Devadasu",
      },
      { 
        image: "pos30.jpeg",
        type: "Action",
        cast: ["Raviteja,Jagapathibabu, Malavika"],
        crew: ["Kalyan Krishna"],
        title: "Nela Ticket",
      },
      { 
        image: "pos1.jpeg", 
        type: "Action/Drama",
        cast: ["Prabhas,Anushka,Rana,Tamanna"],
        crew: ["Rajamouli"],
        title: "Baahubali2",
      },
      { 
        image: "pos2.jpeg",
        type: "Action",
        cast: ["Chiranjeevi,Kajal,Ali"],
        crew: ["VV Vinayak,DSP"],
        title: "Khaidi No 150",
      },
      { 
        image: "pos3.jpeg",
        year: "2017",
        type: "Action",
        cast: ["Sharwanand,Anupama,PrakashRaj,JayaSudha"],
        crew: ["Satish Vegesna,Mickey J. Meyer"],
        title: "Shatamanambhavati",
      },
      { 
        image1: "pos4.jpeg",
        type: "Action",
        cast: ["VijayDevaraKonda,Rahul Ramakrishna,Shalini Pandey"],
        crew: ["Sandeep Reddy Vanga"],
        title: "Arjun Reddy",
      },
      { 
        image: "pos5.jpeg",
        type: "Action",
        cast: ["Nani,Sai Pallavi, Naresh,Bhumika"],
        crew: ["Venu Sri Ram"],
        title: "MCA"
      },
      { 
        image: "pos6.jpeg",
        Type: "Action",
        cast: ["Varun Tej, Sai Pallavi,Satyam Rajesh"],
        crew: ["Sekhar Kamula, Dilraju,Karthick"],
        title: "Fidaa",
      },
      { 
        image: "pos7.jpeg",
        type: "Action",
        cast: ["RaviTeja, Mehreen Pirzada, Sampath Raj"],
        crew: ["Anil Ravipudi"],
        title: "Raja The Great",
      },
      { 
        image: "pos8.jpeg",
        type: "Action",
        cast: ["Nani,Keerthy Suresh, Rao Ramesh"],
        crew: ["Trinadha Rao, Prasanna Kumar"],
        title: "Nenu Local",
      },
      {  
        image: "pos9.jpeg",
        type: "Action",
        cast: ["Sharwanand,Mehareen Pirzada,Vennela Kishore,Nasser"],
        crew: ["Maruthi,S.Thaman"],
        title: "MahanuBhavudu",
      
      },
      { 
        image: "pos10.jpeg",
        type: "Action/Drama",
        cast: ["Balakrishna,Hema Malini,Kabir Bedi"],
        crew: ["RadhaKrishna, Chirantan Bhatt"],
        title: "GouthamiPutraShatakarani",
      },
      { 
        image: "pos31.jpeg",
        type: "Action",
        Cast: ["NTR, Samantha"],
        Crew: ["KoratalSiva"],
        title: "Janatha Garage",
      },
      { 
        image: "pos32.jpeg",
        type: "Action",
        cast: ["Alluarjun,Rakul,Saikumar"],
        crew: ["Boyapati Srinu"],
        title: "Sarrianodu",
      },
      { 
        image: "pos33.jpeg",
        type: "Action",
        cast: ["Karthi,Nagarjuna,Tamannah"],
        crew: ["Vamshi Paidipally"],
        title: "Oopiri",
      },
      { 
        image: "pos34.jpeg",
        type: "Action",
        cast: ["RamCharan,Rakul"],
        crew: ["Surender Reddy"],
        title: "Dhruva",
        
      },
      { 
        image: "pos35.jpeg",
        type: "Action",
        cast: ["NTR,Rakul"],
        crew: ["Sukumar"],
        title: "Nannaku Prematho",
      },
      { 
         image1: "pos36.jpeg",
         type: "Action",
         corsast: ["PawanKalyan,Kajal"],
         crew: ["bobby Kolli"],
         title: "Sardaar Gabbar Singh",
      },
      { 
         image: "pos37.jpeg",
         type: "Action",
         cast: ["Nagarjuna,Lavanya Tripathi,Ramya Krishna"],
         crew: ["Kalyan Krishna"],
         title: "Soggade Chinni Nayana",
      },
      { 
         image: "pos38.jpeg",
         type: "Action",
         cast: ["Nithin,Samantha"],
         crew: ["Trivikram"],
         title: "A Aa",
      },
      {  
        image: "pos39.jpeg",
         
         type: "Action",
         cast: ["Mahesh Babu,Samantha,Kajal"],
         crew: ["Srikanth Addala"],
         title: "Brahmotsavam",
      },
      { 
        image: "pos40.jpeg", 
        type: "Action",
        cast: ["Rana Daggubati, Taapsee Pannu"],
        crew: ["Sankalp Reddy"],
        title: "Ghazi",
        
      }

    ];

    // ✅ Insert/Update Movies in MongoDB
    for (const movie of moviesData) {
      console.log("📌 Inserting movie:", movie); // ✅ Debugging
      await Movie.updateOne(
        { title: movie.title },
        { $set: movie },
        { upsert: true }
      );
    }

    console.log("✅ Movies added successfully!");

    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));
