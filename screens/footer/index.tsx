import Link from "next/link"

export const Footer = () => {
    return (
        <footer className="max-w-[1540px] w-full  bg-blackRoot text-white p-4 font-mono flex justify-between items-center md:flex-col md:items-start md:gap-4">
            <p className="font-light text-sm xs:text-xs">2024 © LOGISTIK - KG  является юридически зарегистрированной торговой маркой. Об авторских правах</p>
            <div className="flex justify-between gap-4 items-center font-light text-white">
                <Link href='/contacts'>
                    Контакты
                </Link>
            </div>
        </footer>
    )
}