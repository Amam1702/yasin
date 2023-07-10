// import logo from './logo.svg';
import './App.css';
// import Header from './layouts/Header';
// import Sidebar from './layouts/Sidebar';
import Dashboard from './Dashboard';
import CreateClient from './Clients/CreateClient';
import EditClient from './Clients/EditClient';
import ListClients from './Clients/ListClients';

import CreateVoucher from './Vouchers/CreateVoucher';
import EditVoucher from './Vouchers/EditVoucher';
import ListVouchers from './Vouchers/ListVouchers';

import Login from './Auth/Login';
import MasterLayout from './layouts/MasterLayout';
// import { Route, Routes, Navigate,BrowserRouter } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListAttendants from './Attendants/ListAttendants';
import CreateAttendant from './Attendants/CreateAttendant';
import EditAttendant from './Attendants/EditAttendant';
import ListStations from './Stations/ListStations';
import CreateStation from './Stations/CreateStation';
import EditStation from './Stations/EditStation';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MasterLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/clients" element={<ListClients />} />
          <Route path="/clients/create" element={<CreateClient />} />
          <Route path="/clients/edit/:id" element={<EditClient />} />

          <Route path="/vouchers" element={<ListVouchers />} />
          <Route path="/vouchers/create" element={<CreateVoucher />} />
          <Route path="/vouchers/edit/:id" element={<EditVoucher />} />
          
          <Route path="/attendants" element={<ListAttendants />} />
          <Route path="/attendants/create" element={<CreateAttendant />} />
          <Route path="/attendants/edit/:id" element={<EditAttendant />} />

          <Route path="/stations" element={<ListStations />} />
          <Route path="/stations/create" element={<CreateStation />} />
          <Route path="/stations/edit/:id" element={<EditStation />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
