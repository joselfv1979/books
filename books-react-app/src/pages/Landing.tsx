import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import library from '../assets/images/library.png';
import Carousel from '../components/Carousel';
import { ROUTES } from '../utils/constants';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    const handleView = () => navigate(ROUTES.ALL_BOOKS);

    const services = [
        { id: 'prestamo', title: 'Préstamo de Libros', description: 'Disfruta de una amplia colección de libros disponibles para préstamo.' },
        { id: 'devoluciones', title: 'Devoluciones', description: 'Devuelve tus libros de manera sencilla y sin complicaciones.' },
        { id: 'renovaciones', title: 'Renovaciones', description: 'Renueva el préstamo de tus libros en línea.' }
    ];

    return (
        <div className="container">
            <section id='wellcome' className="row align-items-center justify-content-between mt-5">
                <div id="library" className="col-md-5">
                    <h2>Bienvenido a nuestra Biblioteca</h2>
                    <p>Gestiona tus préstamos de libros de manera fácil y rápida.</p>
                    <Button variant="primary" onClick={handleView}>Empieza ahora</Button>
                </div>
                <div id="library" className="col-md-5 text-center">
                    <img src={library} alt="Gestión de biblioteca" className="img-fluid rounded shadow" />
                </div>
            </section>
            <section id="services" className="row justify-content-center my-5">
                <div className="col-12 text-center">
                    <h2>Nuestros Servicios</h2>
                </div>
                <div className="col-12 mt-3">
                    <div className="row">
                        {services.map((service) => (
                            <div className="col-md-4 mb-4" key={service.id}>
                                <Card className="bg-white p-4 rounded shadow-sm">
                                    <Card.Body>
                                        <Card.Title>{service.title}</Card.Title>
                                        <Card.Text>{service.description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="new-books" className='my-5 text-center'>
                <div className="container">
                    <h2>Nuevos Libros</h2>
                    <Carousel />
                </div>
            </section>

            <section id="contact" className="contact bg-secondary py-5 text-center">
                <div className="container">
                    <h2>Contacto</h2>
                    <form className="contact-form col-md-6 mx-auto">
                        <input type="email" className="form-control mb-3" placeholder="Correo Electrónico" required />
                        <textarea className="form-control mb-3" placeholder="Mensaje" rows={5} required></textarea>
                        <Button variant="primary" onClick={handleView}>Enviar</Button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;