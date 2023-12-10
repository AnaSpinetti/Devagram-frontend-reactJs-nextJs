import Image from "next/image";
import Link from "next/link";
import PublicInput from "../PublicInput/index.js";
import emailIcon from "../../public/images/envelope.svg"
import passIcon from "../../public/images/key.svg"
import logo from "../../public/images/logoVertical.svg"
import Button from "../Button";
import { useState } from "react";
import { validateEmail, validatePassword } from "@/utils/validators.js";
import UserService from "@/services/UserService.js";

const userService = new UserService();

export default function Login({beforeAuthentication}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formLoading, setFormIsLoading] = useState(false);

    const validateForm = () => {
        return(validateEmail(email) && validatePassword(password))
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        if(!validateForm){
            return;
        }

        setFormIsLoading(true);

        try {
            await userService.login({
                login: email, 
                password
            })

            // Redirecionar o usuario para a Home
            if(beforeAuthentication){
                beforeAuthentication();
            }
        } catch (error) {
            console.log(error);
            alert("Erro ao realizar login do usuario " + error?.response?.data.error)
        }

        setFormIsLoading(false);
    }

    return(
        <section className={`loginPage publicPage`}>
            <div className="logoContainer">
                <Image src={logo} alt="Logo Devaria" layout="fill" className="logo" />
            </div>
             
             <div className="publicPageContent">
                <form onSubmit={onSubmitForm}>
                    <PublicInput image={emailIcon} typeValue="email" placeholderValue={"Email"} onChangeValue={e => setEmail(e.target.value)} valueInput={email} show={email && !validateEmail(email)} message="Digite um email válido"  />
                    <PublicInput image={passIcon} typeValue="password" placeholderValue={"Senha"} onChangeValue={e => setPassword(e.target.value)} valueInput={password} show={password && !validatePassword(password)} message="A senha deve ter no mínimo 5 caracteres" />
                    <Button type="submit" text="Login" isDisabled={!validateForm() || formLoading} />
                </form>

                <div className="footerPublicPage">
                    <p>Não possui uma conta?</p>
                    <Link href="/register">Faça seu cadastro agora!</Link>
                </div>
             </div>
        </section>
    )
}