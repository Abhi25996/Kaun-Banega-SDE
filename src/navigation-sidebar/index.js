import React from "react";
import {Link} from "react-router-dom";
import {useLocation} from "react-router";

const NavigationSidebar = () => {
    const {pathname} = useLocation();
    const paths = pathname.split('/')
    const active = paths[2];
    return (
        <div className="list-group" style={{height:"100vh", background: "darkgray"}}>
            <Link to="/" className={`list-group-item ${active === ''?'active':''}`}>
                Home
            </Link>
            <Link to="/profile" className={`list-group-item ${active === 'profile'?'active':''}`}>
                Profile
            </Link>
            <Link to="/follower" className={`list-group-item ${active === 'follower'?'active':''}`}>
                Followers
            </Link>
            <Link to="/follow" className={`list-group-item ${active === 'follow'?'active':''}`}>
                Follows
            </Link>
            <Link to="/start-quiz" className={`list-group-item ${active === 'quiz'?'active':''}`}>
                Quiz
            </Link>
            <Link to="/my-articles" className={`list-group-item ${active === 'article'?'active':''}`}>
                My Articles
            </Link>
        </div>
    );
};
export default NavigationSidebar;