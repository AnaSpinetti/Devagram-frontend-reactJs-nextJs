import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Authorizated from "@/components/hoc/Authorizated";
import Feed from "@/components/feed";
import HeaderProfile from "@/components/headerProfile";
import UserService from "@/services/UserService";

const userService = new UserService();

function Profile({loggedUser}){
    const [user, setUser] = useState({});
    const router = useRouter();

    const getUserProfile = async (idUser) => {
        try {
            const {data} = await userService.getUserData(
                isInPersonalProfile()
                ? loggedUser.id
                : idUser
            );
            return data
        } catch (e) {
            console.log(e);
            alert("Não foi possível obter os dados do perfil " + (e?.response?.data.error || ''))
        }
    }

    const isInPersonalProfile = () => {
        return router.query.id === 'main';
    }

    useEffect(() => {
        if(!router.query.id){
            return;
        }

        const fetchData = async () => {
            try {
                const profileData = await getUserProfile(router.query.id);
                setUser(profileData);

            } catch (error) {
                console.error(error);
            }
        }

        fetchData()
    },[router.query.id]);

    //className, textLeft = null, onClickItemLeft, title='teste'
    return (
        <div className="profilePage">
            <HeaderProfile isInPersonalProfile={isInPersonalProfile()} loggedUser={loggedUser} user={user} />
            <Feed userProfile={user?._id} loggedUser={loggedUser}/>
        </div>
    )
}

export default Authorizated(Profile)