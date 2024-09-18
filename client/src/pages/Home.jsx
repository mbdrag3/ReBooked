import BookList from "../components/BookList";
import HotBooks from "../components/HotBooks";
import Cart from "../components/Cart";
import { useEffect, useState } from "react";
import { QUERY_BOOKS_BY_NAME, QUERY_ALL_BOOKS } from "../utils/queries";
import { useLazyQuery, useQuery } from "@apollo/client";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState(""); // managing search input
  const [filteredBooks, setFilteredBooks] = useState([]); // filtered books

  // Fetch all books when the page loads
  const { loading: loadingAllBooks, data: allBooksData } = useQuery(QUERY_ALL_BOOKS);
  
  // Lazy query for searching books by name
  const [getBooksByName, { loading: loadingSearch, data: searchData }] = useLazyQuery(QUERY_BOOKS_BY_NAME);

  // Set filtered books when searchData is received
  useEffect(() => {
    if (searchData && searchData.getBookByName) {
      setFilteredBooks(searchData.getBookByName);
    }
  }, [searchData]);

  // Set all books on initial load
  useEffect(() => {
    if (allBooksData && allBooksData.allBooks) {
      setFilteredBooks(allBooksData.allBooks); // Show all books by default
    }
  }, [allBooksData]);

  const handleSearch = () => {
    if (searchTerm) {
      getBooksByName({ variables: { name: searchTerm } });
    } else {
      setFilteredBooks(allBooksData.allBooks); // Reset to all books if search is cleared
    }
  };

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

      {/* Show loading spinner */}
      {(loadingAllBooks || loadingSearch) && <p>Loading books...</p>}

      {/* Render BookList with filtered books */}
      <BookList filteredBooks={filteredBooks} />

      <Cart />
    </div>
  );
};

export default Home;


// const fetchedBooks = async () => {
//   try {
//     const response = await fetch('/api/books'); //current placeholder, needs to be updated
//     const data = await response.json();
//     setBooks(data);
//     setFilteredBooks(data);
//   } catch (error) {
//     console.error("Error fetching books:", error);
//   }
// };

// Fetch books when the compenent mounts
// useEffect(() => {
//   fetchedBooks();
// }, []);

// const handleSearch = () => {
//   const results = books.filter((book) =>
//   book.anem.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   setFilteredBooks(results);
// };

// // Filter books based on the search term
// const handleInputChange = (event) => {
//   setSearchTerm(event.target.value);
// };

// useEffect(() => {
//   const results = books.filter((book) =>
//     book.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   setFilteredBooks(results);
// }, [searchTerm, books]);