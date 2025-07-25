import {AuctionModel} from "@/types";
import {formatMoney} from "@/formatter/money";
import {Button} from "@mantine/core";


function Auction({model}: { model: AuctionModel }) {
    return (
        <div className="flex flex:col gap:0.7rem p:0.3rem bg:#f8f9fa border:1px|solid|#e9ecef r:0.5rem">
            <div className="rel bg:#dee2e6 w:full video r:0.5rem">
                <div className="abs top:0 left:0 bottom:0 right:0 w:full h:full r:0.5rem">
                    {model.Images && model.Images.length > 0 && (
                        <img
                            className="w:full h:full object:cover r:0.5rem"
                            src={"http://localhost:9000/public" + model.Images[0].ImageStorageUrl}
                            alt="Image"
                        />
                    )}
                </div>
            </div>

            <div className="flex flex:col gap:0.7rem p:0.5rem font-size:0.85rem">
                <div className="flex flex:row gap-x:0.5rem bg:#7de2d1 b:1px|solid|#00cecb p:0.3rem r:0.3rem">
                    <p>Número del remate:</p>
                    <p className="font:bold">{model.AutoNumber}</p>
                </div>

                <p className="opacity:0.5">YOPAL - CASANARE</p>

                <div>
                    <div className="flex flex:row gap-x:2rem">
                        <div className="flex flex:col">
                            <p className="font:bold">Fecha de audiencia</p>
                            <p>2025-03-25</p>
                        </div>

                        <div className="flex flex:col">
                            <p className="font:bold">Hora audiencia</p>
                            <p>10:00</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex:row gap-x:0.5rem">
                    <p className="font:bold">Avaluó del bien:</p>
                    <p className="font:bold">{formatMoney(model.TotalAppraisalValue || 0)} COP</p>
                </div>

                <div className="flex flex:col mb:0.5rem">
                    <p>Valor base oferta</p>
                    <p className="font:bold">{formatMoney(model.TotalBiddingBaseValue || 0)} COP</p>
                </div>

                <Button>Ver</Button>
            </div>
        </div>
    )
}

export {
    Auction,
}