function Information() {
    return (
        <section className="flex flex:col gap:1rem px:3rem py:3rem bg:white b:1px|solid|gray-88 font:0.85rem">
            <div>
                <h5 className="font:1.2rem font:bold">Información</h5>
            </div>
            <div className="flex flex:row gap:1rem">
                <div className="flex flex:1 flex:col gap-x:1rem">
                    <p>Remate Virtual</p>
                    <p>Requisitos para realizar la oferta</p>
                </div>

                <div className="flex flex:1 flex:col gap-x:1rem">
                    <p>Requisitos para ser postor</p>
                    <p>Requisitos para actuar como representante legal</p>
                </div>

                <div className="flex flex:1 flex:col gap-x:1rem">
                    <p>Requisitos para apoderado</p>
                    <p>Preguntas Frecuentes</p>
                </div>
            </div>
        </section>
    )
}

export {
    Information,
}