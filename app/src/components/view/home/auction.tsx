import Button from '@jetbrains/ring-ui-built/components/button/button';
import Text from "@jetbrains/ring-ui-built/components/text/text";
import {AuctionModel} from "@/types";
import {formatMoney} from "@/formatter/money";


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

            <div className="flex flex:col gap:0.7rem p:0.5rem">
                <div className="flex flex:row gap-x:0.5rem bg:#7de2d1 b:1px|solid|#00cecb p:0.3rem r:0.3rem">
                    <Text size={Text.Size.S}>Número del remate:</Text>
                    <Text size={Text.Size.S} bold>{model.AutoNumber}</Text>
                </div>

                <Text size={Text.Size.S} info>YOPAL - CASANARE</Text>

                <div>
                    <div className="flex flex:row gap-x:2rem">
                        <div className="flex flex:col">
                            <Text size={Text.Size.S} bold>Fecha de audiencia</Text>
                            <Text size={Text.Size.M}>2025-03-25</Text>
                        </div>

                        <div className="flex flex:col">
                            <Text size={Text.Size.S} bold>Hora audiencia</Text>
                            <Text size={Text.Size.M}>10:00</Text>
                        </div>
                    </div>
                </div>

                <div className="flex flex:row gap-x:0.5rem">
                    <Text size={Text.Size.S} bold>Avaluó del bien:</Text>
                    <Text size={Text.Size.S} bold>{formatMoney(model.TotalAppraisalValue || 0)} COP</Text>
                </div>

                <div className="flex flex:col mb:0.5rem">
                    <Text size={Text.Size.S} info>Valor base oferta</Text>
                    <Text bold>{formatMoney(model.TotalBiddingBaseValue || 0)} COP</Text>
                </div>

                <Button success>Ver</Button>
            </div>
        </div>
    )
}

export {
    Auction,
}