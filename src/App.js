import './App.css';

import React from "react";
import { Grid, Paper, Container, Box, Typography } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";

/**
 * Component ứng dụng chính thiết lập định tuyến và bố cục
 */
const App = () => {
  return (
    <Router>
      <div className="app-container">
        <TopBar />
        <Container maxWidth="xl" className="main-container">
          <Box className="main-topbar-buffer" />
          <Grid container spacing={2}>
            {/* Thanh bên danh sách người dùng - luôn hiển thị */}
            <Grid item xs={12} sm={3}>
              <Paper className="main-grid-item">
                <UserList />
              </Paper>
            </Grid>
            
            {/* Khu vực nội dung chính - thay đổi dựa trên tuyến đường */}
            <Grid item xs={12} sm={9}>
              <Paper className="main-grid-item">
                <Routes>
                  {/* Tuyến đường để xem chi tiết người dùng */}
                  <Route path="/users/:userId" element={<UserDetail />} />
                  
                  {/* Tuyến đường để xem ảnh của người dùng */}
                  <Route path="/photos/:userId" element={<UserPhotos />} />
                  
                  {/* Tuyến đường mặc định cho đường dẫn /users */}
                  <Route path="/users" element={
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                      <Typography variant="h5" sx={{ p: 3, textAlign: 'center' }}>
                        Chào mừng đến với Ứng dụng Chia sẻ Ảnh!<br />
                        Chọn một người dùng từ danh sách để xem chi tiết.
                      </Typography>
                    </Box>
                  } />
                  
                  {/* Chuyển hướng gốc đến /users */}
                  <Route path="/" element={<Navigate replace to="/users" />} />
                  
                  {/* Xử lý các tuyến đường không hợp lệ */}
                  <Route path="*" element={
                    <Typography variant="h5" sx={{ p: 3, color: 'error.main' }}>
                      Không tìm thấy trang
                    </Typography>
                  } />
                </Routes>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Router>
  );
}

export default App;
