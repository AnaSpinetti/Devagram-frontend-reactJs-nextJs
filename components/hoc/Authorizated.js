import UserService from "@/services/UserService"
import { useRouter } from "next/router";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

const userService = new UserService();
export default function Authorizated(Component){
    return (props) => {
        const router = useRouter();

        if(typeof window !== 'undefined'){
            if(!userService.isAuthenticated()){
                router.replace('/');
                return null;
            }
            
            return (
                <>
                    <Header />
                        <Component {...props} />
                    <Footer />
                </>
            );
        }

        return null;
    }
}