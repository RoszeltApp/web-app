import { Button, Flex, Group, Modal, NativeSelect, Radio, ScrollArea, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSquarePlus } from "@tabler/icons-react";
import AddPlaceForm from "../components/Forms/AddPlaceForm";
import AddFloorForm from "../components/Forms/AddFloorForm";
import { getAllFromDB } from "../hooks/indexedDB";
import { Product } from "../types/ProductCardTypes";
import { useEffect, useState } from "react";
import { useBuildingsList } from "../api/buildings";
import { useFloorsList } from "../api/floors";


export default function PlacementPage() {
    const [placeFormOpened, { open: openPlace, close: closePlace }] = useDisclosure(false);
    const [floorFormOpened, { open: openFloor, close: closeFloor }] = useDisclosure(false);

    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setProduct] = useState<number>();

    const [selectedBuilding, setBuilding] = useState<number>();
    const [selectedFloor, setFloor] = useState<number>();

    const { buildings, setBuildings, fetching: fetchBuildings, error, isLoading: isBuildingsLoading } = useBuildingsList();
    const { floors, setFloors, fetching: fetchFloors, isLoading: isFloorsLoading } = useFloorsList(selectedBuilding);

    useEffect(() => {
        fetchProducts()
        fetchBuildings()
        if (buildings.length > 0) {
            setBuilding(buildings[0].id);
        }
    }, [])

    useEffect(() => {
        fetchFloors(selectedBuilding)
    }, [selectedBuilding])

    const handleFloorFormSubmit = async () => {
        await fetchFloors(selectedBuilding);
        closeFloor();
    }

    const handlePlaceFormSubmit = async () => {
        await fetchBuildings();
        closePlace();
    };

    const filterBuildingByName = (build_name: string) => {
        const build_id = [...buildings].filter(building => building.name === build_name)[0]?.id;
        return build_id;
    };

    const filterFloorByName = (floor_name: string) => {
        const floor_id = [...floors].filter(floor => floor.name === floor_name)[0]?.id;
        return floor_id;
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

            <Modal opened={floorFormOpened} onClose={closeFloor} title="Добавление этажа" size='md'>
                <AddFloorForm onSubmit={handleFloorFormSubmit}></AddFloorForm>
            </Modal>

            <Flex direction={"row"} maw={"100%"}>
                <Flex w={"50%"} pl={"xl"} pr={"md"}>
                    <Text>Karta</Text>
                </Flex>
                <Flex w={"50%"} pl={"md"} pr={"xl"}>
                    <Flex direction={"column"} gap={"md"}>
                        <Stack>
                            <Text>Помещение:</Text>
                            <Group>
                                <NativeSelect data={buildings.map((building) => building.name)} w={"250px"} onChange={(event) => setBuilding(filterBuildingByName(event.currentTarget.value))}></NativeSelect>
                                <Button variant="subtle" onClick={openPlace}><IconSquarePlus width={"30px"} height={"30px"}></IconSquarePlus></Button>
                            </Group>
                        </Stack>
                        <Stack>
                            <Text>Этаж:</Text>
                            <Group>
                                <NativeSelect data={floors.map((floor) => floor.name)} w={"250px"} onChange={(event) => setFloor(filterFloorByName(event.currentTarget.value))}></NativeSelect>
                                <Button variant="subtle" onClick={openFloor}><IconSquarePlus width={"30px"} height={"30px"}></IconSquarePlus></Button>
                            </Group>
                            <Radio.Group
                                name="favoriteFramework"
                                onChange={(value) => setProduct(Number.parseInt(value))}
                                label="Компоненты"
                                description="Выберите для размещения"
                                withAsterisk
                                value={selectedProduct}
                            >
                                <ScrollArea h={200} mt={"xs"}>
                                    <Stack mt="xs">
                                        {products.map((element) => (
                                            <Radio key={element.mapping[0]?.id} label={`${element.name}\t${element.mapping[0].user.name}\t${element.mapping[0].stock.price}`} value={element.mapping[0]?.id} />
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
