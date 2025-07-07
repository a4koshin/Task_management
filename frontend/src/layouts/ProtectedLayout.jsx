import Header from "../components/Header";
import Sidebar from "../components/Aside";

const ProtectedLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
