import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';

const LandingPage: React.FC = () => {
    // const navigate = useNavigate();

    // const handleView = () => navigate(ROUTES.ALL_BOOKS);

    // const services = [
    //     { id: 'prestamo', title: 'Préstamo de Libros', description: 'Disfruta de una amplia colección de libros disponibles para préstamo.' },
    //     { id: 'devoluciones', title: 'Devoluciones', description: 'Devuelve tus libros de manera sencilla y sin complicaciones.' },
    //     { id: 'renovaciones', title: 'Renovaciones', description: 'Renueva el préstamo de tus libros en línea.' }
    // ];

    const features = [
        { title: "Smart Search", desc: "Find books instantly by title, author, genre." },
        { title: "Real-Time Availability", desc: "See copies available before placing a loan." },
        { title: "Personal Dashboard", desc: "Track your active loans and history." },
        { title: "Genre Exploration", desc: "Discover new books by curated categories." },
    ];

    const services = [
        { title: "Loan Management", desc: "Reserve, renew, and return seamlessly." },
        { title: "User Accounts", desc: "Secure access and personalized preferences." },
        { title: "Notifications", desc: "Stay informed about due dates and updates." },
    ];

    return (
        <div className="space-y-20">
            {/* Hero */}
            <section className="pt-10 md:pt-16 text-center space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Your Smart Digital Library
                </h1>
                <p className="max-w-2xl mx-auto text-brand-700 text-sm md:text-base">
                    Browse, borrow, and manage books effortlessly. A clean, fast, and responsive experience
                    designed for readers and administrators.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/books" className="btn btn-primary">Browse Books</Link>
                    <Link to="/login" className="btn btn-outline">Sign In</Link>
                </div>
            </section>

            {/* Features */}
            <section>
                <h2 className="text-2xl font-semibold mb-6 text-center">Core Features</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map(f => (
                        <Card key={f.title} className="space-y-2">
                            <h3 className="text-sm font-semibold">{f.title}</h3>
                            <p className="text-xs text-brand-700 leading-relaxed">{f.desc}</p>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Services */}
            <section>
                <h2 className="text-2xl font-semibold mb-6 text-center">Services</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    {services.map(s => (
                        <Card key={s.title} className="space-y-2">
                            <h3 className="text-sm font-semibold">{s.title}</h3>
                            <p className="text-xs text-brand-700 leading-relaxed">{s.desc}</p>
                        </Card>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="text-center space-y-4">
                <h2 className="text-xl font-semibold">Ready to get started?</h2>
                <p className="text-sm text-brand-700">Create an account or jump straight into browsing.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/login" className="btn btn-primary">Sign In</Link>
                    <Link to="/books" className="btn btn-outline">Explore Collection</Link>
                </div>
            </section>
        </div>
        // <div className="container">
        //     <section id='wellcome' className="row align-items-center justify-content-between mt-5">
        //         <div id="library" className="col-md-5">
        //             <h2>Bienvenido a nuestra Biblioteca</h2>
        //             <p>Gestiona tus préstamos de libros de manera fácil y rápida.</p>
        //             <Button variant="primary" onClick={handleView}>Empieza ahora</Button>
        //         </div>
        //         <div id="library" className="col-md-5 text-center">
        //             <img src={library} alt="Gestión de biblioteca" className="img-fluid rounded shadow" />
        //         </div>
        //     </section>
        //     <section id="services" className="row justify-content-center my-5">
        //         <div className="col-12 text-center">
        //             <h2>Nuestros Servicios</h2>
        //         </div>
        //         <div className="col-12 mt-3">
        //             <div className="row">
        //                 {services.map((service) => (
        //                     <div className="col-md-4 mb-4" key={service.id}>
        //                         <Card className="bg-white p-4 rounded shadow-sm">
        //                             <Card.Body>
        //                                 <Card.Title>{service.title}</Card.Title>
        //                                 <Card.Text>{service.description}</Card.Text>
        //                             </Card.Body>
        //                         </Card>
        //                     </div>
        //                 ))}
        //             </div>
        //         </div>
        //     </section>

        //     <section id="new-books" className='my-5 text-center'>
        //         <div className="container">
        //             <h2>Nuevos Libros</h2>
        //             <Carousel />
        //         </div>
        //     </section>

        //     <section id="contact" className="contact bg-secondary py-5 text-center">
        //         <div className="container">
        //             <h2>Contacto</h2>
        //             <form className="contact-form col-md-6 mx-auto">
        //                 <input type="email" className="form-control mb-3" placeholder="Correo Electrónico" required />
        //                 <textarea className="form-control mb-3" placeholder="Mensaje" rows={5} required></textarea>
        //                 <Button variant="primary" onClick={handleView}>Enviar</Button>
        //             </form>
        //         </div>
        //     </section>
        // </div>
    );
};

export default LandingPage;