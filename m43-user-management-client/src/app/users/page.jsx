import React, { Suspense } from 'react';
import Users2 from '../components/Users2';

const usersPromise = async()=>{
  const data = await fetch('http://localhost:5000/users');
  return await data.json();
}

const UsersPage = async() => {
  
  return (
    <div>
      <h2>Users data coming soon:  </h2>
      <Suspense fallback={<h2>Loding...</h2>}>
      <Users2 usersPromise={usersPromise}></Users2>
      </Suspense>
    </div>
  );
};

export default UsersPage;