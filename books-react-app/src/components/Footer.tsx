import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-dark text-white text-center py-3 mt-5">
            <div className="container">
                <small>&copy; {new Date().getFullYear()} Biblioteca Digital. Todos los derechos reservados.</small>
            </div>
        </footer>
    );
};

export default Footer;