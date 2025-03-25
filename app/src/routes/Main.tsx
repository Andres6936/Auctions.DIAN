import Dock from "@/components/dock";
import {Archive, Home, Settings, User} from "lucide-react";
import {useNavigate} from "react-router";
import {useUser} from "@stackframe/react";
import Button from '@jetbrains/ring-ui-built/components/button/button';
import {H1, H2} from "@jetbrains/ring-ui-built/components/heading/heading";
import Input from "@jetbrains/ring-ui-built/components/input/input";
import Text from "@jetbrains/ring-ui-built/components/text/text";


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
        <section className="flex flex:1 flex:col h:100vh max-h:100vh w:100vw max-w:100vw overflow:auto bg:slate-95 font:sans">
            <div className="flex flex:col bg:#f8f9fa p:1.5rem py:4rem gap:2rem">
                <H1>Encuentra bienes en remate</H1>

                <div className="flex flex:col p:1rem bg:white b:1px|solid|#e9ecef r:0.5rem">
                    <Input
                        label="Tipo de bien"
                    />

                    <Input
                        label="Tipo de inmueble"
                    />

                    <Input
                        label="Departamento"
                    />

                    <Input
                        label="Ciudad"
                    />

                    <Input
                        label="Valor desde"
                        type="number"
                    />

                    <Input
                        label="Valor hasta"
                        type="number"
                    />

                    <Input
                        label="Fecha inicial audiencia"
                        type="date"
                    />

                    <Input
                        label="Fecha final audiencia"
                        type="date"
                    />
                </div>

                <Text size={Text.Size.S}>Buscar por palabra</Text>

                <Button primary>Buscar</Button>
            </div>

            <div className="flex flex:col p:1.5rem gap:2rem">
                <H2>Proximas audiencias</H2>

                <div className="flex flex:col gap:2rem p:1.5rem bg:#f8f9fa border:1px|solid|#e9ecef r:0.5rem">
                    <div className="bg:red w:full video r:0.5rem"/>
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