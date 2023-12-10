import logo from "../../public/images/logoHorizontal.svg";
import lupa from "../../public/images/lupa.svg";
import Image from "next/image";
import Nav from "./Nav";

export default function Header(){
    return (
        <header className="headerDefault">
            <div className="headerContentDefault">
                <div className="logoDefaultHeader">
                    <Image src={logo} alt="Logo Devaria" layout="fill" />
                </div>

                <div className="searchBar">
                    <div className="containerSearchImage">
                        <Image src={lupa} alt="Lupa da barra de pesquisa" layout="fill" />
                    </div>

                    <input type="text" placeholder="Pesquisar" value={""} onChange={(e) => console.log("ok")} />

                    <Nav className="desktop" />
                </div>
            </div>
        </header>
    )
}