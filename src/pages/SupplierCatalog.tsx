import { ActionIcon, Container, Flex, Group, Modal, Pagination, Space, Table, TextInput, ThemeIcon, useMantineTheme } from "@mantine/core";
import { IconArrowLeft, IconArrowRight, IconExternalLink, IconSearch, IconSquarePlus, IconTrash } from "@tabler/icons-react";
import { useSuppliersProducts } from '../api/suppliersProducts';
import { useEffect } from "react";
import TableInput from "../components/UI/TableInput/TableInput";
import { useUpdateProducts } from "../api/updateProducts";
import { notifications } from '@mantine/notifications';
import { useDisclosure } from "@mantine/hooks";
import AddFileForm from "../components/Forms/AddFileForm";
import { useDeleteProduct } from "../api/deleteProducts";
import { useNavigate } from "react-router-dom";


export default function SupplierCatalog() {
    const theme = useMantineTheme();
    const { data, fetchSuppliersProducts, setData, activePage, totalPages, setActivePage, suppliersProductsIsLoading, query_string, setQuery } = useSuppliersProducts(20);

    const { fetching: update } = useUpdateProducts();
    const router = useNavigate()


    useEffect(() => {
        fetchSuppliersProducts();
    }, [])

    useEffect(() => {
        fetchSuppliersProducts();
    }, [activePage])


    const handleChange = (id: number, filed: string, value: string) => {
        update(id, filed, value).then(() => {
            notifications.show({
                id: 'successful-update',
                title: "Успешно",
                message: 'Данные успешно обновились',
                color: 'green',
            });

            let buffer = data.data;
            let inx = [...buffer].map(function (e) { return e.product.id }).indexOf(id);
            switch (filed) {
                case 'name':
                    buffer[inx].product = { ...buffer[inx].product, name: value }
                    break;
                case 'price':
                    buffer[inx].stock = { ...buffer[inx].stock, price: parseInt(value) }
                    break;
                case 'quantity':
                    buffer[inx].stock = { ...buffer[inx].stock, quantity: parseInt(value) }
                    break;

            }
            setData({ ...data, data: buffer })

        }).catch(() => {

            notifications.show({
                id: 'error-update',
                title: "Ошибка",
                message: 'Невозможно обновить данные о товаре',
                color: 'red',
            });
        });
    }

    const { fetch: deleteProductFetch } = useDeleteProduct()

    const handleDelete = (index: number, id: number) => {
        deleteProductFetch(id).then(() => {
            notifications.show({
                id: 'successful-delete',
                title: "Успешно",
                message: 'Товар удалён',
                color: 'green',
            });
            let buffer = [...data.data]
            buffer.splice(index, 1)
            setData({ ...data, data: buffer })
        }).catch(() => {
            notifications.show({
                id: 'error-delete',
                title: "Ошибка",
                message: 'Невозможно удалить товар',
                color: 'red',
            });
        })
    }

    const rows = data.data.map((element, inx) => (
        <tr key={element.product.article}>
            <th><ActionIcon onClick={() => router(`/product/${element.product_id}`)}><IconExternalLink></IconExternalLink></ActionIcon></th>
            <td>{element.product.article}</td>
            <td><TableInput text={element.product.name} onChange={e => handleChange(element.product_id, 'name', e)}></TableInput></td>
            <td>{element.product.class_product.name}</td>
            <td><TableInput text={element.stock.price.toString()} onChange={e => handleChange(element.product_id, 'price', e)}></TableInput></td>
            <td><TableInput text={element.stock.quantity.toString()} onChange={e => handleChange(element.product_id, 'quantity', e)}></TableInput></td>
            <td><ActionIcon onClick={() => handleDelete(inx, element.product_id)}><IconTrash color='red'></IconTrash></ActionIcon></td>
        </tr>
    ));

    const [opened, { open, close }] = useDisclosure(false);

    const hadnleAddProd = () => {
        close();
        fetchSuppliersProducts();
    }

    return (
        <>
            <Modal opened={opened} onClose={close} title="Добавление товара" size='xl'>
                <AddFileForm addProduct={hadnleAddProd}></AddFileForm>
            </Modal>
            <Container>
                <Flex align={'center'} direction="row" gap='md'>

                    <TextInput placeholder='Search'
                        value={query_string}
                        onChange={e => setQuery(e.target.value)}
                        radius='xl'
                        size='md'
                        w={'100%'}
                        icon={<IconSearch size="1.1rem" stroke={1.5} />}
                        rightSection={
                            <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled" onClick={fetchSuppliersProducts}>
                                {theme.dir === 'ltr' ? (
                                    <IconArrowRight size="1.1rem" stroke={1.5} />
                                ) : (
                                    <IconArrowLeft size="1.1rem" stroke={1.5} />
                                )}
                            </ActionIcon>
                        }
                        rightSectionWidth={42}
                    />
                </Flex>
                <Space h='xl'></Space>
                <Table highlightOnHover captionSide="bottom" verticalSpacing="sm">
                    <caption>
                        <Group>
                            <Pagination total={totalPages} onChange={setActivePage} value={activePage}></Pagination>
                            <ActionIcon variant="subtle" onClick={open} disabled={suppliersProductsIsLoading}><ThemeIcon><IconSquarePlus /></ThemeIcon></ActionIcon>
                        </Group>
                    </caption>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Артикул</th>
                            <th>Компонент</th>
                            <th>Категория</th>
                            <th>Цена</th>
                            <th>Количество</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </Container>
        </>
    )
}
