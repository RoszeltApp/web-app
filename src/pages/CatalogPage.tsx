import { ActionIcon, Button, Checkbox, Container, Divider, Drawer, Flex, Loader, NativeSelect, NumberInput, Pagination, ScrollArea, Space, Stack, TextInput, Title, useMantineTheme } from '@mantine/core'
import { IconArrowLeft, IconArrowRight, IconSearch, IconAdjustmentsFilled } from '@tabler/icons-react'
import { useProduct } from '../api/product'
import ProductCardItem from '../components/UI/ProductCardItem/ProductCardItem';
import { useCallback, useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useSuppliersList } from '../api/suppliersList';


export default function CatalogPage() {
    const { fetching,
        isLoading,
        data,
        totalPages,
        query_string,
        setQuery,
        price_max,
        price_min,
        setPriceMax,
        setPriceMin,
        activePage,
        setActivePage } = useProduct(3);

    const fetchCatalog = useCallback(fetching, [query_string, price_max, price_min, activePage]);


    const theme = useMantineTheme();
    const [opened, { open, close }] = useDisclosure(false);

    const { fetchSupplierList, data: supplierList } = useSuppliersList();

    const [counter, update] = useState(0);

    useEffect(() => {
        fetchCatalog();
        fetchSupplierList();
    }, [])

    useEffect(() => {
        console.log('asas')
        fetchCatalog()
    }, [activePage])

    useEffect(() => {
        fetchCatalog();
    }, [counter])

    const items = (
        <Stack>
            {
                data.data.map(prod => <ProductCardItem product={prod} key={prod.id}></ProductCardItem>)
            }
        </Stack>
    )

    const handleSearch = () => {
        setActivePage(1);
        update(counter + 1);
    }

    const dropFilters = () => {

        setPriceMin('')
        setPriceMax('');
        setActivePage(1);

        //console.log(price_max, price_min);

        //fetchCatalog();
        update(counter + 1);
        close();
    }

    const applyFilters = () => {
        setActivePage(1);
        update(counter + 1);
        //fetchCatalog();
        close();
    }

    return (
        <Container>
            <Drawer
                opened={opened}
                onClose={close}
                title="Фильтры"
                overlayProps={{ opacity: 0.5, blur: 4 }}
                position='right'
            >
                <ScrollArea mih='70vh'>


                    <Stack>

                        <Title size='md'>Фильтр по цене</Title>
                        <NumberInput
                            label="Цена от"
                            value={price_min}
                            onChange={setPriceMin}
                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                            formatter={(value) =>
                                !Number.isNaN(parseFloat(value))
                                    ? `₽ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                                    : '₽ '
                            }
                        />
                        <NumberInput
                            label="Цена до"
                            value={price_max}
                            onChange={setPriceMax}
                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                            formatter={(value) =>
                                !Number.isNaN(parseFloat(value))
                                    ? `₽ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                                    : '₽ '
                            }
                        />
                        <NativeSelect
                            data={[
                                { value: 'default', label: 'По умолчаеию' },
                                { value: 'asc', label: 'Дешевле' },
                                { value: 'desc', label: 'Дороже' }
                            ]}
                            label="Сортировка"

                        />
                        <Divider></Divider>
                        <Title size='md'>Фильтр по поставщикам</Title>
                        <ScrollArea h={250} type='always'>
                            <Stack>
                                {
                                    supplierList.map((element) => <Checkbox label={element.name} key={element.id} />)
                                }
                            </Stack>
                        </ScrollArea>
                        <Button onClick={applyFilters} disabled={isLoading}>Применить фильр</Button>
                        <Button onClick={dropFilters} disabled={isLoading}>Сбросить фильт</Button>
                    </Stack>
                </ScrollArea>
            </Drawer>

            <Flex align={'center'} direction="row" gap='md'>

                <TextInput placeholder='Search'
                    value={query_string}
                    onChange={(e) => setQuery(e.target.value)}
                    radius='xl'
                    size='md'
                    w={'100%'}
                    icon={<IconSearch size="1.1rem" stroke={1.5} />}
                    rightSection={
                        <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled" onClick={handleSearch}>
                            {theme.dir === 'ltr' ? (
                                <IconArrowRight size="1.1rem" stroke={1.5} />
                            ) : (
                                <IconArrowLeft size="1.1rem" stroke={1.5} />
                            )}
                        </ActionIcon>
                    }
                    rightSectionWidth={42}
                />
                <Button variant="outline" onClick={open}><IconAdjustmentsFilled></IconAdjustmentsFilled></Button>
            </Flex>
            <Space h='xl'></Space>
            {
                isLoading ? <Loader></Loader> : items
            }
            <Space h='xl'></Space>
            <Pagination total={totalPages} value={activePage} onChange={setActivePage} disabled={isLoading}></Pagination>

        </Container >
    )
}
