import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { User } from '../types/User';
import UserCard from './UserCard';

type Props = {
    users: User[];
};
const UserList = ({ users }: Props) => {
    return (
        <>
            <h1>Users</h1>
            <Row>
                {users.length ? (
                    users.map((user) => {
                        return (
                            <Col key={user.id} sm={4}>
                                <UserCard user={user} />
                            </Col>
                        );
                    })
                ) : (
                    <p style={{ textAlign: 'center' }}>No users found</p>
                )}
            </Row>
        </>
    );
};

export default UserList;