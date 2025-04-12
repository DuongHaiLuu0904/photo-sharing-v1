import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import models from "../../modelData/models";

import "./styles.css";

function TopBar() {
  const location = useLocation();
  let contextInfo = "";

  const pathParts = location.pathname.split("/");
  if (pathParts.length >= 3) {
    const userId = pathParts[2];
    const user = models.userModel(userId);

    if (user) {
      if (pathParts[1] === "users") {
        contextInfo = `Chi tiết của ${user.first_name} ${user.last_name}`;
      } else if (pathParts[1] === "photos") {
        contextInfo = `Ảnh của ${user.first_name} ${user.last_name}`;
      }
    }
  } else if (location.pathname === "/users") {
    contextInfo = "Danh sách người dùng";
  }

  return (
    <AppBar className="topbar-appBar" position="fixed">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ mr: 2, fontWeight: "bold" }}
        >
          📷
        </Typography>
        <Typography
          variant="h5"
          color="inherit"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Ứng dụng Chia sẻ Ảnh
        </Typography>

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
          <Button color="inherit" component={Link} to="/users">
            Người dùng
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
