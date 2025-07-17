const Dashboard = () => {
  return (
    <main className="grid grid-cols-3 gap-4 p-4">
      <div>
        <h1 className="font-semibold text-2xl">To do</h1>
      </div>

      {/* Inprogress */}
      <div>
        <h1 className="font-semibold text-2xl">Inprogress</h1>
      </div>

      {/* Completed */}
      <div>
        <h1 className="font-semibold text-2xl">Completed</h1>
      </div>
    </main>
  );
};

export default Dashboard;
