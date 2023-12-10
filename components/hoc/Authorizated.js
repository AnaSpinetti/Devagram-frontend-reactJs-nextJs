import UserService from "@/services/UserService"
import { useRouter } from "next/router";

const userService = new UserService();
export default function Authorizated(Component){
    return (props) => {
        const router = useRouter();

        if(typeof window !== 'undefined'){
            if(!userService.isAuthenticated()){
                router.replace('/');
                return null;
            }
            
            return <Component {...props} />
        }

        return null;
    }
}