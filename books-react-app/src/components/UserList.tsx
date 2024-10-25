import { Col, Row } from 'react-bootstrap';
import { useAppSelector } from '../hooks/redux-hooks';
import UserCard from './UserCard';

const UserList = () => {

    const { users } = useAppSelector((state) => state.user);

    return (
        users.length > 0 ?
            <div data-testid="user-list">
                <h1 className='mt-3 text-center'>Users</h1>
                <Row>
                    {users.map((user) => {
                        return (
                            <Col key={user.id} sm={3} data-testid="user-card" >
                                <UserCard user={user} />
                            </Col>
                        );
                    })}
                </Row>
            </div>
            : <div className='h-100 d-flex justify-content-center align-items-center pb-5'>
                <h2 className='mb-5 text-center text-dark'>No books found</h2>
            </div>
    );
};

export default UserList;