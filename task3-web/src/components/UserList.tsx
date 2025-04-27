import { useEffect, useState } from 'react';
import UserItem from './UserItem';
import '../styles/UserList.css';
import getBaseUrl from '../lib/helper';

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch(`${getBaseUrl()}/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleGroupChange = () => {
    fetch(`${getBaseUrl()}/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  };

  return (
    <div className="user-list">
      {users.map((user) => (
        <UserItem key={user.id} user={user} onGroupChange={handleGroupChange} />
      ))}
    </div>
  );
}
