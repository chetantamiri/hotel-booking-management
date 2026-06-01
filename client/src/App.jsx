import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Allrooms from "./pages/Allrooms";
import RoomDetails from "./pages/RoomDetails";
import MyBooking from "./pages/MyBooking";
import HotelReg from "./components/HotelReg";
import Layout from "./pages/HotelOwner/Layout";
import Dashboard from "./pages/HotelOwner/Dashboard";
import ListRoom from "./pages/HotelOwner/ListRoom";
import Addrooms from "./pages/HotelOwner/Addrooms";

const App = () => {
  const pathname = useLocation().pathname;
  const isOwnerpath = pathname.includes("owner");
  const isHome = pathname === "/";

  return (
    <div>
      {!isOwnerpath && <Navbar />}
      {false && <HotelReg />}
      <div className={`min-h-[70vh] ${!isHome && !isOwnerpath ? "pt-20" : ""}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AllRooms" element={<Allrooms />} />
          <Route path="/AllRooms/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<MyBooking />} />
          <Route path="/owner" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-room" element={<Addrooms />} />
            <Route path="list-rooms" element={<ListRoom />} />
          </Route>
        </Routes>
      </div>
      {!isOwnerpath && <Footer />}
    </div>
  );
};

export default App;
