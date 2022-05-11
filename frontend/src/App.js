import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './Header';
import Sidebar from './Sidebar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookTicket from './BookTicket';
import ViewTickets from './ViewTickets';
import { Toolbar } from '@mui/material';

export default function App() {
  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Routes>
              <Route path="/book" element={<BookTicket />} />
              <Route path="/" element={<ViewTickets />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </Box>
  );
}
