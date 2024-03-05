import { Row, Col } from 'react-bootstrap';
import UserCard from './UserCard';
import { useAppSelector } from 'hooks/redux-hooks';

const UserList = () => {

    const { users } = useAppSelector((state) => state.user);

    return (
        users.length > 0 ?
            <div className='p-3'>
                <h1>Users</h1>
                <Row>
                    {users.map((user) => {
                        return (
                            <Col key={user.id} sm={4}>
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