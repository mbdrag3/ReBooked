import BookList from "../components/BookList";
import HotBooks from "../components/HotBooks";
import Cart from "../components/Cart";
import { useEffect, useState } from "react";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState(""); // managing search input
  const [books, setBooks] = useState([]); // storing fetched data
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

  const handleSearch = () => {
    const results = books.filter((book) =>
    book.anem.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(results);
  };

  // Filter books based on the search term
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const results = books.filter((book) =>
      book.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(results);
  }, [searchTerm, books]);


  return (
    <div className="container">
      <HotBooks />

      <div className="search-bar">
        <input
          type="text"
          pleaceholder="search book title..."
          value={ searchTerm }
          onChange={ handleInputChange }
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <BookList filteredBooks={filteredBooks} />
      <Cart />
    </div>
  );
};

export default Home;
