import React from 'react';
import UserCard from '../../components/UserCard';

const UsersPage = async() => {
  const res = await fetch('http://localhost:5000/users')
  const users = await res.json();
  console.log(users);
  return (
    <div>
      <h2> Users Page: {users.length}</h2>
      <div className='grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {users.map(user=> <UserCard key={user._id} user={user}></UserCard>)}
      </div>
    </div>
  );
};

export default UsersPage;