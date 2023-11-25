import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { IUser } from '../types/User';
import UserCard from './UserCard';

type Props = {
    users: Array<IUser>;
};
const UserList = ({ users }: Props) => {
    return (
        <>
            <h1>Users</h1>
            <Row>
                {users.length ? (
                    users.map((user, i) => {
                        return (
                            <Col key={i} sm={4}>
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
