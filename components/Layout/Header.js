import logo from "../../public/images/logoHorizontal.svg";
import lupa from "../../public/images/lupa.svg";
import Image from "next/image";
import Nav from "./Nav";
import { useState } from "react";
import SearchResult from "./SearchResult";

export default function Header(){
    const [searchResult, setSearchResult] = useState([]);
    const [searchedTerm, setSearchedTerm] = useState("");

    const onType = () => {
        setSearchedTerm(e.target.value)
        setSearchResult([])

        return
    }

    const onClickResult = () => {
        return
    }

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

                    <input type="text" placeholder="Pesquisar" value={searchedTerm} onChange={onType} />

                    <Nav className="desktop" />
                </div>
            </div>
            {searchResult.length > 0 && (
                <div className="searchResultContainer">
                    {searchResult.map(r => (
                        <SearchResult avatar={r.avatar} name={r.name} email={r.email} key={r._id} id={r._id} onClick = {onClickResult} />
                    ))}
                </div>
            )}
        </header>
    )
}