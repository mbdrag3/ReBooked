import { useEffect } from 'react';
import BookItem from '../BookItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_BOOKS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_BOOKS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function BookList({ filteredBooks = [] }) {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_BOOKS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_BOOKS,
        books: data.books,
      });
      data.books.forEach((book) => {
        idbPromise('books', 'put', book);
      });
    } else if (!loading) {
      idbPromise('books', 'get').then((books) => {
        dispatch({
          type: UPDATE_BOOKS,
          books: books,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filteredBooksByCategory() {
    if (!currentCategory) {
      return state.books;
    }

    return state.books.filter(
      (book) => book.category._id === currentCategory
    );
  }

  const booksToDisplay = filteredBooks.length ? filteredBooks : filteredBooksByCategory();

  return (
    <div className="my-2">
      <h2>Our Books:</h2>
      {state.books.length ? (
        <div className="flex-row">
          {booksToDisplay.map((book) => (
            <BookItemItem
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
