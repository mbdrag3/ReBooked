import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from "react-router-dom"
import { QUERY_BOOKS_BY_ID } from "../utils/queries"
import NoImage from "../assets/no-image.jpg"


const BookDetails = ()=> {
    const { id } = useParams()
    console.log(id)

    const { loading, error, data } = useQuery(QUERY_BOOKS_BY_ID, {
        variables: { id }
      });

    if (loading) {
        return <p>Loading...</p>;
    } else if (error) {
        return <p>Error: {error.message}</p>;
    }

    const { name, author, category, condition, image, price, userId, comment } = data.getBookById;

    console.log(name)

    return (
    <div className="book-details">
      {/* Book Image */}
      <img src={image || NoImage} alt={name} />

      {/* Book Info */}
      <h1>{name}</h1>
      <p>Author: {author}</p>
      <p>Category: {category.name}</p>
      <p>Condition: {condition}</p>
      <p>Price: ${price}</p>

      {/* Book Owner */}
      <h3>Uploaded by: {userId.firstName} {userId.lastName}</h3>

      {/* Comments Section */}
      <div className="comments">
        <h3>Comments:</h3>
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