import React, { useState, useEffect } from 'react';
import getBaseUrl from '../lib/helper';

interface UserItemProps {
  user: User;
  onGroupChange: () => void;
}

const UserItem: React.FC<UserItemProps> = ({ user, onGroupChange }) => {
  const [group, setGroup] = useState(user.group);
  const [availableGroups, setAvailableGroups] = useState<string[]>([]);

  useEffect(() => {
    fetch(`${getBaseUrl()}/groups`)
      .then((response) => response.json())
      .then((data) => setAvailableGroups(data))
      .catch((error) => console.error('Error fetching groups:', error));
  }, []);

  const handleGroupChange = async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ group }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update user group');
      }
  
      onGroupChange();
    } catch (err) {
      console.error('Failed to update user group:', err);
    }
  };

  return (
    <div className="user-item">
      <p>{user.name} - {user.email}</p>
      <select value={group} onChange={(e) => setGroup(e.target.value)}>
        {availableGroups.map((groupOption) => (
          <option key={groupOption} value={groupOption}>
            {groupOption}
          </option>
        ))}
      </select>
      <button onClick={handleGroupChange}>Update Group</button>
    </div>
  );
};

export default UserItem;
