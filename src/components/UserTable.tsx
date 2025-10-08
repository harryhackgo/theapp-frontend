import React, { useEffect, useState } from "react";
import { formatLastSeen } from "../utils/formatDate";

interface User {
  id: number;
  fullName: string;
  email: string;
  corporationName: string;
  status: "ACTIVE" | "UNVERIFIED" | "BLOCKED";
  lastLogin: string;
}

interface UserTableProps {
  users: User[];
  onSelectionChange: (ids: number[]) => void;
  loading: boolean;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onSelectionChange,
  loading,
}) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelected([]);
      setSelectAll(false);
      onSelectionChange([]);
    } else {
      const allIds = users.map((u) => u.id);
      setSelected(allIds);
      setSelectAll(true);
      onSelectionChange(allIds);
    }
  };

  const toggleSelect = (id: number) => {
    const updated = selected.includes(id)
      ? selected.filter((x) => x !== id)
      : [...selected, id];
    setSelected(updated);
    setSelectAll(updated.length === users.length);
    onSelectionChange(updated);
  };

  useEffect(() => {
    setSelected([]);
  }, [loading]);

  return (
    <div className="table-responsive bg-white border rounded-3 shadow-sm">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th scope="col">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Last Login</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="text-center py-4">
                <div className="spinner-border text-primary" role="status" />
              </td>
            </tr>
          ) : users.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center text-muted py-3">
                No users found
              </td>
            </tr>
          ) : (
            users.map((u) => (
              <tr key={u.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selected.includes(u.id)}
                    onChange={() => toggleSelect(u.id)}
                  />
                </td>
                <td>
                  <div>
                    <strong>{u.fullName}</strong>
                    <div className="text-muted small">
                      {u.corporationName || "—"}
                    </div>
                  </div>
                </td>
                <td>{u.email || "N/A"}</td>
                <td>
                  <span
                    className={`badge ${
                      u.status === "ACTIVE"
                        ? "bg-success"
                        : u.status === "BLOCKED"
                        ? "bg-danger"
                        : "bg-secondary"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td>{formatLastSeen(u.lastLogin)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <table className="table table-hover align-middle">
      <thead className="table-light">
        <tr>
          <th scope="col">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={toggleSelectAll}
            />
          </th>
          <th>Name</th>
          <th>E-mail</th>
          <th>Status</th>
          <th>Last Login</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan={5} className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </td>
          </tr>
        ) : users.length === 0 ? (
          <tr>
            <td colSpan={5} className="text-center text-muted py-3">
              No users found
            </td>
          </tr>
        ) : (
          users.map((u) => (
            <tr key={u.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(u.id)}
                  onChange={() => toggleSelect(u.id)}
                />
              </td>
              <td>{u.fullName}</td>
              <td>{u.email}</td>
              <td>
                <span
                  className={`badge ${
                    u.status === "ACTIVE"
                      ? "bg-success"
                      : u.status === "BLOCKED"
                      ? "bg-danger"
                      : "bg-secondary"
                  }`}
                >
                  {u.status}
                </span>
              </td>
              <td>{formatLastSeen(u.lastLogin)}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default UserTable;
