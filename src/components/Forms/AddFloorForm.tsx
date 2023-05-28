import { Button, FileButton, Flex, TextInput, Text, NativeSelect } from "@mantine/core";
import { useForm } from "@mantine/form";
import { SetStateAction, useEffect, useState } from "react";
import { useAddFloor } from "../../api/floors";
import { useBuildingsList } from "../../api/buildings";

interface FormType {
    doors: string,
    windows: string,
    foundation: string,
    walls_outer: string,
    build_id: number,
    auditories: string,
    stairs: string,
    Pol: string,
    walls_inter: string,
    name: string,
}

interface LoadFileProps {
    title: string,
    state: File | null,
    setState: (value: SetStateAction<File | null>) => void,
}


function LoadFileElement({ title, state, setState }: LoadFileProps) {
    return (
        <Flex direction={"column"} gap={"xs"}>
            <Text fw={500} fz={"sm"}>
                {title}
            </Text>
            <Flex direction={"row"} gap={"md"}>
                <FileButton onChange={(file) => setState(file)} accept="application/json">
                    {(props) => <Button {...props}>Загрузить</Button>}
                </FileButton>
                {state && (
                    <Text size="sm" align="center" mt="sm" c={"green"} fs="italic">
                        Файл: {state.name}
                    </Text>
                )}
            </Flex>
        </Flex >
    )
}

export default function AddFloorForm({ onSubmit }: { onSubmit: () => void }) {
    const [auditory, setAuditory] = useState<File | null>(null);
    const [door, setDoor] = useState<File | null>(null);
    const [stair, setStair] = useState<File | null>(null);
    const [window, setWindow] = useState<File | null>(null);
    const [Pol, setPol] = useState<File | null>(null);
    const [foundation, setFoundation] = useState<File | null>(null);
    const [innerWall, setInnerWall] = useState<File | null>(null);
    const [outerWall, setOuterWall] = useState<File | null>(null);

    const { fetching, isLoading, error } = useAddFloor()
    const { buildings, setBuildings, fetching: fetchPlacements, isLoading: isBuildingsLoading } = useBuildingsList();

    const [selectedBuilding, setBuilding] = useState<number>(0);

    const filterBuildingByName = (build_name: string) => {
        const filteredBuildings = buildings.filter(building => building.name === build_name);
        if (filteredBuildings.length > 0) {
            return filteredBuildings[0].id;
        }
        return 0;
    };

    useEffect(() => {
        console.log(auditory)
    }, [auditory])

    useEffect(() => {
        fetchPlacements();
        if (buildings.length > 0) {
            setBuilding(buildings[0].id);
        }
    }, []);

    const form = useForm({
        initialValues: {
            name: '',
            doors: '',
            windows: '',
            foundation: '',
            walls_outer: '',
            build_id: selectedBuilding,
            auditories: '',
            stairs: '',
            Pol: '',
            walls_inter: '',
        },
        validate: {
            build_id: (value) => (value === 0 ? "Поле должно быть выбрано" : null),
            name: (value) => (value.length === 0 ? "Поле должно быть заполнено" : null),
        }
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (form.isValid()) {
            const data = {
                doors: form.values.doors,
                windows: form.values.windows,
                foundation: form.values.foundation,
                walls_outer: form.values.walls_outer,
                build_id: form.values.build_id,
                auditories: form.values.auditories,
                stairs: form.values.stairs,
                Pol: form.values.Pol,
                walls_inter: form.values.walls_inter,
                name: form.values.name,
            };
            fetching(data).then(() => {
                console.log(data);
                onSubmit();
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Flex direction={"column"} gap={"xs"} mb={"md"}>
                <TextInput
                    placeholder="Наименование"
                    label="Этаж"
                    withAsterisk
                    {...form.getInputProps('name')}
                />
                <Flex direction={"column"} gap={"xs"}>
                    <Text fz="sm" fw={500}>Помещение</Text>
                    <NativeSelect data={buildings.map((building) => building.name)} onChange={(event) => setBuilding(filterBuildingByName(event.currentTarget.value))}></NativeSelect>
                </Flex>
                <LoadFileElement title="Аудитории" state={auditory} setState={setAuditory} />
                <LoadFileElement title="Двери" state={door} setState={setDoor} />
                <LoadFileElement title="Лестницы" state={stair} setState={setStair} />
                <LoadFileElement title="Окна" state={window} setState={setWindow} />
                <LoadFileElement title="Пол" state={Pol} setState={setPol} />
                <LoadFileElement title="Фундамент" state={foundation} setState={setFoundation} />
                <LoadFileElement title="Стены внутренние" state={innerWall} setState={setInnerWall} />
                <LoadFileElement title="Стены внешние" state={outerWall} setState={setOuterWall} />
            </Flex>
            <Button type="submit" variant="outline" w={"100%"}>Сохранить</Button>
        </form>
    );
}