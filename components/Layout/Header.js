import logo from "../../public/images/logoHorizontal.svg";
import lupa from "../../public/images/lupa.svg";
import Image from "next/image";
import Nav from "./Nav";
import { useState } from "react";
import SearchResult from "./SearchResult";
import UserService from "@/services/UserService";
import { useRouter } from "next/router";

const userService = new UserService();

export default function Header(){
    const [searchResult, setSearchResult] = useState([]);
    const [searchedTerm, setSearchedTerm] = useState("");

    let headerClassName = '';
    if(window && window.location.pathname !== '/'){
        headerClassName = 'desktop';
    }

    const router = useRouter()

    const onType = async (e) => {
        setSearchedTerm(e.target.value)
        setSearchResult([])

        if(searchedTerm.length < 3) {
            return;
        }

        try {
            const {data} = await userService.search(searchedTerm);
            
            setSearchResult(data);
            

        } catch (error) {
            alert("Erro ao pesquisar usuario " + error?.response?.data?.error)
        }
    }

    const onClickResult = (e) => {
        setSearchedTerm('')
        setSearchResult([])
        router.push('/profile/' + e)
    }

    const redirectToHome = () => {
        router.push('/')
    }

    return (
        <header className={`headerDefault ${headerClassName}`}>
            <div className={"headerContentDefault"}>
                <div className="logoDefaultHeader">
                    <Image onClick={redirectToHome} src={logo} alt="Logo Devaria" layout="fill" />
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