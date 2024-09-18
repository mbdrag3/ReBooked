const OrderHistory = (props) => {
return (   
<div className="orders-container">
 <h3>My orders:</h3>
 {props.orders.map((order, index) => (
        <div key={index} className="order">
        <div>{order.purchaseDate}</div>
            {order.books.map((book,idx) => (
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
        ))}
</div>
); 
}
export default OrderHistory