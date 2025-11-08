import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-dark text-white text-center py-3 mt-5">
            <div className="container">
                <small>&copy; {new Date().getFullYear()} Digital Library. All rights reserved.</small>
            </div>
        </footer>
    );
};

export default Footer;