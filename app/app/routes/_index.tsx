import type {V2_MetaFunction} from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
    return [{title: "New Remix App"}];
};

export default function Index() {
    return (
        <main className="p:0.5rem flex flex:col bg:slate-95">
            <section className="flex flex:col">
                <h1 className="font-size:2rem opacity:0.5 font:sans font-weight:400">Personal Date</h1>

                <div className="flex flex:col my:1rem gap-y:0.5rem">
                    <div className="flex flex:row align-items:center">
                        <label className="flex:2">Name</label>
                        <input className="flex:5 r:1rem py:0.5rem b:1px|solid|#CCC" type="text" readOnly/>
                    </div>

                    <div className="flex flex:row">
                        <label className="flex:2">Last</label>
                        <input className="flex:5" type="text" readOnly/>
                    </div>

                    <div className="flex flex:row">
                        <label className="flex:2">Gender</label>
                        <input className="flex:5" type="text" readOnly/>
                    </div>

                    <div className="flex flex:row">
                        <label className="flex:2">Date Born</label>
                        <input className="flex:5" type="text" readOnly/>
                    </div>

                    <div className="flex flex:row">
                        <label className="flex:2">Date Start</label>
                        <input className="flex:5" type="text" readOnly/>
                    </div>
                </div>
                <div className="offset-sm-1 col-sm-4 mt-3 mt-sm-0">
                    <img className="w:100%" src="img/KevinSpace.jpg" alt="Photo"/>
                </div>
            </section>

            <section className="flex flex:col">
                <h5 className="card-title col-12 border-bottom">Salary</h5>
                <label htmlFor="input-salary" className="col-sm-4 col-4 text-center col-form-label">Salary</label>
                <div className="input-group col-sm-4 col-8">
                    <div className="input-group-prepend">
                        <span className="input-group-text">$</span>
                    </div>
                    <input id="input-salary" className="form-control" type="text"/>
                </div>
                <button className="col-sm-4 col-12 mt-3 mt-sm-0 btn btn-primary">Modify</button>
            </section>

            <section className="flex flex:col">
                <h5 className="card-title col-12 border-bottom">Calculus</h5>

                <div className="col-7 col-sm-6">
                    <button className="col-12 btn btn-block btn-outline-primary text-nowrap">Calculate Age</button>
                    <button className="col-12 btn btn-block btn-outline-primary text-nowrap">Calculate Old</button>
                    <button className="col-12 btn btn-block btn-outline-primary text-nowrap">Calculate Pre</button>
                </div>

                <div className="col-5 col-sm-6">
                    <label className="col-12">
                        <input className="form-control" type="text" readOnly/>
                    </label>
                    <label className="col-12">
                        <input className="form-control" type="text" readOnly/>
                    </label>
                    <label className="col-12">
                        <input className="form-control" type="text" readOnly/>
                    </label>
                </div>
            </section>

            <section className="flex flex:col">
                <h5 className="card-title col-12 border-bottom">Extension Points</h5>

                <div className="col-6">
                    <button className="btn btn-block btn-outline-secondary">Option 1</button>
                </div>

                <div className="col-6">
                    <button className="btn btn-block btn-outline-secondary">Option 2</button>
                </div>
            </section>
        </main>
    );
}
