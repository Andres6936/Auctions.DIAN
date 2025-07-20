import Dock from "@/components/dock";
import {Archive, Home as HomeIcon, Settings, User} from "lucide-react";
import {useNavigate} from "react-router";
import {H2} from "@jetbrains/ring-ui-built/components/heading/heading";
import {SearchSection} from "@/components/page/search-section";
import {useQuery} from '@tanstack/react-query'
import {GETAuctionAll} from "@/types";
import {Auction} from "@/components/view/home/auction";

const getAuctions = async () => {
    const stream = await fetch('/api/auctions/all', {
        method: "GET"
    })
    return await stream.json() as GETAuctionAll;
}

export function Home() {
    const navigate = useNavigate();

    const query = useQuery({
        queryKey: ["/api/auctions/all"],
        queryFn: getAuctions,
    })

    const items = [
        {
            icon: <HomeIcon size={18} className="color:white"/>,
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
                        <Auction key={auction.IdAuto} model={auction}/>
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
