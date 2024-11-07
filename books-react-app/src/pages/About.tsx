import styles from '../assets/scss/globalStyles.module.scss';
import { EmailIcon, GitHubIcon, LinkedInIcon } from '../components/Icons';

const About = () => {
    return (
        <div className={styles.aboutContainer}>
            <h1 className={styles.aboutFont}>App Stack</h1>

            <ul className={styles.aboutFont}>
                <li className='d-flex align-items-center gap-3 m-4'>
                    <h3> Backend:</h3>
                    <h5>Typescript, Node, Express, Mongodb, Mongoose</h5>
                </li>
                <li className='d-flex align-items-center gap-3 m-4'>
                    <h3>Frontend:</h3>
                    <h5>Typescript, React, Redux, Bootstrap, Sass</h5>
                </li>
            </ul>
            <div className='d-flex gap-4'>
                <a href='https://github.com/joselfv1979/my-store'><GitHubIcon /></a>
                <a href='https://www.linkedin.com/in/jose-luis-fernandez-vicente'><LinkedInIcon /></a>
                <a href='mailto:joselfv.1979@gmail.com'><EmailIcon /></a>
            </div>

        </div>
    );
};

export default About;
