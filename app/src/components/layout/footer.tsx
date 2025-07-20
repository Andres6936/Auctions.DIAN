export default function Footer() {
    return (
        <footer
            className="flex flex:row px:2rem py:5rem bg:var(--ring-button-primary-background-color) color:white font-size:0.75rem">
            <section className="flex flex:1 flex:col justify-content:start align-items:center">
                <div className="max-w:15rem">
                    <img className="w:100% brightness(100)" src="/public/img/LogoCO.png" alt="Photo"/>
                </div>
            </section>
            <span className="flex min-w:1px bg:white"/>
            <section className="flex flex:1 flex:col px:2rem gap-y:0.2rem">
                <h6 className="font:bold font-size:1rem mb:1rem">Dirección de Impuestos y Aduanas Nacionales</h6>

                <p>Dirección: Sede principal | Bogotá, Nivel Central, carrera 8 Nº 6C - 38 Edificio San Agustín</p>
                <p>Código Postal: 111711</p>
                <p>Horario Contact Center: Lunes a viernes 8:00 a.m. a 7:00 p.m. y sábados de 8:00 am a 12m</p>

                <div className="flex flex:row gap-x:0.5rem mt:1.5rem">
                    <div className="bg:white w:2.5rem aspect-ratio:1/1 r:100%"/>
                    <div className="bg:white w:2.5rem aspect-ratio:1/1 r:100%"/>
                    <div className="bg:white w:2.5rem aspect-ratio:1/1 r:100%"/>
                    <div className="bg:white w:2.5rem aspect-ratio:1/1 r:100%"/>
                </div>
            </section>
            <span className="flex min-w:1px bg:white"/>
            <section className="flex flex:1 flex:col px:2rem gap-y:0.2rem">
                <h6 className="font:bold font-size:1rem mb:1rem">Contacto a nivel nacional</h6>

                <p>PBX (57+1) 607 99 99</p>
                <p>PBX (57+1) 382 45 00</p>
                <p>Fax (57+1) 607 94 50</p>
                <p>Servicio en Línea de Contacto</p>
                <p>PQSR y Denuncias | Llamada en Línea | Puntos de contacto</p>
                <p>Contact Center Teléfono: 057(1) 3556922</p>
                <p>Política de privacidad de uso | Política de tramiento de datos personales | Política de Seguridad de
                    la Información | Notificaciones Judiciales</p>
            </section>
        </footer>
    )
}