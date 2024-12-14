import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Comps/Home';
import Login from './pages/Login';
import Donation_Form from './Comps/Donation-Form';
import SignUp from './pages/SignUp';
import DummyDataDisplay from './pages/DummyReq';
import OrphanageDashboard from './pages/OrphanageDashboard';
import ProtectedRoute from './ProtectedRoute'; // Import ProtectedRoute
import DonorDashboard from './pages/DonorDashboard';
import ReqeustForm from './pages/RequestForm';
import DonorView from './Modules/DonorView';
import OrphanageDetails from './Modules/OrphanageDetails'
function Myrouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/donation-form" element={<Donation_Form />} />
      <Route path="/food-reqform" element={<ReqeustForm></ReqeustForm>}></Route>
      
      {/* Protect the OrphanageDashboard route */}
      <Route
        path="/OrphanageDashboard"
        element={
          <ProtectedRoute>
            <OrphanageDashboard></OrphanageDashboard>
          </ProtectedRoute>}
      />
      <Route path='/orphanage-list' element={<DonorView />}></Route>
      <Route path='/req-list' element={ <ProtectedRoute> <DonorView/> </ProtectedRoute>} > </Route>
      <Route path='/details/:id' element={<OrphanageDetails></OrphanageDetails>}></Route>

    </Routes>
  );
}

export default Myrouter;
