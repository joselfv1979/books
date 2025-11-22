// import styles from '../assets/scss/aboutPage.module.scss';
// import { EmailIcon, GitHubIcon, LinkedInIcon } from '../components/Icons';

// const About = () => {
//     return (
//         <div className={styles.aboutContainer}>
//             <h1 className='mb-4'>App Stack</h1>

//             <h2>Backend:</h2>
//             <h3 className={styles.items}>Typescript, Node, Express, Mongodb, Mongoose</h3>

//             <h2>Frontend:</h2>
//             <h3 className={styles.items}>Typescript, React, Redux, Bootstrap, Sass</h3>

//             <div className='d-flex gap-4 mt-4'>
//                 <a href='https://github.com/joselfv1979/my-store'><GitHubIcon /></a>
//                 <a href='https://www.linkedin.com/in/jose-luis-fernandez-vicente'><LinkedInIcon /></a>
//                 <a href='mailto:joselfv.1979@gmail.com'><EmailIcon /></a>
//             </div>

//         </div>
//     );
// };

// export default About;

import React from "react";
import { EmailIcon, GitHubIcon, LinkedInIcon } from "../components/Icons"; // ensure these exist

const backend = ["TypeScript", "Node", "Express", "MongoDB", "Mongoose"];
const frontend = ["TypeScript", "React", "Redux", "TailwindCSS", "Vite"];

const About: React.FC = () => {
    return (
        <div className="space-y-12 max-w-4xl mx-auto">
            <header className="text-center space-y-3">
                <h1 className="text-3xl font-semibold tracking-tight">App Stack</h1>
                <p className="text-base text-brand-700">
                    Technologies used to build this library application.
                </p>
            </header>

            <section className="space-y-6">
                <h2 className="text-xl font-semibold">Backend</h2>
                <div className="flex flex-wrap gap-3">
                    {backend.map(t => (
                        <span
                            key={t}
                            className="badge px-4 py-2 text-sm font-medium rounded-md"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-xl font-semibold">Frontend</h2>
                <div className="flex flex-wrap gap-3">
                    {frontend.map(t => (
                        <span
                            key={t}
                            className="badge px-4 py-2 text-sm font-medium rounded-md"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Links</h2>
                <div className="flex gap-6 items-center">
                    <a
                        href="https://github.com/joselfv1979/my-store"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-700 hover:text-brand-900"
                        aria-label="GitHub Repository"
                    >
                        <GitHubIcon />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/jose-luis-fernandez-vicente"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-700 hover:text-brand-900"
                        aria-label="LinkedIn Profile"
                    >
                        <LinkedInIcon />
                    </a>
                    <a
                        href="mailto:joselfv.1979@gmail.com"
                        className="text-brand-700 hover:text-brand-900"
                        aria-label="Send Email"
                    >
                        <EmailIcon />
                    </a>
                </div>
            </section>
        </div>
    );
};

export default About;