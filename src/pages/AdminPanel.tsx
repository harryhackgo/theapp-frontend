import React, { useEffect, useState } from "react";
import Toolbar from "../components/Toolbar";
import UserTable from "../components/UserTable";
import {
  blockUsers,
  deleteUnverifiedUsers,
  deleteUsers,
  getAllUsers,
  unblockUsers,
} from "../api/userService";
import { useNavigate } from "react-router-dom";

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await getAllUsers();
      setUsers(res);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleBlock = async () => {
    await blockUsers(selectedIds);
    await loadUsers();
    setSelectedIds([]);
    // alert(`Blocked users: ${selectedIds.join(", ")}`);
  };

  const handleUnblock = async () => {
    await unblockUsers(selectedIds);
    await loadUsers();
    setSelectedIds([]);
    // alert(`Unblocked users: ${selectedIds.join(", ")}`);
  };

  const handleDelete = async () => {
    await deleteUsers(selectedIds);
    await loadUsers();
    setSelectedIds([]);
    // alert(`Deleted users: ${selectedIds.join(", ")}`);
  };

  const handleDeleteUnverified = async () => {
    await deleteUnverifiedUsers(selectedIds);
    await loadUsers();
    // alert("Delete all unverified users");
  };

  return (
    <div className="container py-4 position-relative">
      {/* Header Row */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-semibold mb-0">Admin Panel</h4>

        <button
          className="btn btn-outline-danger btn-sm px-3 d-flex align-items-center gap-1"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right"></i> Logout
        </button>
      </div>

      {/* Toolbar and Table */}
      <Toolbar
        selectedCount={selectedIds.length}
        onBlock={handleBlock}
        onUnblock={handleUnblock}
        onDelete={handleDelete}
        onDeleteUnverified={handleDeleteUnverified}
      />

      <UserTable
        users={users}
        onSelectionChange={setSelectedIds}
        loading={loading}
      />
    </div>
  );
};
// return (
//   <div className="container py-4">
//     <h4 className="mb-3 fw-semibold">Admin Panel</h4>

//     <Toolbar
//       selectedCount={selectedIds.length}
//       onBlock={handleBlock}
//       onUnblock={handleUnblock}
//       onDelete={handleDelete}
//       onDeleteUnverified={handleDeleteUnverified}
//     />
//     <UserTable
//       users={users}
//       onSelectionChange={setSelectedIds}
//       loading={loading}
//     />
//   </div>
// );

export default AdminPanel;
