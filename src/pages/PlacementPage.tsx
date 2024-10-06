import { Button, Checkbox, Flex, Group, Modal, Radio, ScrollArea, Select, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDatabase, IconDeviceDesktopAnalytics, IconDeviceImac, IconDeviceLaptop, IconDevicesPc, IconPrinter, IconRouter, IconSlideshow, IconSquarePlus, IconTrash } from "@tabler/icons-react";
import AddPlaceForm from "../components/Forms/AddPlaceForm";
import AddFloorForm from "../components/Forms/AddFloorForm";
import { getAllFromDB } from "../hooks/indexedDB";
import { Product } from "../types/ProductCardTypes";
import { useEffect, useState } from "react";
import { useBuildingsList } from "../api/buildings";
import { useFloorsList } from "../api/floors";
import MyMap from "../components/UI/MyMap/MyMap";
import { useClasses } from "../api/Classes";


export default function PlacementPage() {
    const { fetchClasses, classList } = useClasses();

    const [placeFormOpened, { open: openPlace, close: closePlace }] = useDisclosure(false);
    const [floorFormOpened, { open: openFloor, close: closeFloor }] = useDisclosure(false);

    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setProduct] = useState<string | undefined>();

    const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
    const [selectedFloor, setSelectedFloor] = useState<string | null>(null);

    const { buildings, fetching: fetchBuildings } = useBuildingsList();
    const { floors, fetching: fetchFloors } = useFloorsList();

    const [selected_layers_comp, setLayerComp] = useState<string[]>([])

    useEffect(() => {
        setLayerComp([...classList].map((e) => e.name))
    }, [classList])

    useEffect(() => {
        fetchProducts()
        fetchBuildings()
        fetchClasses()
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

    const components = {
        IconDevicesPc, IconTrash,
        IconRouter, IconDatabase,
        IconDeviceLaptop, IconDeviceDesktopAnalytics,
        IconPrinter, IconDeviceImac, IconSlideshow
    } as any


    return (
        <>
            <Modal opened={placeFormOpened} onClose={closePlace} title="Добавление помещения" size='xl'>
                <AddPlaceForm onSubmit={handlePlaceFormSubmit}></AddPlaceForm>
            </Modal>

            <Modal opened={floorFormOpened} onClose={closeFloor} title="Добавление этажа" scrollAreaComponent={ScrollArea.Autosize}>
                <AddFloorForm onSubmit={handleFloorFormSubmit}></AddFloorForm>
            </Modal>

            <Flex direction={"row"}>
                <Flex w={'450px'} h={'100%'} pl={50} pb={50} direction={'column'}>
                    <Text fw={700}>Условные обозначения:</Text>
                    <Group position="apart"><div>Полы</div><div style={{ width: '30px', height: '10px', backgroundColor: '#4EED72' }}></div></Group>
                    <Group position="apart"><div>Двери</div><div style={{ width: '30px', height: '10px', backgroundColor: '#FF00D1' }}></div> </Group>
                    <Group position="apart"><div>Фундамент</div><div style={{ width: '30px', height: '10px', backgroundColor: '#F36909' }}></div> </Group>
                    <Group position="apart"><div>Внутр. стены</div><div style={{ width: '30px', height: '10px', backgroundColor: '#DC3965' }}></div></Group>
                    <Group position="apart"><div>кабинеты</div><div style={{ width: '30px', height: '10px', backgroundColor: '#EED274' }}></div></Group>
                    <Group position="apart"><div>Лестницы</div><div style={{ width: '30px', height: '10px', backgroundColor: '#AD489C' }}></div></Group>
                    <Group position="apart"><div>Внеш. Стены</div><div style={{ width: '30px', height: '10px', backgroundColor: '#DC3965' }}></div></Group>
                    <Group position="apart"><div>Окна</div><div style={{ width: '30px', height: '10px', backgroundColor: '#35ABD7' }}></div></Group>

                    <Text fw={700}>Слои компонентов:</Text>
                    <Checkbox.Group value={selected_layers_comp} onChange={setLayerComp}>
                        {
                            classList.map((class_comp) => {
                                const CustomTag = components[class_comp.class_icon];
                                return (
                                    <Group key={class_comp.id} position="apart" noWrap={true}>
                                        <Checkbox key={class_comp.id} label={class_comp.name} pb={'5px'} value={class_comp.name}></Checkbox>
                                        <CustomTag ></CustomTag>
                                    </Group>
                                )
                            })
                        }
                    </Checkbox.Group>

                </Flex>
                <Flex w={"100%"} h={'calc(100vh - 110px)'} pl={50} pb={50}>
                    <MyMap
                        selectedFloor={[...floors].filter(e => e.id.toString() === selectedFloor)[0]}
                        selectedComponent={selectedProduct}
                        selectedLayers={selected_layers_comp}
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
