import { useEffect, useState } from 'react';
import axios from 'axios';
import './About.css'; // Create this file for styling
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const GITHUB_USERNAMES = ['marinautochkina', 'crob127', 'mbdrag3', 'sjean149', 'sabenri']; // Replace with your usernames

function About () {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const requests = GITHUB_USERNAMES.map(username =>
          axios.get(`https://api.github.com/users/${username}`)
        );
        const responses = await Promise.all(requests);
        setProfiles(responses.map(response => response.data));
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) return <p>Loading profiles...</p>;
  if (error) return <p>Error loading profiles: {error.message}</p>;
function RenderButton () {
  if (Auth.loggedIn()) {
   return <button><Link to='/'>Start selling</Link></button>
  } else {
    return <button><Link to='/signup'>Join Us</Link></button>
}}
  return (

    <div className="About">
      <p>Have you recently finished a course or cleaned out your bookshelf and found a stack of old textbooks gathering dust? 
        Why not turn them into cash? At rebooked, we make it easy for you to sell your used textbooks and earn some extra money. 
        Simply list your books with us, and reach a wide audience of students and book lovers eager to buy. 
        It’s a straightforward process with quick payouts and a chance to help others save on their educational materials. 
        Ready to declutter and make some money? Start selling your textbooks today and see how much you can earn!</p>
         <RenderButton></RenderButton> <button>View Demo</button>
     
      <h2>Meet the Team</h2>
      <div className="profiles">
        {profiles.map(profile => (
          <div key={profile.id} className="profile">
            <img src={profile.avatar_url} alt={profile.login} className="avatar" />
            <h3>{profile.name || profile.login}</h3>
            <h4>@{profile.login}</h4>
            <p>{profile.bio}</p>
            <a href={profile.html_url} target="_blank" rel="noopener noreferrer">
              GitHub Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;