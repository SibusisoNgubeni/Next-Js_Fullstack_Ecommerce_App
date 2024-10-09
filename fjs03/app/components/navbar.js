"use client";
import { useState, useEffect } from 'react';
import "../globals.css";
import Image from 'next/image';


export default function Navbar({ onSearch }) {
     /** 
      * @type {[boolean, Function]} isVisible - Tracks if the navbar is visible based on scroll direction. 
      */
    const [isVisible, setIsVisible] = useState(true); 
    const [searchQuery, setSearchQuery] = useState("");

    let lastScrollTop = 0;

    /**
     * Handles the scroll event and updates navbar visibility based on scroll direction.
     * If scrolling down, hides the navbar; if scrolling up, shows the navbar.
     * 
     * @function handleScroll
     */
    const handleScroll = () => {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        
        if (currentScrollTop > lastScrollTop) {
            
            setIsVisible(false);
        } else {
            
            setIsVisible(true);
        }

        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; 
    };
    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        onSearch(query);  
    };


     /**
     * Adds a scroll event listener on mount and removes it on unmount.
     * 
     * @useEffect Attaches and cleans up the scroll event listener.
     */
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll); 
        };
    }, []);

    return (
        
        <div className={`navbar ${isVisible ? 'visible' : 'hidden'}`}>
            <div className="logo-img">
                <Image
                src='/assets/planet-5-logo.png'
                alt="Logo" 
                width={200}
                height={70}
                className='logo-img' 
                />
            </div>
            <div className='nav-items'>
                <p className='item'> Comparison</p>
                <p className='item'>Wishlist</p>
                <p className='item'>Cart</p>
                
            </div>
            <div className='signin'>
                
                <p>Signin</p>
                
            </div>
            
        </div>
    );
}
