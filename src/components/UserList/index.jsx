import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemButton,
  Avatar,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

/**
 * Định nghĩa UserList, một component React của Project 4.
 * Component này cung cấp điều hướng đến tất cả người dùng trong hệ thống.
 */
function UserList() {
  const users = models.userListModel();
  const navigate = useNavigate();
  
  /**
   * Xử lý khi nhấp vào một mục danh sách người dùng
   */
  const handleUserClick = (userId) => {
    navigate(`/users/${userId}`);
  };
  
  return (
    <div className="user-list-container">
      <Typography variant="h6" sx={{ p: 2 }}>
        Người dùng
      </Typography>
      <Divider />
      <List component="nav">
        {users.map((user) => (
          <React.Fragment key={user._id}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleUserClick(user._id)}>
                <Avatar 
                  sx={{ 
                    bgcolor: stringToColor(`${user.first_name} ${user.last_name}`),
                    mr: 2
                  }}
                >
                  {user.first_name.charAt(0)}
                </Avatar>
                <ListItemText 
                  primary={`${user.first_name} ${user.last_name}`} 
                  secondary={
                    <Box component="span" sx={{ display: 'block' }}>
                      <Typography variant="body2" component="span">
                        {user.occupation}
                      </Typography>
                      <Typography variant="caption" component="span" sx={{ display: 'block' }}>
                        {user.location}
                      </Typography>
                    </Box>
                  }
                />
              </ListItemButton>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

/**
 * Tạo màu dựa trên chuỗi
 */
function stringToColor(string) {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

export default UserList;
