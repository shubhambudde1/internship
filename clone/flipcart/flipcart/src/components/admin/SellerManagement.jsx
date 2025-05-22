import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, Badge, Modal, Box, Typography, TextField, MenuItem
} from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';


const SellerManagement = () => {
  const [sellers, setSellers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalAction, setModalAction] = useState('');
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch sellers
  useEffect(() => {
    axios.get('http://localhost:5001/api/sellerManage')
      .then(res => setSellers(res.data))
      .catch(err => toast.error('Failed to fetch sellers'));
  }, []);

  // Handle actions
  const handleAction = (seller, action) => {
    setSelectedSeller(seller);
    setModalAction(action);
    setOpenModal(true);
  };

  const confirmAction = () => {
    const url = `http://localhost:5001/api/sellerManage/${selectedSeller.id}/${modalAction}`;
    axios.put(url)
      .then(res => {
        toast.success(res.data.message);
        setSellers(sellers.map(s => 
          s.id === selectedSeller.id ? { ...s, status: modalAction === 'approve' ? 'Approved' : modalAction === 'block' ? 'Blocked' : 'Approved' } : s
        ));
      })
      .catch(err => toast.error(err.response?.data?.error || 'Action failed'));
    setOpenModal(false);
  };

  // Filter and search
  const filteredSellers = sellers.filter(seller => 
    (filterStatus ? seller.status === filterStatus : true) &&
    (searchTerm ? seller.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
  );

  return (
    <div>
      {/* Search and Filter */}
      <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
        <TextField
          label="Search by name"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <TextField
          select
          label="Filter by status"
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Approved">Approved</MenuItem>
          <MenuItem value="Blocked">Blocked</MenuItem>
        </TextField>
      </Box>

      {/* Seller Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSellers.map(seller => (
              <TableRow key={seller.id}>
                <TableCell>{seller.name}</TableCell>
                <TableCell>{seller.company_name}</TableCell>
                <TableCell>{seller.email}</TableCell>
                <TableCell>{seller.phone}</TableCell>
                <TableCell>
                  <Badge color={seller.status === 'Approved' ? 'success' : seller.status === 'Blocked' ? 'error' : 'warning'}>
                    {seller.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {seller.status === 'Pending' && (
                    <Button onClick={() => handleAction(seller, 'approve')} color="success">Approve</Button>
                  )}
                  {seller.status === 'Approved' && (
                    <Button onClick={() => handleAction(seller, 'block')} color="error">Block</Button>
                  )}
                  {seller.status === 'Blocked' && (
                    <Button onClick={() => handleAction(seller, 'unblock')} color="primary">Unblock</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'white', p: 4, borderRadius: 2 }}>
          <Typography variant="h6">Confirm {modalAction}?</Typography>
          <Typography>Are you sure you want to {modalAction} {selectedSeller?.name}?</Typography>
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button onClick={confirmAction} color="primary" variant="contained">Confirm</Button>
            <Button onClick={() => setOpenModal(false)} color="secondary">Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default SellerManagement;