import React from 'react';

const UserList = ({
  users,
  editingUserId,
  editingUserData,
  onEdit,
  onDelete,
  onSave,
  onInputChange,
  onCancelEdit,
}) => {
  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">User List</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">First Name</th>
            <th className="py-2 px-4 border-b">Last Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Department</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.id}</td>
              {editingUserId === user.id ? (
                <>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      name="firstName"
                      value={editingUserData.firstName}
                      onChange={onInputChange}
                      className="border p-1"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      name="lastName"
                      value={editingUserData.lastName}
                      onChange={onInputChange}
                      className="border p-1"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="email"
                      name="email"
                      value={editingUserData.email}
                      onChange={onInputChange}
                      className="border p-1"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      name="department"
                      value={editingUserData.department}
                      onChange={onInputChange}
                      className="border p-1"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      onClick={onSave}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-500 text-white px-2 py-1 rounded"
                      onClick={onCancelEdit}
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="py-2 px-4 border-b">{user.firstName}</td>
                  <td className="py-2 px-4 border-b">{user.lastName}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.department}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => onEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => onDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
