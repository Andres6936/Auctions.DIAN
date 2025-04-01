import Dock from "@/components/dock";
import {Archive, Home, Settings, User} from "lucide-react";
import {useNavigate} from "react-router";
import {useUser} from "@stackframe/react";
import Button from '@jetbrains/ring-ui-built/components/button/button';
import {H2} from "@jetbrains/ring-ui-built/components/heading/heading";
import Text from "@jetbrains/ring-ui-built/components/text/text";
import {SearchSection} from "@/components/page/search-section";
import {useQuery} from '@tanstack/react-query'
import {AuctionModel, GETAuctionAll} from "@/types";
import {formatMoney} from "@/formatter/money";

const getAuctions = async () => {
    const stream = await fetch('/api/auctions/all', {
        method: "GET"
    })
    return await stream.json() as GETAuctionAll;
}

export function Main() {
    useUser({or: "redirect"});

    const navigate = useNavigate();

    const query = useQuery({
        queryKey: ["/api/auctions/all"],
        queryFn: getAuctions,
    })

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
        <section
            className="flex flex:1 flex:col h:100vh max-h:100vh w:100vw max-w:100vw overflow:auto bg:slate-95 font:sans pb:5rem">
            <SearchSection/>

            <div className="flex flex:col p:1.5rem gap:2rem justify-content:center align-items:center">
                <div className="text:center">
                    <H2>Proximas audiencias</H2>
                </div>

                <div className="grid grid-cols:3@md grid-cols:4@3xl gap:1.5rem">
                    {query.data && query.data.body.Items.map((auction) =>
                        <Auction model={auction}/>
                    )}
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

function Auction({model}: { model: AuctionModel }) {
    return (
        <div className="flex flex:col gap:0.7rem p:1.5rem bg:#f8f9fa border:1px|solid|#e9ecef r:0.5rem">
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
    )
}