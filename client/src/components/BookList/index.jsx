import { useEffect } from 'react';
import BookItem from '../BookItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_BOOKS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_BOOKS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';


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
      data.allBooks.forEach((book) => {
        idbPromise('books', 'put', book);
      });
    } else if (!loading) {
      idbPromise('books', 'get').then((book) => {
        dispatch({
          type: UPDATE_BOOKS,
          books: book,
        });
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
console.log("Books: ", booksToDisplay);
  return (
    <div className="my-2">
      <h2>Our Books:</h2>
      {booksToDisplay.length ? (
        <div className="flex-row">
          {booksToDisplay.map((book) => (
            <BookItem
              key={book._id}
              _id={book._id}
              image={book.image}
              name={book.name}
              price={book.price}
              quantity={book.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>uh oh, we don't have that in stock right now.</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default BookList;
