import React, { use } from 'react';

const Users2 = ({usersPromise}) => {
  const users = use(usersPromise());
  return (
    <div>
      <h2> Users in the component: {users.length}</h2>
      {users.map((user)=> <li key={user.id}>Name: {user.name}</li>)}
    </div>
  );
};

export default Users2;