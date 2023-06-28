import { useEffect, useState } from 'react'
import "mapbox-gl/dist/mapbox-gl.css"
import ReactMapGL, { Layer, MapLayerMouseEvent, Marker, Popup, Source } from 'react-map-gl';
import { ComponentLayerResponse, FloorResponse } from '../../../types/gis';
import { usePoligoneLayer } from '../../../api/poligonLayer';
import { useComponentsLayer } from '../../../api/componentsLayer';
import { Button, Card, Image, Stack, Text, Tooltip } from '@mantine/core';
import {
    IconDevicesPc, IconTrash,
    IconRouter, IconDatabase,
    IconDeviceLaptop, IconDeviceDesktopAnalytics,
    IconPrinter, IconDeviceImac, IconSlideshow
} from '@tabler/icons-react';
import { getImageScr } from '../ProductCardItem/ProductCardItem';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';


const TOKEN = 'pk.eyJ1IjoiZmxhc2hiYWNrMTIiLCJhIjoiY2t4ZnY3bzlpMGpndzJ2bnh3d2dzaXZjMiJ9.7uhYlLAyknBaL2OaHaRVfQ'

interface Props {
    selectedFloor: FloorResponse
    selectedComponent: string | undefined,
    selectedLayers: string[],
}

export default function MyMap({ selectedFloor, selectedComponent, selectedLayers }: Props) {
    const [viewport] = useState({
        latitude: 54.736736,
        longitude: 55.952719,
        zoom: 10,
    });

    const [doors, setDoors] = useState();
    const [windows, setWindows] = useState();
    const [foundation, setFoundation] = useState();
    const [walls_outer, setWallsOuter] = useState();
    const [auditories, setAuditories] = useState();
    const [stairs, setStairs] = useState();
    const [Pol, setPol] = useState();
    const [walls_inter, setWallsInter] = useState();

    const { getLayer: fetchDoors } = usePoligoneLayer(setDoors)
    const { getLayer: fetchWindows } = usePoligoneLayer(setWindows)
    const { getLayer: fetchFoundation } = usePoligoneLayer(setFoundation)
    const { getLayer: fetchWallsOuter } = usePoligoneLayer(setWallsOuter)
    const { getLayer: fetchAuditories } = usePoligoneLayer(setAuditories)
    const { getLayer: fetchStairs } = usePoligoneLayer(setStairs)
    const { getLayer: fetchPol } = usePoligoneLayer(setPol)
    const { getLayer: fetchWallsInter } = usePoligoneLayer(setWallsInter)

    const { compList, fetchAddComp, fetchCompLayer, fetchDelComp, clear } = useComponentsLayer();
    const [selectedMark, setSelectedMark] = useState<ComponentLayerResponse | null>(null);

    const clearPoligons = () => {
        setDoors(undefined);
        setWindows(undefined);
        setFoundation(undefined);
        setWallsInter(undefined);
        setWallsOuter(undefined);
        setAuditories(undefined);
        setStairs(undefined);
        setPol(undefined);
        clear();
    }

    useEffect(() => {
        if (selectedFloor) {
            fetchDoors(selectedFloor.doors);
            fetchWindows(selectedFloor.windows);
            fetchFoundation(selectedFloor.foundation);
            fetchWallsOuter(selectedFloor.walls_outer);
            fetchAuditories(selectedFloor.auditories)
            fetchStairs(selectedFloor.stairs);
            fetchPol(selectedFloor.Pol);
            fetchWallsInter(selectedFloor.walls_inter);
            fetchCompLayer(selectedFloor.id)
        } else {
            clearPoligons()
        }
    }, [selectedFloor])


    const checkPoligonsDownload = () => {
        return doors && windows && foundation && walls_outer && auditories && stairs && Pol && walls_inter;
    }

    const handleClick = (e: MapLayerMouseEvent) => {
        if (selectedComponent) {
            console.log(e.features, e)
            fetchAddComp(selectedFloor.id, selectedComponent, e.lngLat.lat, e.lngLat.lng).then(() => {
                notifications.show({
                    id: 'successful-add',
                    title: "Успешно",
                    message: 'Компонент размещён',
                    color: 'green',
                });
                setSelectedMark(null);
                fetchCompLayer(selectedFloor.id);
            }).catch(() => {
                notifications.show({
                    id: 'nonsuccessful-add',
                    title: "Ошибка",
                    message: 'Невозможно разместить компонент',
                    color: 'red',
                });
            })
        }
    }
    const components = {
        IconDevicesPc, IconTrash,
        IconRouter, IconDatabase,
        IconDeviceLaptop, IconDeviceDesktopAnalytics,
        IconPrinter, IconDeviceImac, IconSlideshow
    } as any

    const router = useNavigate()

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ReactMapGL
                initialViewState={viewport}
                mapboxAccessToken={TOKEN}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                doubleClickZoom={false}
                onDblClick={handleClick}
            >
                {selectedFloor && checkPoligonsDownload() && (
                    <>
                        <Source type='geojson' id='Pol' data={Pol}>
                            <Layer type='fill' paint={{ "fill-color": "#4EED72" }}></Layer>
                        </Source>

                        <Source type='geojson' id='doors' data={doors}>
                            <Layer type='fill' paint={{ "fill-color": "#FF00D1" }}></Layer>
                        </Source>


                        <Source type='geojson' id='foundation' data={foundation}>
                            <Layer type='fill' paint={{ "fill-color": "#F36909" }}></Layer>
                        </Source>

                        <Source type='geojson' id='walls_outer' data={walls_outer}>
                            <Layer type='fill' paint={{ "fill-color": "#DC3965" }}></Layer>
                        </Source>

                        <Source type='geojson' id='auditories' data={auditories}>
                            <Layer type='fill' paint={{ "fill-color": "#EED274" }}></Layer>
                        </Source>

                        <Source type='geojson' id='stairs' data={stairs}>
                            <Layer type='fill' paint={{ "fill-color": "#AD489C" }}></Layer>
                        </Source>



                        <Source type='geojson' id='walls_inter' data={walls_inter}>
                            <Layer type='fill' paint={{ "fill-color": "#DC3965" }}></Layer>
                        </Source>

                        <Source type='geojson' id='windows' data={windows}>
                            <Layer type='fill' paint={{ "fill-color": "#35ABD7" }}></Layer>
                        </Source>

                    </>

                )}

                {selectedFloor && compList.length !== 0 && (
                    [...compList].filter(
                        (Mark) => selectedLayers.indexOf(Mark.product_offer.product.class_product.name) !== -1).map((Mark) => {

                            const CustomTag = components[Mark.product_offer.product.class_product.class_icon];
                            return (
                                <Marker latitude={Mark.lat} longitude={Mark.long} key={Mark.id} onClick={() => setSelectedMark(Mark)}>
                                    <Button variant='Subtle' c={'black'}>
                                        <CustomTag сolor={'red'}></CustomTag>

                                    </Button>
                                </Marker>
                            )
                        })

                )}

                {selectedMark && (
                    <Popup latitude={selectedMark.lat}
                        longitude={selectedMark.long}
                        onClose={() => setSelectedMark(null)}
                        closeOnClick={false}>


                        <Card shadow="sm" padding="lg" radius="md" withBorder >
                            <Card.Section component="a" >
                                <Image
                                    src={getImageScr(selectedMark.product_offer.image)}
                                    height={160}
                                    alt="Norway"
                                    fit="fill"
                                />
                            </Card.Section>

                            <Stack pt={10}>
                                <Tooltip label={selectedMark.product_offer.product.class_product.name}>
                                    <Text size={'md'} lineClamp={3} fw={700}>{selectedMark.product_offer.product.name}</Text>
                                </Tooltip>
                                <Text weight={500}>Компонент от поставщика</Text>
                                <Text weight={500} >Класс компонента: <Text weight={500} fw={700}>{selectedMark.product_offer.product.class_product.name}</Text></Text>
                            </Stack>


                            <Stack>
                                <div>
                                    <Text size={'md'}>Стоимость компонента</Text>
                                    <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
                                        ₽{selectedMark.product_offer.stock.price}
                                    </Text>
                                </div>

                                <Button radius="xl" leftIcon={<IconTrash ></IconTrash>}
                                    onClick={() => {
                                        fetchDelComp(selectedMark.id).then(() => {
                                            notifications.show({
                                                id: 'successful-delete',
                                                title: "Успешно",
                                                message: 'Компонент удалён',
                                                color: 'green',
                                            });
                                            setSelectedMark(null);
                                            fetchCompLayer(selectedFloor.id);
                                        }).catch(() => {
                                            notifications.show({
                                                id: 'nonsuccessful-delete',
                                                title: "Ошибка",
                                                message: 'Данные успешно обновились',
                                                color: 'red',
                                            });
                                        })
                                    }}>
                                    Удалить
                                </Button>
                                <Button radius="xl" onClick={() => router(`/product/${selectedMark.product_offer.product_id}`)}>
                                    Информация
                                </Button>
                            </Stack>
                        </Card>
                    </Popup>
                )}


            </ReactMapGL>
        </div>
    )
}
