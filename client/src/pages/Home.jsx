import BookList from "../components/BookList";
import HotBooks from "../components/HotBooks";
import Cart from "../components/Cart";
import { useEffect, useState } from "react";
import { QUERY_BOOKS_BY_NAME } from "../utils/queries";
import { useLazyQuery } from "@apollo/client";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState(""); // managing search input
  const [filteredBooks, setFilteredBooks] = useState([]); // filtered books

  // Commented out for now

  // const fetchedBooks = async () => {
  //   try {
  //     const response = await fetch('/api/PLACEHOLDER'); //current placeholder, needs to be updated
  //     const data = await response.json();
  //     setBooks(data);
  //     setFilteredBooks(data);
  //   } catch (error) {
  //     console.error("Error fetching books:", error);
  //   }
  // };

  // // Fetch books when the compenent mounts
  // useEffect(() => {
  //   fetchedBooks();
  // }, []);

  const [getBooksByName, { loading, data }] = useLazyQuery(QUERY_BOOKS_BY_NAME);


  const handleSearch = () => {
    getBooksByName({ variables: { name: searchTerm } }); 
  };

  if (data && data.getBookByName !== filteredBooks) {
    setFilteredBooks(data.getBookByName);
  }

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value); 
  };

  return (
    <div className="container">
      <HotBooks />

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search book title..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Show loading spinner or message while loading */}
      {loading && <p>Loading books...</p>}

      {/* Render BookList with filtered books */}
      <BookList filteredBooks={filteredBooks} />

      <Cart />
    </div>
  );
};

export default Home;