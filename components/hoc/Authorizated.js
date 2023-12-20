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

            const loggedUser =  userService.getLoggedUser();
            
            return (
                <>
                    <Header loggedUser={loggedUser} />
                        <Component loggedUser={loggedUser} {...props} />
                    <Footer loggedUser={loggedUser} />
                </>
            );
        }

        return null;
    }
}