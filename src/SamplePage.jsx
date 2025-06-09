export default function SamplePage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-gray-800 shadow-lg">
        <h1 className="text-2xl font-bold text-yellow-400">ManaCinema.com</h1>
        <ul className="flex space-x-4">
          <li><a href="#" className="hover:text-yellow-400">Home</a></li>
          <li><a href="#" className="hover:text-yellow-400">Movies</a></li>
          <li><a href="#" className="hover:text-yellow-400">Invest</a></li>
          <li><a href="#" className="hover:text-yellow-400">Contact</a></li>
        </ul>
      </nav>
      
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center p-20 bg-cover bg-center" style={{backgroundImage: "url('/hero-image.jpg')"}}>
        <h2 className="text-4xl font-extrabold">Welcome to ManaCinema</h2>
        <p className="mt-4 text-lg">Stream your favorite movies and explore investment opportunities.</p>
        <button className="mt-6 px-6 py-3 bg-yellow-400 text-black rounded-xl font-semibold hover:bg-yellow-500 transition">Get Started</button>
      </header>
      
      {/* Featured Movies */}
      <section className="p-8">
        <h3 className="text-2xl font-bold text-center">Featured Movies</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <img src="/movie1.jpg" alt="Movie 1" className="rounded-lg" />
            <p className="mt-2 text-center">Movie Title 1</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <img src="/movie2.jpg" alt="Movie 2" className="rounded-lg" />
            <p className="mt-2 text-center">Movie Title 2</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <img src="/movie3.jpg" alt="Movie 3" className="rounded-lg" />
            <p className="mt-2 text-center">Movie Title 3</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <img src="/movie4.jpg" alt="Movie 4" className="rounded-lg" />
            <p className="mt-2 text-center">Movie Title 4</p>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-center p-4 mt-10">
        <p>&copy; 2025 ManaCinema.com. All rights reserved.</p>
      </footer>
    </div>
  );
}
