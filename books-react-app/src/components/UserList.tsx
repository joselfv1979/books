import { Col, Row } from 'react-bootstrap';
import { useAppSelector } from '../hooks/redux-hooks';
import { User } from '../types/User';
import UserCard from './UserCard';

const UserList = () => {

    const { users } = useAppSelector((state) => state.user);

    const renderUserCard = (user: User) => (
        <Col key={user.id} sm={3} data-testid="user-card" >
            <UserCard user={user} />
        </Col>
    );

    return (
        users.length > 0 ?
            <div data-testid="user-list">
                <h1 className='text-center mt-3'>Users</h1>
                <Row>
                    {users.map(renderUserCard)}
                </Row>
            </div>
            : <h2 className='mb-5 text-center text-dark'>No Users found</h2>
    );
};

export default UserList;