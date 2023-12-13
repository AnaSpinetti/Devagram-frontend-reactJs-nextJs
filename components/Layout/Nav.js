import Image from "next/image";
import homeInativo from "../../public/images/homeInativo.svg";
import plusInativo from "../../public/images/plusInativo.svg";
import userInativo from "../../public/images/userInativo.svg";
import homeAtivo from "../../public/images/homeAtivo.svg";
import plusAtivo from "../../public/images/plusAtivo.svg";
import userAtivo from "../../public/images/userAtivo.svg";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const routeMap = {
    home: {
        activeImage: homeAtivo,
        inactiveImage: homeInativo,
        route: ['/']
    },
    post: {
        activeImage: plusAtivo,
        inactiveImage: plusInativo,
        route: ['/post']
    },
    profile: {
        activeImage: userAtivo,
        inactiveImage: userInativo,
        route: ['/profile/main', '/profile/main/edit']
    }
}

export default function Nav({className}){
    const [activeRoute, setActiveRoute] = useState('home');
    const router = useRouter();

    useEffect(() => {
        defineActiveRoute();
    }, [router.asPath])

    const defineActiveRoute = () => {
        const keysRoutes = Object.keys(routeMap);
        const activeIndex = keysRoutes.findIndex(key => {
            return routeMap[key].route.includes(window.location.pathname)
        });

        if(activeIndex === -1) {
            setActiveRoute('home');
        }else{
            setActiveRoute(keysRoutes[activeIndex]);
        }
    }

    const getImage = (nameRoute) => {
        const activatedRoute = routeMap[nameRoute];
        if(activeRoute === nameRoute){
            return activatedRoute.activeImage;
        }

        return activatedRoute.inactiveImage;
    }

    const onClickIcon = (routeName) => {
        setActiveRoute(routeName);
        router.push(routeMap[routeName].route[0])
    }

    return(
        <nav className={`navbar ${className}`}>
            <ul>
                <li onClick={() => onClickIcon('home')}><Image src={getImage('home')} alt="Ícone Home" width={20} height={20} /></li>
                <li onClick={() => onClickIcon('post')} ><Image src={getImage('post')} alt="Ícone nova publicação" width={20} height={20} /></li>
                <li onClick={() => onClickIcon('profile')}><Image src={getImage('profile')} alt="Ícone perfil" width={20} height={20} /></li>
            </ul>
        </nav>
    )
}