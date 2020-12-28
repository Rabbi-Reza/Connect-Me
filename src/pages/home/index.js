import React from 'react';
import './style.css';
import { CreatePost, Footer, Navbar } from '../../containers';
import Feed from '../../containers/feed';

export default function Home() {
    return (
        <div className="home">
            <Navbar />
            <CreatePost />
            <Feed />
            <Footer/>
        </div>
    )     
}