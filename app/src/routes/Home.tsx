import {Fragment} from "react";
import {useNavigate} from "react-router";
import {useQuery} from '@tanstack/react-query'
import {H2} from "@jetbrains/ring-ui-built/components/heading/heading";

import {GETAuctionAll} from "@/types";
import {SearchSection} from "@/components/page/search-section";
import {Auction} from "@/components/view/home/auction";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

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

    return (
        <Fragment>
            <Header/>
            <section
                className="flex flex:1 flex:col bg:slate-95 pb:5rem">
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
            </section>
            <Footer/>
        </Fragment>
    )
}
