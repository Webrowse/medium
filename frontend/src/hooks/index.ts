import { useState, useEffect } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`);
                setBlogs(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [])

    return {
        loading,
        blogs
    }
}