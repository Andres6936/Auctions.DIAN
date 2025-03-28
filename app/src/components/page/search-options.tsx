import Input from "@jetbrains/ring-ui-built/components/input/input";
import Text from "@jetbrains/ring-ui-built/components/text/text";
import Button from "@jetbrains/ring-ui-built/components/button/button";

export function SearchOptions() {
    return (
        <>
            <div
                className="flex flex:col gap-y:0.5rem p:1rem bg:white b:1px|solid|#e9ecef r:0.5rem box-shadow:2|2|3|gray-80">
                <div className="grid grid-cols:4@md gap:0.5rem">
                    <Input
                        label="Tipo de bien"
                    />

                    <Input
                        label="Tipo de inmueble"
                    />

                    <Input
                        label="Departamento"
                    />

                    <Input
                        label="Ciudad"
                    />
                </div>

                <div className="grid grid-cols:4@md gap:0.5rem">
                    <Input
                        label="Valor desde"
                    />

                    <Input
                        label="Valor hasta"
                    />

                    <Input
                        label="Fecha inicial audiencia"
                    />

                    <Input
                        label="Fecha final audiencia"
                    />
                </div>
            </div>


            <div className="text:center">
                <Text size={Text.Size.S} info>Buscar por palabra</Text>
            </div>

            <div className="flex justify-content:center align-items:center">
                <Button primary>Buscar</Button>
            </div>
        </>
    )
}