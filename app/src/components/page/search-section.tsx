import {H1} from "@jetbrains/ring-ui-built/components/heading/heading";
import {SearchOptions} from "@/components/page/search-options";

export function SearchSection() {
    return (
        <div className="flex flex:col bg:#f8f9fa bb:1px|solid|#dee2e6 justify-content:center align-items:center">
            <div className="flex flex:col gap:2rem p:1.5rem py:4rem">
                <H1>Encuentra bienes en remate</H1>
                <SearchOptions/>
            </div>
        </div>
    )
}