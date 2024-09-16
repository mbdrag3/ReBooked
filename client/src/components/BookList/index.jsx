import { useEffect } from 'react';
import BookItem from '../BookItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_BOOKS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_BOOKS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';
import NoImage from "../../assets/no-image.jpg"; // Import the fallback image

function BookList({ filteredBooks = [] }) {
  const [state, dispatch] = useStoreContext();
  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_ALL_BOOKS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_BOOKS,
        books: data.allBooks,
      });
    }
  }, [data, loading, dispatch]);

  function filteredBooksByCategory() {
    if (loading || !data) {
      return [];
    }
    if (!currentCategory) {
      return data.allBooks;
    }

    return data.allBooks.filter(
      (book) => book.category._id === currentCategory
    );
  }

  const booksToDisplay = filteredBooksByCategory();

  return (
    <div className="my-2">
      <h2>Our Books:</h2>
      {booksToDisplay.length ? (
        <div className="flex-row">
          {booksToDisplay.map((book) => (
            <BookItem
              key={book._id}
              _id={book._id}
              image={book.image || NoImage} // Use fallback image if book.image is not available
              name={book.name}
              price={book.price}
              quantity={book.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>Uh oh, we don't have that in stock right now.</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default BookList;
