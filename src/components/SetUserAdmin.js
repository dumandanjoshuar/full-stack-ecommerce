import { useState, useEffect } from "react";
import { Button, Table, Modal } from "react-bootstrap";

function SetUserAdmin() {
  const [userId, setUserId] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const toggleUserSelection = (selectedUserId) => {
    setUserId((prevUserId) =>
      prevUserId.includes(selectedUserId)
        ? prevUserId.filter((id) => id !== selectedUserId)
        : [...prevUserId, selectedUserId]
    );
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const setUserRole = async (e) => {
    e.preventDefault();

    // Show the confirmation modal
    handleShowModal();
  };

  const confirmSetUserRole = async () => {
    try {
      // Close the modal
      handleCloseModal();

      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/set-user-admin`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          userId
        })
      });

      if (response.ok) {
        // Update the local state or fetch the updated user list
        // For simplicity, let's refetch the user list after setting roles
        const updatedUsers = await fetchUserList();
        setUsers(updatedUsers);
        setUserId([]); // Clear selected user IDs after successful update
      } else {
        // Handle error
        console.error("Failed to set user roles");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const fetchUserList = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/all`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      // Handle error
      console.error("Failed to fetch user list");
      return [];
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const userList = await fetchUserList();
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  return (
    <div className="container-fluid">
      <Table responsive>
        <thead>
          <tr>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>User Type</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className={user.isAdmin ? 'table-success' : 'table-danger'}>
              <td>{user._id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? 'Admin User' : 'Regular User'}</td>
              <td>
                <input
                  type="checkbox"
                  onChange={() => toggleUserSelection(user._id)}
                  checked={userId.includes(user._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button onClick={setUserRole}>Set User Admin</Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm User Admin Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to make the selected users admin?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmSetUserRole}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SetUserAdmin;
