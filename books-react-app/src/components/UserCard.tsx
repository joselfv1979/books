import React from 'react';
import { IUser } from '../types/User';
import { useDeleteModalContext } from '../context/deleteModal/DeleteModalContext';
import styles from '../scss/userCard.module.scss';
import { Card, Button } from 'react-bootstrap';
import { PersonSquare } from 'react-bootstrap-icons';

type Props = {
    user: IUser;
};

const UserCard = ({ user }: Props) => {
    const { setUser, setShowDeleteModal } = useDeleteModalContext();

    const image = user.imagePath ? `${process.env.REACT_APP_API_URL}/${user.imagePath}` : null;

    const deleteUser = () => {
        setShowDeleteModal(true);
        setUser(user);
    };

    return (
        <Card className={styles.userCard}>
            <Card.Header className={styles.header}>
                <strong>{user.username}</strong>
                {image ? <Card.Img src={image} className={styles.photo} /> : <PersonSquare className={styles.photo} />}
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
