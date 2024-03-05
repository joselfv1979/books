import { User } from '../types/User';
import { useDeleteModalContext } from '../context/deleteModal/DeleteModalContext';
import styles from '../assets/scss/userCard.module.scss';
import { Card, Button } from 'react-bootstrap';

type Props = {
    user: User;
};

const UserCard = ({ user }: Props) => {
    const { setUser, setShowDeleteModal } = useDeleteModalContext();

    const deleteUser = () => {
        setShowDeleteModal(true);
        setUser(user);
    };

    return (
        <Card className={styles.userCard}>
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
