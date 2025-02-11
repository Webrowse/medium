import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog {
  content: string;
  title: string;
  id: string;
  author: {
    name: string;
  };
}
export const useBlog =({id}:{id:string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
  
    useEffect(() => {
      async function fetchBlog() {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          });
          setBlog(response.data.blog);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
      fetchBlog();
    }, [id]);
  
    return {
      loading,
      blog,
    };
}
export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        setBlogs(response.data.blogs);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return {
    loading,
    blogs,
  };
};
