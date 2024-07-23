import React, { useState, useEffect, useRef } from "react";
import Keycloak from "keycloak-js";

// Initialize Keycloak client with configuration
const client = new Keycloak({
    url: "http://localhost:8080/",
    realm: "myrealm",
    clientId: "myiheb",
    // url: import.meta.env.VITE_KEYCLOAK_URL,
    // realm: import.meta.env.VITE_KEYCLOAK_REALM,
    // clientId: import.meta.env.VITE_KEYCLOAK_CLIENT,
});

// Custom hook useAuth to handle authentication state
const useAuth = () => {
    // useRef to track if useEffect has already run
    const isRun = useRef(false);

    // State variables to manage authentication state and token
    const [token, setToken] = useState(null);
    const [isLogin, setLogin] = useState(false);

    useEffect(() => {
        // Check if the token exists in localStorage
        const storedToken = localStorage.getItem('token');
        
        if (storedToken) {
            setToken(storedToken); // Set token from localStorage
        }
  
        // If useEffect has already run (on subsequent renders), return early
        if (isRun.current) return;
  
        // Set isRun to true to indicate useEffect has run once
        isRun.current = true;
  
        // Initialize Keycloak client
        client
            .init({
                onLoad: "login-required", // Require login when Keycloak is loaded
            })
            .then((authenticated) => {
                // Authentication successful
                console.log("response :", authenticated);
                setLogin(authenticated); // Update authentication state
                setToken(client.token); // Update token state
                localStorage.setItem('token', client.token); // Save token to localStorage
            })
            .catch((error) => {
                // Error initializing Keycloak
                console.error("Keycloak initialization failed:", error);
            });
    }, []); // Empty dependency array ensures this effect runs only once
  
    // Return authentication state and token
    return [isLogin, token];
};

export default useAuth;
