import { Button, Flex, Group, Modal, NativeSelect, Radio, ScrollArea, Select, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSquarePlus } from "@tabler/icons-react";
import AddPlaceForm from "../components/Forms/AddPlaceForm";
import AddFloorForm from "../components/Forms/AddFloorForm";
import { getAllFromDB } from "../hooks/indexedDB";
import { Product } from "../types/ProductCardTypes";
import { useEffect, useState } from "react";
import { useBuildingsList } from "../api/buildings";
import { useFloorsList } from "../api/floors";
import MyMap from "../components/UI/MyMap/MyMap";


export default function PlacementPage() {
    const [placeFormOpened, { open: openPlace, close: closePlace }] = useDisclosure(false);
    const [floorFormOpened, { open: openFloor, close: closeFloor }] = useDisclosure(false);

    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setProduct] = useState<string | undefined>();

    const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
    const [selectedFloor, setSelectedFloor] = useState<string | null>(null);

    const { buildings, setBuildings, fetching: fetchBuildings, error, isLoading: isBuildingsLoading } = useBuildingsList();
    const { floors, setFloors, fetching: fetchFloors, isLoading: isFloorsLoading } = useFloorsList();

    useEffect(() => {
        fetchProducts()
        fetchBuildings()
    }, [])

    useEffect(() => {
        setSelectedFloor(null)
        if (selectedBuilding !== null) {
            fetchFloors(selectedBuilding)
        }
    }, [selectedBuilding])

    const handleFloorFormSubmit = async () => {
        if (selectedBuilding) {
            await fetchFloors(selectedBuilding);
        }
        closeFloor();
    }

    const handlePlaceFormSubmit = async () => {
        await fetchBuildings();
        closePlace();
    };


    const fetchProducts = () => {
        getAllFromDB()
            .then((products: Product[]) => {
                if (products) {
                    setProducts(products)
                } else {
                    console.log('Object not found in IndexedDB');
                }
            })
            .catch((error: any) => {
                console.error(error);
            });
    };

    return (
        <>
            <Modal opened={placeFormOpened} onClose={closePlace} title="Добавление помещения" size='xl'>
                <AddPlaceForm onSubmit={handlePlaceFormSubmit}></AddPlaceForm>
            </Modal>

            <Modal opened={floorFormOpened} onClose={closeFloor} title="Добавление этажа" scrollAreaComponent={ScrollArea.Autosize}>
                <AddFloorForm onSubmit={handleFloorFormSubmit}></AddFloorForm>
            </Modal>

            <Flex direction={"row"}>
                <Flex w={"100%"} h={'calc(100vh - 110px)'} pl={50} pb={50}>
                    <MyMap
                        selectedFloor={[...floors].filter(e => e.id.toString() === selectedFloor)[0]}
                        selectedComponent={selectedProduct}
                    />
                </Flex>
                <Flex w={"500px"} h={'100%'} pl={"md"} pr={"xl"}>
                    <Flex direction={"column"} gap={"md"}>
                        <Stack>
                            <Text>Помещение:</Text>
                            <Group>
                                <Select data={[...buildings].map(build => {
                                    return { value: build.id.toString(), label: build.name }
                                })}
                                    w={"250px"}
                                    value={selectedBuilding}
                                    onChange={setSelectedBuilding}>

                                </Select>
                                <Button variant="subtle" onClick={openPlace}><IconSquarePlus width={"30px"} height={"30px"}></IconSquarePlus></Button>
                            </Group>
                        </Stack>
                        <Stack>
                            <Text>Этаж:</Text>
                            <Group>
                                <Select
                                    data={[...floors].map((f) => {
                                        return {
                                            value: f.id.toString(),
                                            label: f.name
                                        }
                                    })}
                                    w={"250px"}
                                    onChange={setSelectedFloor}
                                    value={selectedFloor}
                                ></Select>
                                <Button variant="subtle" onClick={openFloor}><IconSquarePlus width={"30px"} height={"30px"}></IconSquarePlus></Button>
                            </Group>
                            <Radio.Group
                                name="favoriteFramework"
                                onChange={setProduct}
                                label="Компоненты"
                                description="Выберите для размещения"
                                withAsterisk
                                value={selectedProduct}
                            >
                                <ScrollArea h={200} mt={"xs"}>
                                    <Stack mt="xs">
                                        {products.map((element) => (
                                            <Radio key={element.mapping[0].id} label={`${element.name}\t${element.mapping[0].user.name}\t${element.mapping[0].stock.price}`} value={element.mapping[0].id.toString()} />
                                        )
                                        )}
                                    </Stack>
                                </ScrollArea>
                            </Radio.Group>
                        </Stack>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}
