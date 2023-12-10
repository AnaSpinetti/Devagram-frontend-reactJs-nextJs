import { useEffect, useState } from "react"
import Login from "../components/Login"
import UserService from "@/services/UserService"
import Home from "@/components/Home";

const userService = new UserService();

export default function Index(){
    const [isauthenticated, setIsAuthenticated] = useState(false)
    
    // Quando renderizar a primeira tela verificar se já tem um token de autorização
    useEffect(() => {
        setIsAuthenticated(userService.isAuthenticated());
    },[])

    if(isauthenticated) {
        return <Home />
    }
    return (
        <Login beforeAuthentication={() => setIsAuthenticated(true)} />
    )
}