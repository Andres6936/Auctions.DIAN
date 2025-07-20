import {Fragment} from "react";
import {Button} from "@mantine/core";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import {Information} from "@/components/view/home/information";

export default function Page() {
    return (
        <Fragment>
            <Header/>
            <section className="flex flex:col gap:1rem px:3rem py:3rem bg:white">
                <div>
                    <div className="flex flex:row align-items:center justify-content:space-between font:1.2rem">
                        <p>Número del Remate: <span className="font:bold">2025060100468</span></p>
                        <p className="font:0.95rem">Fecha de publicación del aviso del remate: <span
                            className="font:bold">11/7/2025</span></p>
                    </div>
                    <div>
                        <p className="opacity:0.7 font:0.95rem">POPAYÁN - CAUCA</p>
                    </div>
                </div>

                <div className="flex flex:row gap:1rem mt:3rem">
                    <div
                        className="rel flex flex:3 align-items:center justify-content:center border:1px|solid|gray-80 r:10 p:1rem">
                        <div className="flex w:25rem square bg:gray-80 r:10"></div>

                        <div
                            className="abs top:0 right:0 p:1rem bg:gray-90 rtr:10 rbl:20 text:white font:bold text-align:center">
                            <p>70%</p>
                        </div>
                    </div>

                    <div className="flex flex:2 flex:col gap:1rem">
                        <div className="flex flex:col gap:1rem border:1px|solid|gray-80 r:10 p:1rem">
                            <div className="flex flex:row justify-content:space-between">
                                <div className="flex flex:col">
                                    <p>Fecha de Audiencia</p>
                                    <p className="font:bold">22/7/2025</p>
                                </div>
                                <div className="flex flex:col">
                                    <p>Hora de Audiencia</p>
                                    <p className="font:bold">10:00</p>
                                </div>
                            </div>

                            <p>Avalúo del bien: <span className="font:bold">$18,400,000</span></p>

                            <div>
                                <p>Valor base oferta</p>
                                <p className="font:bold">$12,880,000</p>
                            </div>
                        </div>

                        <div className="flex flex:col gap:1rem border:1px|solid|gray-80 r:10 p:1rem">
                            <p className="font:bold">Quiero hacer una oferta para este remate</p>
                            <Button>
                                Ingresar
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex flex:col w:50% gap:1rem">
                    <h4 className="font:1.3rem font:bold">Descripción del Remate</h4>

                    <p className="font:0.85rem">CUATRIMOTO, VEHICULO AUTOMOTOR DE PLACA AWU99G-MARCA, CFMOTO, LINEA
                        CF4400-B,COLOR
                        BLANCO, MODELO 2022, CILINDRAJE 400, No. 268mq2a014052, No. CHASIS LCEPESL43N6000251</p>

                    <div className="bg:cyan-80 rounded w:fit px:1rem font:0.85rem">
                        <p>Cuatrimoto</p>
                    </div>
                </div>

                <div className="flex flex:row gap:1rem mt:3rem">
                    <div
                        className="rel flex flex:3 align-items:center justify-content:center border:1px|solid|gray-80 r:10 p:1rem">
                        <div className="flex w:25rem square bg:gray-80 r:10"></div>

                        <div
                            className="abs top:0 right:0 p:1rem bg:gray-90 rtr:10 rbl:20 text:white font:bold text-align:center">
                            <p>70%</p>
                        </div>
                    </div>

                    <div className="flex flex:2 flex:col gap:1rem">
                        <div className="flex flex:col gap:1rem border:1px|solid|gray-80 r:10 p:1rem">
                            <h4 className="font:1.3rem font:bold">Mueble</h4>
                            <div className="bg:cyan-80 r:5 px:1rem py:0.5rem">
                                <p className="opacity:0.7 font:0.85rem">Número de identificación del bien:</p>
                                <p className="font:semibold">VEHICULO AUTOMOTOR DE PLACA AWU99G-MARCA, CFMOTO, LINEA
                                    CF44</p>
                            </div>

                            <div className="flex flex:col gap:0.7rem font:0.85rem">
                                <p className="font:bold">Porcentaje del bien a rematar: 100%</p>
                                <p className="font:bold">Dirección: Cra 8 1-36</p>
                                <p className="font:bold">POPAYÁN - CAUCA</p>

                                <p>Un vehículo tipo motocicleta con las siguientes características; No tiene espejos,
                                    llantas en
                                    regular estado, presenta rayanoes a mano izquierda, no se conoce su estado
                                    tecnicomecanico,
                                    lo demás conforme al inventario realizado por la Policía en el momento de la
                                    inmovilización.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Information/>
            <Footer/>
        </Fragment>
    )
}