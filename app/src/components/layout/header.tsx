export default function Header() {
    return (
        <nav>
            <section
                className="flex h:2rem align-items:center justify-content:space-between px:1rem bg:var(--primary-background-color) color:white">
                <p className="uppercase">Gov.co</p>

                <div className="flex flex:row gap-x:1rem">
                    <p>Ayuda</p>
                    <p>Español</p>
                </div>
            </section>
            <section
                className="flex h:3rem align-items:center justify-content:space-between px:1rem border-bottom:2px|solid|gray-88">
                <div className="max-w:5rem">
                    <img className="w:100%" src="/public/img/LogoCO.png" alt="Photo"/>
                </div>

                <div className="flex flex:row gap-x:1rem">
                    <div className="max-w:5rem">
                        <img className="w:100%" src="/public/img/Remates.png" alt="Photo"/>
                    </div>
                    <div className="max-w:5rem">
                        <img className="w:100%" src="/public/img/DIAN.png" alt="Photo"/>
                    </div>
                </div>
            </section>
        </nav>
    )
}