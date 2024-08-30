import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/UserList';
import InfiniteScroll from './components/InfiniteScroll';
import Pagination from './components/Pagination';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const [users, setUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);

  const [editingUserId, setEditingUserId] = useState(null);
  const [editingUserData, setEditingUserData] = useState({});

  const [isAddingUser, setIsAddingUser] = useState(false);

  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [useInfiniteScroll, setUseInfiniteScroll] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        const formattedUsers = response.data.map((user) => ({
          id: user.id,
          firstName: user.name.split(' ')[0],
          lastName: user.name.split(' ')[1] || '',
          email: user.email,
          department: 'N/A',
        }));

        setUsers(formattedUsers);
        setDisplayedUsers(formattedUsers.slice(0, itemsPerPage));
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        toast.error('Error fetching users');
      });
  }, []);

const handleEditUser = (user) => {

    setEditingUserId(user.id);
    setEditingUserData(user);

  };

  const handleDeleteUser = (id) => {

    setUsers(users.filter((user) => user.id !== id));

    setDisplayedUsers(displayedUsers.filter((user) => user.id !== id));
    toast.success('User deleted successfully');

  };

  const handleSaveUser = () => {

    setUsers(users.map((u) => (u.id === editingUserId ? editingUserData : u)));
    setDisplayedUsers(displayedUsers.map((u) => (u.id === editingUserId ? editingUserData : u)));
    
    setEditingUserId(null);

    toast.success('User updated successfully');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEditingUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCancelEdit = () => {

    setEditingUserId(null);

    toast.info('Edit cancelled');
  };

  const handleAddUserClick = () => {
    setIsAddingUser(true);

  };

  const handleAddUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevData) => ({ ...prevData, [name]: value }));

  };

  const handleSaveNewUser = () => {

    if (!newUser.firstName || !newUser.email) {
      toast.error('Please fill in the required fields');
      return;
    }

    const newUserId = users.length + 1;

    const userToAdd = { ...newUser, id: newUserId };
    setUsers([...users, userToAdd]);
    setDisplayedUsers([...displayedUsers, userToAdd]);
    setIsAddingUser(false);
    setNewUser({
      firstName: '',
      lastName: '',
      email: '',
      department: '',
    });

    toast.success('User added successfully');
  };

  const handleCancelAddUser = () => {

    setIsAddingUser(false);
    setNewUser({
      firstName: '',
      lastName: '',
      email: '',
      department: '',
    });
    toast.info('User addition cancelled');

  };

  const fetchMoreUsers = () => {

    if (isLoading || displayedUsers.length >= users.length) return;

    setIsLoading(true);

    setTimeout(() => {
      const currentLength = displayedUsers.length;
      const moreUsers = users.slice(currentLength, currentLength + itemsPerPage);
      setDisplayedUsers((prevUsers) => [...prevUsers, ...moreUsers]);
      setIsLoading(false);
    }, 500); 
  };

  const handleToggleView = () => {

    setUseInfiniteScroll(!useInfiniteScroll);

    setCurrentPage(1); 
    if (!useInfiniteScroll) {
      setDisplayedUsers(users.slice(0, itemsPerPage));

    }
  };

  const handlePageChange = (page) => {

    setCurrentPage(page);

    const startIndex = (page - 1) * itemsPerPage;

    const endIndex = startIndex + itemsPerPage;

    setDisplayedUsers(users.slice(startIndex, endIndex));
  };

  return (
    <div className="p-6">
      <ToastContainer />  
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleToggleView}
      >
        {useInfiniteScroll ? 'Switch to Pagination' : 'Switch to Infinite Scroll'}
      </button>
      <h1 className="text-2xl font-bold mb-4">User Management Dashboard</h1>
    

      {!isAddingUser ? (
        <>
           <button
            className="bg-green-500 text-white px-4 py-2 rounded mb-4"
            onClick={handleAddUserClick}
          >
            Add User


          </button>
{useInfiniteScroll ? (
      <InfiniteScroll fetchMore={fetchMoreUsers} loadingComponent={isLoading && <div>Loading...</div>}>
              <UserList users={displayedUsers} editingUserId={editingUserId} editingUserData={editingUserData}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
                onSave={handleSaveUser}

                onInputChange={handleInputChange}
                onCancelEdit={handleCancelEdit}
              />
            </InfiniteScroll>
          ) : (
            <>
              <UserList users={displayedUsers} editingUserId={editingUserId} editingUserData={editingUserData}
                
                onEdit={handleEditUser}

                onDelete={handleDeleteUser}
                onSave={handleSaveUser}
                onInputChange={handleInputChange}
                onCancelEdit={handleCancelEdit}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(users.length / itemsPerPage)}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </>
      ) : (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Add New User</h2>
          <div className="flex flex-col">
            <input type="text" name="firstName" value={newUser.firstName} onChange={handleAddUserChange} placeholder="First Name" className="border p-2 mb-2"/>

            <input type="text" name="lastName" value={newUser.lastName} onChange={handleAddUserChange} placeholder="Last Name" className="border p-2 mb-2"/>

            <input type="email"
              name="email" value={newUser.email} onChange={handleAddUserChange} placeholder="Email" className="border p-2 mb-2"/>
            <input type="text" name="department" value={newUser.department} onChange={handleAddUserChange} placeholder="Department" className="border p-2 mb-2"
            />
    <div>
    <button
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleSaveNewUser}
              >
                Save
       </button>

          <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={handleCancelAddUser}
       >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
