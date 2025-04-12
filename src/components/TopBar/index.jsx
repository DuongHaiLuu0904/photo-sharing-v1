import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
// Nếu bạn gặp vấn đề khi nhập PhotoCameraIcon, bạn có thể comment dòng bên dưới
// và sử dụng thành phần Typography thông thường thay thế.
// import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import models from "../../modelData/models";

import "./styles.css";

/**
 * Định nghĩa TopBar, một component React của Project 4.
 */
function TopBar() {
    // Lấy vị trí hiện tại để xác định ngữ cảnh
    const location = useLocation();
    let contextInfo = "";
    
    // Trích xuất userId từ đường dẫn nếu có
    const pathParts = location.pathname.split('/');
    if (pathParts.length >= 3) {
        const userId = pathParts[2];
        const user = models.userModel(userId);
        
        if (user) {
            if (pathParts[1] === 'users') {
                contextInfo = `Chi tiết của ${user.first_name} ${user.last_name}`;
            } else if (pathParts[1] === 'photos') {
                contextInfo = `Ảnh của ${user.first_name} ${user.last_name}`;
            }
        }
    } else if (location.pathname === '/users') {
        contextInfo = "Danh sách người dùng";
    }
    
    return (
      <AppBar className="topbar-appBar" position="fixed">
        <Toolbar>
          {/* Nếu PhotoCameraIcon không hoạt động, sử dụng thành phần Typography này */}
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ mr: 2, fontWeight: 'bold' }}
          >
            📷
          </Typography>
          {/* <PhotoCameraIcon sx={{ mr: 2 }} /> */}
          <Typography 
            variant="h5" 
            color="inherit" 
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Ứng dụng Chia sẻ Ảnh
          </Typography>
          
          {/* Thông tin ngữ cảnh */}
          {contextInfo && (
            <Typography 
              variant="subtitle1" 
              color="inherit" 
              component="div"
              sx={{ mr: 2 }}
            >
              {contextInfo}
            </Typography>
          )}
          
          <Box>
            <Button 
              color="inherit" 
              component={Link} 
              to="/users"
            >
              Người dùng
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    );
}

export default TopBar;
