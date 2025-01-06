import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Typewriter } from 'react-simple-typewriter';
import bannerImage1 from "../assets/1.jpg";
import bannerImage2 from "../assets/2.jpg";
import bannerImage3 from "../assets/3.png";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const [latestVisas, setLatestVisas] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Spinner state
  const [isDarkMode, setIsDarkMode] = useState(false); // Track dark mode

  useEffect(() => {
    const fetchLatestVisas = async () => {
      setIsLoading(true); // Start loading
      try {
        const { data } = await axios.get("https://visa-navigator-server-murex.vercel.app/api/visas?limit=6");
        if (Array.isArray(data)) {
          setLatestVisas(data);
        } else {
          console.error("API response is not an array:", data);
          setLatestVisas([]);
        }
      } catch (error) {
        console.error("Error fetching latest visas:", error);
        setLatestVisas([]);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchLatestVisas();
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  // Show spinner while loading latest visas
  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div>
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="absolute top-5 right-40 p-1 bg-gray-800 text-white rounded-full"
      >
        {isDarkMode ? '🌞' : '🌙'} {/* Change icon based on the theme */}
      </button>

      {/* Banner */}
      <div className="banner-slider">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={3000}
        >
          <div>
            <img className="w-full h-56 object-cover md:h-96" src={bannerImage1} alt="Banner 1" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
              <h1 className="text-4xl font-bold">
                <Typewriter
                  words={['Welcome to Visa Navigator']}
                  loop={5} // Number of loops, or `0` for infinite
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </h1>
              <p className="mt-4 text-lg">
                Simplifying your visa applications and tracking process.
              </p>
            </div>
          </div>
          <div>
            <img className="w-full h-56 object-cover md:h-96" src={bannerImage2} alt="Banner 2" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
              <h1 className="text-4xl font-bold">Easy and Secure</h1>
              <p className="mt-4 text-lg">
                Your trusted companion in visa management.
              </p>
            </div>
          </div>
          <div>
            <img className="w-full h-56 object-cover md:h-96" src={bannerImage3} alt="Banner 3" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
              <h1 className="text-4xl font-bold">Track Your Applications</h1>
              <p className="mt-4 text-lg">
                Stay updated with real-time tracking.
              </p>
            </div>
          </div>
        </Carousel>
      </div>

      {/* Latest Visas Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-lg mx-auto px-4 sm:max-w-4xl lg:max-w-6xl lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Latest Visas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestVisas.length > 0 ? (
              latestVisas.slice(0, 6).map((visa) => ( // Ensure only the first 6 visas are displayed
                <div
                  key={visa._id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden dark:bg-gray-800 dark:text-white transition hover:shadow-xl"
                >
                  <img
                    src={visa.countryImage}
                    alt={`Flag of ${visa.country}`}
                    className="h-48 w-full object-cover"
                    loading="lazy" // Lazy load for better performance
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold">{visa.countryName}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{visa.visaType}</p>
                    <p className="text-gray-600 dark:text-gray-400">Fee: ${visa.fee}</p>
                    <p className="text-gray-600 dark:text-gray-400">Validity: {visa.validity}</p>
                    <Link
                      to={`/visa-details/${visa._id}`}
                      className="text-blue-500 hover:underline mt-2 block"
                    >
                      See Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-400 col-span-full">
                No visas available.
              </p>
            )}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/all-visas"
              className="bg-blue-600 text-white px-6 py-2 rounded"
            >
              See All Visas
            </Link>
          </div>
        </div>
      </section>


      {/* Extra Section 1: Benefits */}
      <section className="py-16 bg-blue-100 dark:bg-gray-800 dark:text-white">
        <div className="max-w-lg mx-auto px-4 sm:max-w-4xl lg:max-w-6xl lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why Choose Visa Navigator?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="text-xl font-bold">Easy Application</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                A seamless process to apply for any visa online.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Track Your Status</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Monitor the progress of your applications in real time.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold">24/7 Support</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Our team is available to assist you anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Extra Section 2: Testimonials */}
      <section className="py-16 bg-gray-200  dark:bg-gray-800">
        <div className="max-w-lg mx-auto px-4 sm:max-w-4xl lg:max-w-6xl lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <blockquote className="bg-white shadow-lg rounded-lg p-6">
              <p className="italic">
                Visa Navigator made my visa application process so easy and
                stress-free
              </p>
              <cite className="block mt-4 font-bold text-right">- John Doe</cite>
            </blockquote>
            <blockquote className="bg-white shadow-lg rounded-lg p-6">
              <p className="italic">
                I could track my application every step of the way. Amazing
                service!
              </p>
              <cite className="block mt-4 font-bold text-right">- Jane Smith</cite>
            </blockquote>
            <blockquote className="bg-white shadow-lg rounded-lg p-6">
              <p className="italic">
                Highly recommend Visa Navigator for anyone looking for a smooth
                visa application process.
              </p>
              <cite className="block mt-4 font-bold text-right">
                - Alex Johnson
              </cite>
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;