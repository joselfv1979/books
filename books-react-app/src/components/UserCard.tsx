import { Button, Card } from 'react-bootstrap';
import styles from '../assets/scss/userCard.module.scss';
import { useDeleteModalContext } from '../context/deleteModal/DeleteModalContext';
import { User } from '../types/User';
import userImage from './../assets/images/user.svg';

type Props = {
    user: User;
};

const UserCard = ({ user }: Props) => {
    const { setUser, setShowDeleteModal } = useDeleteModalContext();

    const deleteUser = () => {
        setShowDeleteModal(true);
        setUser(user);
    };

    const image = user.imagePath ? `${process.env.REACT_APP_API_URL}/${user.imagePath}` : userImage;

    return (
        <Card className={styles.userCard}>
            <Card.Img variant="top" className={styles.photo} src={image} />
            <Card.Header className={styles.header}>
                <strong>{user.username}</strong>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    <strong>Fullname:</strong> {user.fullname}
                </Card.Text>
                <Card.Text>
                    <strong>Email:</strong> {user.email}
                </Card.Text>
                <div className={styles.buttonGroup}>
                    <Button variant="danger" onClick={deleteUser}>
                        Delete
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default UserCard;
