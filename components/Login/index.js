import Image from "next/image";
import Link from "next/link";
import PublicInput from "../PublicInput/index.js";
import emailIcon from "../../public/images/envelope.svg"
import passIcon from "../../public/images/key.svg"
import logo from "../../public/images/logoVertical.svg"
import Button from "../Button";
import { useState } from "react";

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return(
        <section className={`loginPage publicPage`}>
            <div className="logoContainer">
                <Image src={logo} alt="Logo Devaria" layout="fill" className="logo" />
            </div>
             
             <div className="publicPageContent">
                <form>
                    <PublicInput image={emailIcon} typeValue="email" placeholderValue={"E-mail"} onChangeValue={e => setEmail(e.target.value)} valueInput={email} />
                    <PublicInput image={passIcon} typeValue="password" placeholderValue={"Senha"} onChangeValue={e => setPassword(e.target.value)} valueInput={password} />
                    <Button type="submit" text="Login"  />
                </form>

                <div className="footerPublicPage">
                    <p>Não possui uma conta?</p>
                    <Link href="/register">Faça seu cadastro agora!</Link>
                </div>
             </div>
        </section>
    )
}