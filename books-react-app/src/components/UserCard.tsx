import { Button, Card } from 'react-bootstrap';
import userImage from '../assets/images/user.svg';
import styles from '../assets/scss/userCard.module.scss';
import { useDeleteModalContext } from '../context/deleteModal/DeleteModalContext';
import { User } from '../types/User';

const baseUrl = import.meta.env.VITE_API_URL;

type Props = {
    user: User;
};

const UserCard = ({ user }: Props) => {
    const { setUser, setShowDeleteModal } = useDeleteModalContext();

    const deleteUser = () => {
        setShowDeleteModal(true);
        setUser(user);
    };

    const image = user.imagePath ? `${baseUrl}/api/books}/${user.imagePath}` : userImage;

    return (
        <Card className={styles.userCard} data-testid={user.username}>
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
                    <Button variant="danger" data-testid="delete-user-btn" onClick={deleteUser}>
                        Delete
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default UserCard;
