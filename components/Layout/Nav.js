import Image from "next/image";
import homeInativo from "../../public/images/homeInativo.svg";
import plusInativo from "../../public/images/plusInativo.svg";
import userInativo from "../../public/images/userInativo.svg";
import homeAtivo from "../../public/images/homeAtivo.svg";
import plusAtivo from "../../public/images/plusAtivo.svg";
import userAtivo from "../../public/images/userAtivo.svg";

export default function Nav({className}){
    return(
        <nav className={`navbar ${className}`}>
            <ul>
                <li><a><Image src={homeAtivo} alt="Ícone Home" width={20} height={20} /></a></li>
                <li><a><Image src={plusInativo} alt="Ícone nova publicação" width={20} height={20} /></a></li>
                <li><a><Image src={userInativo} alt="Ícone perfil" width={20} height={20} /></a></li>
            </ul>
        </nav>
    )
}