import BookList from "../components/BookList";
import HotBooks from "../components/HotBooks";
import Cart from "../components/Cart";
import { useEffect, useState } from "react";
import { useLazyQuery } from '@apollo/client';
import SearchBar from "../components/SearchBar/index";
import { QUERY_BOOKS_BY_NAME } from "../utils/queries";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState(""); // managing search input
  const [filteredBooks, setFilteredBooks] = useState([]); // filtered books

  // Commented out for now
  const [getBookByName, { loading, data, error }] =useLazyQuery(QUERY_BOOKS_BY_NAME, {
    variables: { name: searchTerm }
  });

  console.log('test', data)

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (searchTerm) {
      getBookByName();
    }
  };

  useEffect(() => {
    if (data && data.getBookByName) {
      setFilteredBooks(data.getBooksByName);
    }
  }, [data]);

  if (error) return  <p>Error fetching books: {error.message}</p>;

  return (
    <div className="container">
      <HotBooks />

      <SearchBar
      searchTerm={searchTerm}
      handleInputChange={handleInputChange}
      handleSearch={handleSearch}
      />

      <BookList filteredBooks={data?.getBookByName} />
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