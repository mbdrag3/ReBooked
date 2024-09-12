import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_BOOKS,
} from '../utils/actions';
import { QUERY_ALL_BOOKS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentBook, setCurrentBook] = useState({});

  const { loading, data } = useQuery(QUERY_ALL_BOOKS);

  const { books, cart } = state;

  useEffect(() => {
    // already in global store
    if (books.length) {
      const book = books.find((book) => book._id === id);

      const item = {
        image: book.image,
        name: book.name,
        _id: book._id,
        price: book.price,
        quantity: book.quantity,
      };
      
      setCurrentBook(item);
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_BOOKS,
        books: data.books,
      });

      data.books.forEach((book) => {
        idbPromise('books', 'put', book);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('books', 'get').then((indexedBooks) => {
        dispatch({
          type: UPDATE_BOOKS,
          products: indexedBooks,
        });
      });
    }
  }, [books, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        book: { ...currentBook, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentBook, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentBook._id,
    });

    idbPromise('cart', 'delete', { ...currentBook });
  };

  return (
    <>
      {currentBook && cart ? (
        <div className="container my-1">
          <Link to="/">← Back to Books</Link>

          <h2>{currentBook.name}</h2>

          <p>{currentBook.description}</p>

          <p>
            <strong>Price:</strong>${currentBook.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentBook._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentBook.image}`}
            alt={currentBook.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
