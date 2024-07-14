import React, { useState, useEffect } from "react";
import '../App.css'; // Ensure Tailwind CSS is configured here
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [items, setItems] = useState([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchData = async (query) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query || "search"}&maxResults=20`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const json = await response.json();
      setItems(json.items || []);
      setDataIsLoaded(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message || "Failed to fetch data");
      setDataIsLoaded(true);
    }
  };

  useEffect(() => {
    fetchData(searchQuery);
  }, [searchQuery]);

  const handleSearch = () => {
    setDataIsLoaded(false);
    setError(null);
    fetchData(searchQuery);
  };

  const handleClick = async (id) => {
    const email = localStorage.getItem('email');
     // Replace with the actual user's email
     console.log(email);
    const date = new Date().toISOString();

    try {
      const response = await fetch('http://localhost:5000/library/api/v1/auth/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, bookId: id, date }),
      });

      if (!response.ok) {
        throw new Error('Failed to borrow book');
      }

      const result = await response.json();
      console.log(result);
      navigate(`/profile`);
    } catch (error) {
      console.error("Error borrowing book:", error);
    }
  };

  if (error) {
    return <div className="text-red-500 text-center mt-5">Error: {error}</div>;
  } else if (!dataIsLoaded) {
    return <div className="text-center mt-5">Loading...</div>;
  } else {
    return (
      <div className="container mx-auto border-2 border-zinc-600">
        <div className="p-4">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold">Search The Books</h1>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Book"
              className="mt-2 p-2 border w-96 border-gray-400 rounded-lg"
            />
            <button
              onClick={handleSearch}
              className="ml-2 p-2 bg-blue-500 text-white rounded-lg w-40">
              Search
            </button>
          </div>
          <div className="flex justify-between">
            <div className="w-1/2 p-2">
              <h2 className="text-xl font-bold mb-2">New Arrivals</h2>
              {items.slice(0, 5).map((item) => (
                <div key={item.id} className="flex mb-4 border-b pb-2">
                  <img
                    src={item.volumeInfo.imageLinks?.thumbnail}
                    alt={item.volumeInfo.title}
                    className="w-16 h-24 mr-4"
                  />
                  <div>
                    <h3 className="font-bold">{item.volumeInfo.title}</h3>
                    <p>{item.volumeInfo.authors?.join(", ")}</p>
                    <p>{item.volumeInfo.publishedDate}</p>
                    <p>{item.volumeInfo.description?.substring(0, 100)}...</p>
                    <button onClick={() => handleClick(item.id)} className="ml-2 p-2 bg-blue-500 text-white rounded-lg w-40">Borrow</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-1/2 p-2">
              <h2 className="text-xl font-bold mb-2">Trending</h2>
              {items.slice(5, 10).map((item) => (
                <div key={item.id} className="flex mb-4 border-b pb-2">
                  <img
                    src={item.volumeInfo.imageLinks?.thumbnail}
                    alt={item.volumeInfo.title}
                    className="w-16 h-24 mr-4"
                  />
                  <div>
                    <h3 className="font-bold">{item.volumeInfo.title}</h3>
                    <p>{item.volumeInfo.authors?.join(", ")}</p>
                    <p>{item.volumeInfo.publishedDate}</p>
                    <p>{item.volumeInfo.description?.substring(0, 100)}...</p>
                    <button onClick={() => handleClick(item.id)} className="ml-2 p-2 bg-blue-500 text-white rounded-lg w-40">Borrow</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
