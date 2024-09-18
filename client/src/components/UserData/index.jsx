import { useState } from "react";
import WelcomeToProfile from './welcometoprofile'
import OrderHistory from './orderHistory'
import MyDetails from './MyDetails'
import ListedBooks from './ListedBooks'
import './userdata.css'

const UserData = ({ firstName, lastName, email, password, books, orders}) => {
  const [content, setContent]=useState(null);
  console.log("Name: ", firstName);
  console.log("Password: ", password);
  const renderContent = (event) => {
    setContent(event.target.innerHTML);
    }
    
    return (
      <div className="profile-container">
        <div className="sideBar">
        <h3>Hi, {firstName} {lastName}</h3>
          <ul>
          <a><li onClick={()=>renderContent(event)}>My Details</li></a>
          <a ><li onClick={()=>renderContent(event)}>View Orders</li></a>
          <a onClick={()=>renderContent(event)}><li>My Listed Books</li></a>
          </ul>
        </div>
        <div className="content">
      {content === null && <div className="info"><WelcomeToProfile></WelcomeToProfile></div>}  
      {content === 'My Details'  && <div className="info"><MyDetails firstName={firstName} lastName={lastName} email={email} password={password}></MyDetails></div>}
      {content === 'View Orders' && <div className="info"><OrderHistory orders={orders}></OrderHistory></div>}
      {content === 'My Listed Books' && <div className="info"><ListedBooks books={books}></ListedBooks></div>}
    </div>
      </div>
      
    );
    
  };
  export default UserData;