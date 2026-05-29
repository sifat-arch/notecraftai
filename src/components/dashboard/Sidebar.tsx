import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <aside
      style={{
        width: "250px",
        background: "#f0f0f0",
        padding: "20px",
        borderRight: "1px solid #ccc",
      }}
    >
      <h3 style={{ marginBottom: "20px" }}>Dashboard</h3>
      <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <Link href="/dashboard/notes">All Notes</Link>
        <Link href="/dashboard/create">➕ Create Note</Link>
        <Link href="/dashboard/modal">➕ Modal</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
