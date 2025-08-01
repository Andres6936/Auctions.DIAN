import {SearchOptions} from "@/components/page/search-options";
import {Button} from "@mantine/core";

export function SearchSection() {
    return (
        <div className="rel flex flex:col bg:#f8f9fa bb:1px|solid|#dee2e6 justify-content:center align-items:center overflow:clip">
            <div
                className="abs top:0 left:0 w:full h:full bg:#f8f9fa"
                style={{
                    backgroundImage: `
                      radial-gradient(closest-side, transparent, #f8f9fa),
                      linear-gradient(to right, #cccccc50 1px, transparent 1px),
                      linear-gradient(to bottom, #cccccc50 1px, transparent 1px)
                    `,
                    backgroundSize: 'cover, 50px 50px, 50px 50px',
                    backgroundRepeat: 'no-repeat, repeat, repeat',
                    transform: 'scale(2) rotateX(60deg) rotateZ(20deg)',
                }}
            />

            <div className="flex flex:col gap:2rem p:1.5rem py:4rem z:9">
                <h1 className="font:bold">Encuentra bienes en remate</h1>
                <SearchOptions/>
            </div>

            <div className="abs top:2.5rem right:2.5rem flex">
                <Button>
                    Ingresar
                </Button>
            </div>
        </div>
    )
}