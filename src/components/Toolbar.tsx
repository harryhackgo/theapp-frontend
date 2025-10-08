import React from "react";

interface ToolbarProps {
  selectedCount: number;
  onBlock: () => void;
  onUnblock: () => void;
  onDelete: () => void;
  onDeleteUnverified: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  selectedCount,
  onBlock,
  onUnblock,
  onDelete,
  onDeleteUnverified,
}) => {
  const disabled = selectedCount === 0;

  return (
    <div className="d-flex justify-content-between align-items-center bg-white border rounded-3 p-3 mb-3 shadow-sm">
      <div className="d-flex gap-2">
        <button
          className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
          disabled={disabled}
          onClick={onBlock}
        >
          <i className="bi bi-lock"></i> Block
        </button>

        <button
          className="btn btn-outline-success btn-sm d-flex align-items-center gap-1"
          disabled={disabled}
          onClick={onUnblock}
        >
          <i className="bi bi-unlock"></i>
        </button>

        <button
          className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
          disabled={disabled}
          onClick={onDelete}
        >
          <i className="bi bi-trash"></i>
        </button>

        <button
          className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
          onClick={onDeleteUnverified}
        >
          <i className="bi bi-person-x"></i>
        </button>
      </div>

      <div className="text-muted small">
        {selectedCount > 0 ? `${selectedCount} selected` : "No users selected"}
      </div>
    </div>
  );
};

export default Toolbar;
