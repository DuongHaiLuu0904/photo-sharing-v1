import React from "react";
import { 
  Typography, 
  Card, 
  CardContent, 
  Button,
  Grid,
  Divider,
  Avatar,
  Box,
  Paper,
  Chip
} from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

/**
 * Định nghĩa UserDetail, một component React của Project 4.
 * Component này hiển thị thông tin chi tiết về một người dùng.
 */
function UserDetail() {
    const { userId } = useParams();
    const user = models.userModel(userId);
    const navigate = useNavigate();

    if (!user) {
        return (
            <Typography variant="h6" color="error" sx={{ p: 3 }}>
                Không tìm thấy người dùng
            </Typography>
        );
    }

    const handleViewPhotos = () => {
        navigate(`/photos/${userId}`);
    };

    // Tạo chữ cái đầu cho avatar
    const getInitials = (firstName, lastName) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`;
    };

    // Tạo màu avatar dựa trên tên người dùng
    const stringToColor = (string) => {
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
    };

    return (
        <div className="user-detail-container">
            <Paper elevation={0} className="user-detail-header">
                <Avatar 
                    sx={{ 
                        width: 80, 
                        height: 80, 
                        bgcolor: stringToColor(`${user.first_name} ${user.last_name}`),
                        fontSize: '2rem'
                    }}
                >
                    {getInitials(user.first_name, user.last_name)}
                </Avatar>
                <Box className="user-detail-header-info">
                    <Typography variant="h4" component="h1" gutterBottom>
                        {user.first_name} {user.last_name}
                    </Typography>
                    <Chip 
                        label={user.occupation} 
                        variant="outlined" 
                        size="small" 
                        sx={{ mr: 1 }}
                    />
                    <Chip 
                        label={user.location} 
                        variant="outlined" 
                        size="small"
                    />
                </Box>
            </Paper>
            
            <Card sx={{ mt: 3 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Giới thiệu
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {user.description}
                    </Typography>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Grid container justifyContent="flex-end">
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={handleViewPhotos}
                        >
                            Xem Ảnh
                        </Button>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
}

export default UserDetail;
