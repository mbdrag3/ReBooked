import { useEffect, useState } from 'react';
import UserData from '../components/UserData/index';
import { HttpLink, useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';


function Profile() {
    const { data, loading, error } = useQuery(QUERY_USER);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error occurred!</p>;
    if (!data) return <p>No data available</p>;
    console.log("User data", data)
    const user=data.user;
    const {firstName, lastName, email, password, books, orders} = user;
    console.log("User email : ", email)
    console.log("User pswd : ", password)
return (
        <main>
          <div className="flex-row justify-center">
            <div className="col-12 col-md-8 mb-3">
              {/* If the data is still loading, render a loading message */}
              {loading ? (
                <div>Loading...</div>
              ) : (
                <UserData firstName={firstName} lastName={lastName} email={email} password={password} books={books} orders={orders}/>
             ) }
            </div>
            
          </div>
        </main>
      );
    };
export default Profile
