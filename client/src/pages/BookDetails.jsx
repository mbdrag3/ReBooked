import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import { useStoreContext } from '../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY, TOGGLE_CART } from '../utils/actions';
import { ADD_COMMENT } from '../utils/mutations'; // Import the mutation
import { idbPromise } from '../utils/helpers';
import { QUERY_BOOKS_BY_ID } from "../utils/queries";
import NoImage from "../assets/no-image.jpg";
import Auth from '../utils/auth';
import Cart from '../components/Cart';  // Ensure Cart is imported here

const BookDetails = () => {
  const { id } = useParams();
  const [commentText, setCommentText] = useState('');
  const [addComment] = useMutation(ADD_COMMENT);

  const { loading, error, data } = useQuery(QUERY_BOOKS_BY_ID, {
    variables: { id }
  });

  const [state, dispatch] = useStoreContext();
  const { cart } = state;

  const toggleCart = () => {
    dispatch({ type: TOGGLE_CART });
  };

  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.getBookById) {
    return <p>No book details available.</p>;
  }

  const { name, author, category, condition, image, price, userId, comment } = data.getBookById;

  const addToCart = () => {
    const _id = data.getBookById._id;
    const bookImage = data.getBookById.image || NoImage; // Use the fallback image here
  
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
  
    if (itemInCart) {
      console.log('Item is already in the cart. Updating quantity.');
  
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
  
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      console.log('Adding new item to the cart.');
  
      dispatch({
        type: ADD_TO_CART,
        book: {
          _id: _id,
          name: data.getBookById.name,
          price: data.getBookById.price,
          quantity: data.getBookById.quantity || 1,
          image: bookImage, // Use the fallback image here
          purchaseQuantity: 1
        }
      });
  
      idbPromise('cart', 'put', {
        _id: _id,
        name: data.getBookById.name,
        price: data.getBookById.price,
        quantity: data.getBookById.quantity || 1,
        image: bookImage, // Use the fallback image here
        purchaseQuantity: 1
      });
    }
  };
  
  
  
  
  


  const handleComment = async () => {
    try {
      const { data } = await addComment({
        variables: { bookId: id, comment: commentText },
        refetchQueries: [{ query: QUERY_BOOKS_BY_ID, variables: { id } }]
      });
      setCommentText('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="book-page">
      <div className="book-content">
        {/* Book Image */}
        <div className="book-image">
          <img src={image || NoImage} alt={name} />
        </div>

        {/* Book Details */}
        <div className="book-details">
          <h1>{name}</h1>
          <p>Author: {author}</p>
          <p>Subject: {category.name}</p>
          <p>Condition: {condition}</p>
          <p>Price: ${price}</p>

          {/* Book Owner */}
          <div className="book-owner">
            <h3>Posted by: {userId.firstName} {userId.lastName}</h3>
            {Auth.loggedIn() ? (
              <div>
                <button onClick={addToCart}>Add to Cart</button>
              </div>
            ) : (
              <p>** Please log in to add your cart. **</p>
            )}
          </div>
        </div>
      </div>
      
      <Cart />
      
      {/* Comments Section */}
      <div className="comments">
        <h3>Comments:</h3>
        {Auth.loggedIn() ? (
          <div>
            <textarea
              placeholder="Write a comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button onClick={handleComment}>Add Comment</button>
          </div>
        ) : (
          <p>** Please log in to add a comment. ** </p>
        )}

        {comment.length > 0 ? (
          <ul>
            {comment.map((c, index) => (
              <li key={index}>
                <strong>{c.userId.firstName}:</strong> {c.comment}
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
