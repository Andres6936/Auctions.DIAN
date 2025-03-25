import Dock from "@/components/dock";
import {Archive, Home, Settings, User} from "lucide-react";
import {useNavigate} from "react-router";
import {useUser} from "@stackframe/react";

export function Main() {
    useUser({ or: "redirect" });

    const navigate = useNavigate();

    const items = [
        {
            icon: <Home size={18} className="color:white"/>,
            label: 'Home', onClick: () => alert('Home!')
        },
        {
            icon: <User size={18} className="color:white"/>,
            label: 'Profile', onClick: () => navigate('/employee')
        },
        {
            icon: <Archive size={18} className="color:white"/>,
            label: 'Archive', onClick: () => alert('Archive!')
        },
        {
            icon: <Settings size={18} className="color:white"/>,
            label: 'Settings', onClick: () => navigate('/handler/account-settings')
        },
    ];

    return (
        <section className="flex flex:1 flex:col h:100vh max-h:100vh w:100vw max-w:100vw bg:slate-95 font:sans">
            <div className="flex flex:col bg:#003566 p:1.5rem py:4rem gap:2rem">
                <h1 className="color:white text:center font:1.5rem font:bold">Encuentra bienes en remate</h1>

                <div className="flex flex:col p:1rem bg:white r:0.5rem">
                    <label>
                        Tipo de bien:
                        <input type="text"/>
                    </label>

                    <label>
                        Tipo de inmueble:
                        <input type="text"/>
                    </label>

                    <label>
                        Departamento:
                        <input type="text"/>
                    </label>

                    <label>
                        Ciudad:
                        <input type="text"/>
                    </label>

                    <label>
                        Valor desde:
                        <input type="text"/>
                    </label>

                    <label>
                        Valor hasta:
                        <input type="text"/>
                    </label>

                    <label>
                        Fecha inicial audiencia:
                        <input type="date"/>
                    </label>

                    <label>
                        Fecha final audiencia:
                        <input type="date"/>
                    </label>
                </div>

                <p>Buscar por palabra</p>

                <button>Buscar</button>
            </div>

            <h2>Proximas audiencias</h2>

            <div>
                <div className="bg:red w:100 video"/>
                <p>Número del remate</p>
                <p>202506300000085</p>

                <p>Yopal - Casanare</p>
                <p>Fecha de audiencia</p>
                <p>2025-03-25</p>

                <p>Hora audiencia</p>
                <p>10:00</p>

                <p>Avaluó del bien:</p>
                <p>922,140,000 COP</p>

                <p>Valor base oferta</p>
                <p>645,498,000 COP</p>

                <button>Ver</button>
            </div>

            <Dock
                items={items}
                panelHeight={68}
                baseItemSize={50}
                magnification={70}
            />
        </section>
    )
}