import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Checkout = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const json = await response.json();
        setBook(json);
        setDataIsLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message || "Failed to fetch data");
        setDataIsLoaded(true);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(`Start Date: ${startDate}, End Date: ${endDate}`);
  };

  if (error) {
    return <div className="text-red-500 text-center mt-5">Error: {error}</div>;
  } else if (!dataIsLoaded) {
    return <div className="text-center mt-5">Loading...</div>;
  } else if (book) {
    return (
      <div className="container mx-auto mt-5">
        <h1 className="text-2xl font-bold mb-4">{book.volumeInfo.title}</h1>
        <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} className="mb-4" />
        <p className="mb-2"><strong>Authors:</strong> {book.volumeInfo.authors?.join(", ")}</p>
        <p className="mb-2"><strong>Published Date:</strong> {book.volumeInfo.publishedDate}</p>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
              Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
              End Date:
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    );
  } else {
    return <div>No book details available.</div>;
  }
};

export default Checkout;
