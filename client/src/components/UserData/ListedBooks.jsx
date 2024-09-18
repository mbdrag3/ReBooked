const ListedBooks = (props) => {
    console.log("Books props: ", props.books)
    return (   
    <div className="books-container">
     <h2>My books for sale:</h2>
     {props.books.map((book, index) => (
                <div key={idx} className="card px-1 py-1">
                    <Link to={`/books/${book._id}`}>
                      <img
                        alt={book.name}
                        src={`/images/${book.image}`}
                      />
                      <p>{book.name}</p>
                      <p>{book.author}</p>
                    </Link>
                    <div>
                      <span>${book.price}</span>
                    </div>
                </div>
    ))}
    </div>
    )}
    export default ListedBooks