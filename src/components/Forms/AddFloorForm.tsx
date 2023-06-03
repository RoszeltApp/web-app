import { Button, FileButton, Flex, TextInput, Text, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { SetStateAction, useEffect, useState } from "react";
import { useAddFloor } from "../../api/floors";
import { useBuildingsList } from "../../api/buildings";


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

    const { fetching } = useAddFloor()
    const { buildings, fetching: fetchPlacements } = useBuildingsList();

    const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);


    useEffect(() => {
        console.log(auditory)
    }, [auditory])

    useEffect(() => {
        fetchPlacements();
    }, []);

    useEffect(() => {
        if (buildings.length > 0) {
            setSelectedBuilding(buildings[0].id.toString());
        }
    }, [buildings])

    const form = useForm({
        initialValues: {
            name: '',
        },
        validate: {
            name: (value) => (value.length === 0 ? "Поле должно быть заполнено" : null),
        }
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (form.isValid()) {
            if (selectedBuilding) {

                fetching(form.values.name,
                    selectedBuilding,
                    auditory,
                    door,
                    stair,
                    window,
                    Pol,
                    foundation,
                    innerWall,
                    outerWall).then(() => {
                        onSubmit();
                    });
            } else {
                form.setFieldError('name', 'Выберите помещение')
            }
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
                    <Select data={[...buildings].map(build => {
                        return { value: build.id.toString(), label: build.name }
                    })}
                        w={"250px"}
                        value={selectedBuilding}
                        onChange={setSelectedBuilding}>

                    </Select>
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