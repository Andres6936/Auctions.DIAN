import {ChevronLeft} from "@/icons/ChevronLeft";
import {ListIcon} from "@/icons/List";
import {useNavigate} from "react-router";

export function Employee() {
    const navigate = useNavigate();

    return (
        <section className="flex flex:1 flex:col h:100vh max-h:100vh w:100vw max-w:100vw bg:slate-95 font:sans">
            <div className="position:relative flex:1">
                <img className="w:100%" src="/public/img/KevinSpace.jpg" alt="Photo"/>

                <div
                    onClick={() => navigate(-1)}
                    className="position:absolute top:15 left:15 py:0.8rem px:1rem bg:rgba(255,255,255,0.2) bd:blur(12px) r:0.5rem">
                    <ChevronLeft className={"color:white"}/>
                </div>

                <div
                    className="position:absolute top:15 right:15 py:0.8rem px:1rem bg:rgba(255,255,255,0.2) bd:blur(12px) r:0.5rem">
                    <ListIcon className={"color:white"}/>
                </div>
            </div>

            <section className="px:1.5rem r:2rem flex flex:col translateY(-3rem) bg:slate-95">
                <h1 className="font-size:2rem font:sans mb:0">Kevin Space</h1>
                <h4 className="font-size:1.2rem opacity:0.5 font-weight:medium font:sans mt:0">President of America</h4>

                <div className="flex flex:col mt:1rem mb:2rem gap-y:0.5rem">
                    <div className="flex flex:col">
                        <p className={"m:0 opacity:0.8"}>Biologic Gender</p>
                        <p className={"m:0 font-size:1.3rem font-weight:bold"}>Masculine</p>
                    </div>

                    <div className="flex flex:row gap-x:2rem">
                        <div className="flex flex:col">
                            <p className={"m:0 opacity:0.8"}>Date Born</p>
                            <p className={"m:0 font-size:1.3rem font-weight:bold"}>1965/04/02</p>
                        </div>

                        <div className="flex flex:col">
                            <p className={"m:0 opacity:0.8"}>Start Date</p>
                            <p className={"m:0 font-size:1.3rem font-weight:bold"}>2001/05/14</p>
                        </div>
                    </div>

                    <div className="flex flex:col">
                        <p className={"m:0 opacity:0.8"}>Salary</p>
                        <p className={"m:0 font-size:1.3rem font-weight:bold"}>$ 1,200.0</p>
                    </div>
                </div>

                <button className="bg:blue-50 color:white py:0.5rem font-size:1L.2rem r:1rem b:none">Modify</button>
            </section>
        </section>
    );
}
