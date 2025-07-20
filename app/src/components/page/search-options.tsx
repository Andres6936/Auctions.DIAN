import {Button, TextInput} from "@mantine/core";


export function SearchOptions() {
    return (
        <>
            <div
                className="flex flex:col gap-y:0.5rem p:1rem bg:white b:1px|solid|#e9ecef r:0.5rem box-shadow:2|2|3|gray-80">
                <div className="grid grid-cols:4@md gap:0.5rem">
                    <TextInput
                        size="xs"
                        label="Tipo de bien"
                    />

                    <TextInput
                        size="xs"
                        label="Tipo de inmueble"
                    />

                    <TextInput
                        size="xs"
                        label="Departamento"
                    />

                    <TextInput
                        size="xs"
                        label="Ciudad"
                    />
                </div>

                <div className="grid grid-cols:4@md gap:0.5rem">
                    <TextInput
                        size="xs"
                        label="Valor desde"
                    />

                    <TextInput
                        size="xs"
                        label="Valor hasta"
                    />

                    <TextInput
                        size="xs"
                        label="Fecha inicial audiencia"
                    />

                    <TextInput
                        label="Fecha final audiencia"
                    />
                </div>
            </div>


            <div className="text:center">
                <p className="opacity:0.5 font-size:0.75rem">Buscar por palabra</p>
            </div>

            <div className="flex justify-content:center align-items:center">
                <Button variant="filled">Buscar</Button>
            </div>
        </>
    )
}