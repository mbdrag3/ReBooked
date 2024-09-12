import React,{ useState, useEffect } from 'react';
import './App.css';

function App() {
const [user,setuser] = useState({
username:'',
booklisted:[],
orderHistory:[]
});
useEffect(() => {
  const fetchUserDate = async () => {
    try {
      const response =await axios.get('');
      const data = response.data;
      setUserData ({
        username: data.username, 
        booklisted: databooksListed,
        orderHistory: data.orderHistory
      });
    } catch (error) {
      console.error('There was an error getting user data', error);
    }
  };
  fetchUserDate();
}, []);
return (
  <div className="container">
    <aside className='sidebar'>
      <h2>ReBooked</h2>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#login">Login</a></li>
          <li><a href="#about">About Us</a></li>
        </ul>
      </nav>
    </aside>
    <main className='profile-content'>
      <div className='cart'>
        <button>cart</button>
      </div>
      <div className='username'>
        <h2>{userData.username}'s Profile</h2>
      </div>
      <div className='info-section'> 
        <div className='box'>
          <h3></h3>
          <ul>
          {userData.booksListed.length > 0 ? (
                userData.booksListed.map((book, index) => (
                  <li key={index}>
                    {book.title} - <em>{book.subject}</em>
                  </li>
                ))
              ) : (
                <li>No books listed</li>
              )}
          </ul>
        </div>
        <div className='box'>
          <h3>Order History</h3>
          <ul>
            {userData.orderHistory.length > 0 ?(
              userData.orderHistory.map((order, index) =>(
                <li key={index}>
                  {order.bookTitle}- Order ID: {order.orderID} - Date: {order.date}
                </li>
              ))
            ):(
              <li>No Orders Placed Yet</li>
            )}
          </ul>

        </div>
      </div>
    </main>
  </div>

);
}

export default App
