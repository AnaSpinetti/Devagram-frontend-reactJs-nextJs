import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import PublicInput from "../../components/PublicInput";
import UploadImage from "../../components/UploadImage";
import Button from "../../components/Button";

import logo from "../../public/images/logoVertical.svg";
import user from "../../public/images/userAtivo.svg";
import avatarImg from "../../public/images/avatarImg.svg";
import passIcon from "../../public/images/key.svg";
import emailIcon from "../../public/images/envelope.svg";

import { validateConfirmPassword, validateEmail, validateName, validatePassword } from "@/utils/validators";
import UserService from "@/services/UserService";
import { useRouter } from "next/router";

const userService = new UserService();

export default function Register(){
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formLoading, setFormLoading] = useState(false);
    const router = useRouter();

    const validateForm = () => {
        return(
            validateEmail(email) && 
            validatePassword(password) &&
            validateConfirmPassword(confirmPassword, password) &&
            validateName(name)
        )
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        if(!validateForm){
            return;
        }

        setFormLoading(true)

        try {
            // Usando form data devido a imagem que estamos enviando no cadastro
            const bodyRegister = new FormData();
            bodyRegister.append("name", name);
            bodyRegister.append("email", email);
            bodyRegister.append("password", password);

            if(image?.file){
                bodyRegister.append("file", image.file);
            }

            await userService.register(bodyRegister);

            await userService.login({login: email, password})
            router.push('/')

        } catch (error) {
            console.log(error?.response?.data.error)    
            alert("Ocorreu um erro ao registrar o usuário: " + error?.response?.data.error)
        }

        setFormLoading(false)
    }
    
    return(
        <section className={`registerPage publicPage`}>
            <div className="logoContainer desktop">
                <Image src={logo} alt="Logo Devaria" layout="fill" className="logo" />
            </div>
            
            <div className="publicPageContent">
                <form onSubmit={onSubmitForm}>
                    <UploadImage imagePreviewClassname="avatar avatarPreview" setImage={setImage} imagePreview={image?.preview || avatarImg.src} />
                    <PublicInput image={user} typeValue="text" placeholderValue={"Nome"} onChangeValue={e => setName(e.target.value)} valueInput={name} show={name && !validateName(name)} message="A nome deve ter no mínimo 3 caracteres"/>
                    <PublicInput image={emailIcon} typeValue="email" placeholderValue={"Email"} onChangeValue={e => setEmail(e.target.value)} valueInput={email} show={email && !validateEmail(email)} message="O email informado é inválido"/>
                    <PublicInput image={passIcon} typeValue="password" placeholderValue={"Senha"} onChangeValue={e => setPassword(e.target.value)} valueInput={password} show={password && !validatePassword(password)} message="A senha deve ter no mínimo 6 caracteres"/>
                    <PublicInput image={passIcon} typeValue="password" placeholderValue={"Confirme sua senha"} onChangeValue={e => setConfirmPassword(e.target.value)} valueInput={confirmPassword} show={confirmPassword && !validateConfirmPassword(password, confirmPassword)} message="As senhas não conferem"/>
                    <Button type="submit" text="Cadastrar" isDisabled={!validateForm() || formLoading}  />
                </form>

                <div className="footerPublicPage">
                    <p>Já possui uma conta?</p>
                    <Link href="/">Faça seu login agora!</Link>
                </div>
            </div>
        </section> 
    )
}