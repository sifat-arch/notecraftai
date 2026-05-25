import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      {/* sidebar */}
      <aside className="w-64 bg-slate-800 text-white p-5 md:block">
        <h2 className="text-2xl font-bold mb-5">My Dahs</h2>
        <nav className="space-y-2">
          <a href="all_notes" className="block p-2 hover:bg-slate-700 rounded">
            All Notes
          </a>
          <a href="new_notes" className="block p-2 hover:bg-slate-700 rounded">
            Notes Notes
          </a>
          <a href="settings" className="block p-2 hover:bg-slate-700 rounded">
            Settings
          </a>
        </nav>
      </aside>
      <main>{children}</main>
      {/* main body of tha dashobard */}
    </div>
  );
};

export default DashboardLayout;
