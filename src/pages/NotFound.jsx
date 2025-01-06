import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex justify-center items-center mt-32">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <h2 className="text-xl mt-4">Page Not Found</h2>
        <p className="mt-4">Sorry, the page you're looking for doesn't exist.</p>
        <div className="mt-8">
          <Link to="/" className="bg-blue-500 text-white px-6 py-2 rounded">
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;