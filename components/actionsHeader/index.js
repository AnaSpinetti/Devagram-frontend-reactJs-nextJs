import Image from "next/image";

export default function ActionsHeader({className, onClickItemRight, iconBack, rightElement, textLeft = null, onClickItemLeft, title}){
    
    
    return (
        <div className={`actionsHeader ${className}`}>
            {iconBack ? (
                <Image src={iconBack} alt="Ícone voltar" onClick={onClickItemLeft} width={25} height={25} />
                ):(
                textLeft !== null && (
                    <span className="textLeftAction" onClick={onClickItemLeft}>
                        {textLeft}
                    </span>
                )
            )}

                <h3>{title}</h3>

                {rightElement && (
                <button className="btnRightActions" onClick={onClickItemRight} style={{cursor: 'pointer', border: 'none', backgroundColor: 'transparent'}}>{rightElement}</button>
                )}
        </div>
    )
}