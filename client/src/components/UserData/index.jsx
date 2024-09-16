import { useState } from "react";
import WelcomeToProfile from './welcometoprofile'
import OrderHistory from './orderHistory'
import MyDetails from './MyDetails'
import ListedBooks from './ListedBooks'

const UserData = ({ firstName, lastName, email, password, books, orders}) => {
  const [content, setContent]=useState(null);
  console.log("Name: ", firstName);
  console.log("Password: ", password);
  const renderContent = (event) => {
    setContent(event.target.innerHTML);
    }
    
    return (
      <div className="profile-container">
        <h3>Hi, {firstName} {lastName}</h3>
        <div className="sideBar">
          <ul>
          <a><li onClick={()=>renderContent(event)}>My Details</li></a>
          <a ><li onClick={()=>renderContent(event)}>View Orders</li></a>
          <a onClick={()=>renderContent(event)}><li>My Listed Books</li></a>
          </ul>
        </div>
        <div className="content">
      {content === 'My Details'  && <div><MyDetails firstName={firstName} lastName={lastName} email={email} password={password}></MyDetails></div>}
      {content === 'View Orders' && <div><OrderHistory orders={orders}></OrderHistory></div>}
      {content === 'My Listed Books' && <div><ListedBooks books={books}></ListedBooks></div>}
    </div>
      </div>
      
    );
    
  };
  export default UserData;