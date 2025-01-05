import styles from '../assets/scss/aboutPage.module.scss';
import { EmailIcon, GitHubIcon, LinkedInIcon } from '../components/Icons';

const About = () => {
    return (
        <div className={styles.aboutContainer}>
            <h1 className='mb-4'>App Stack</h1>

            <h2>Backend:</h2>
            <h3 className={styles.items}>Typescript, Node, Express, Mongodb, Mongoose</h3>

            <h2>Frontend:</h2>
            <h3 className={styles.items}>Typescript, React, Redux, Bootstrap, Sass</h3>

            <div className='d-flex gap-4 mt-4'>
                <a href='https://github.com/joselfv1979/my-store'><GitHubIcon /></a>
                <a href='https://www.linkedin.com/in/jose-luis-fernandez-vicente'><LinkedInIcon /></a>
                <a href='mailto:joselfv.1979@gmail.com'><EmailIcon /></a>
            </div>

        </div>
    );
};

export default About;
