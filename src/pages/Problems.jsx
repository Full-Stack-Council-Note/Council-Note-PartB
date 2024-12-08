import DeleteIcon from "@mui/icons-material/Delete";
import {
    Avatar,
    Box,
    Button,
    Chip,
    Container,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    TextField,
    Typography,
} from "@mui/material";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {
    Link,
    useLocation,
    useParams
} from "react-router-dom";

const Problems = () => {
    const { id } = useParams();
    const { search } = useLocation();
    const user = new URLSearchParams(search).get("user/:id");
    const [problems, setProblems] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5173/problems`,
                    {
                        withCredentials: true,
                    }
                );
                console.log("ssss", response.data.users.fullname);
                setProblems(response.data);
                setComments(response.data.comments || []);
            } catch (error) {
                console.error("Error fetching Problem posts:", error);
            }
        };

        fetchArticle();
    });
}