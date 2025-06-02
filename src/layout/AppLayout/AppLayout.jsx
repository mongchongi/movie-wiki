import { Outlet } from 'react-router';
import Navbar from './components/Navbar/Navbar';

const AppLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
