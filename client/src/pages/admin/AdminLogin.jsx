
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Button} from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Label } from "@/components/common/Label";
import {toast} from "react-hot-toast"
import axios from "../../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token){
      return;
    }
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      console.log({decoded})
      if (!(decoded.exp < currentTime)) {
        // Token is valid and not expireed
       
        toast.error("You are already logged in ...")
        navigate('/admin/dashboard');
        return;
      }else{
        console.log("time nikal gya hai")
      }
    } catch (error) {
      console.log({error})
      return;
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await axios.post('/api/auth/login', credentials);
      console.log({response})
      if (response.data.token) {
        // localStorage.setItem("isAdminAuthenticated", "true");
        Optionally: localStorage.setItem("token", response.data.token);
  
      
        toast.success("Login Successful")
  
        navigate("/admin/dashboard");
      } else {
        throw new Error(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      
      toast.error(error.response?.data?.message || error.message || "Something went wrong.")
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-beige-light  ">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-serif">Admin Login</h1>
          <p className="text-muted-foreground mt-2">
            Please sign in to access the admin dashboard
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="">
            <Label htmlFor="username" className="text-left w-full">Username</Label>
            <Input
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-left w-full">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <Button
            type="button"
            onClick={handleSubmit}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <p className="text-muted-foreground">
            credentials: admin / 123!@#qweQWE
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
