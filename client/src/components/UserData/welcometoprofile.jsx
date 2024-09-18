import React from 'react';
import welcomeImg from '/public/images/welcome.gif';
const WelcomeToProfile = () => {
    const style={
        border: '2px, solid, black',
        width: 500,
        height: 500,
        

    }
    return (   
<div style={style}>
<img src={welcomeImg}></img>
</div>
    ); 
}
export default WelcomeToProfile