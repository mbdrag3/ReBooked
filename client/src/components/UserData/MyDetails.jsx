import { useMutation } from "@apollo/client";
import { useState } from "react";
import { UPDATE_USER } from '../../utils/mutations';

    const MyDetails = (props) => { 
      console.log("Props:", props) 
        const [profileData, setProfileData] = useState({
          firstName: props.firstName,
          lastName: props.lastName,
          email: props.email,
          password: props.password
        
        });
        console.log("Profile data: ", profileData)
       const [updateUser]=useMutation(UPDATE_USER);

        const handleChange = (e) => {
          const { name, value } = e.target;
          setProfileData(prevData => ({
            ...prevData,
            [name]: value
          }));
        };
      
        const handleSubmit = (e) => {
          e.preventDefault();
          console.log("profileData: ", profileData)
          const mutationResponse = updateUser({
            variables: {
              firstName: profileData.firstName,
              lastName: profileData.lastName,
              email: profileData.email,
              password: profileData.password
            },
          });
        };

      
        return (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={profileData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={profileData.lastName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={profileData.passwordl}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Save Details</button>
          </form>
        );
      };
      
    export default MyDetails