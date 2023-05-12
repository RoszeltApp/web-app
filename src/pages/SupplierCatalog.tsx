import { ActionIcon, Container, Flex, Space, Table, TextInput, useMantineTheme } from "@mantine/core";
import { IconArrowLeft, IconArrowRight, IconSearch } from "@tabler/icons-react";
import { useSuppliersProducts } from '../api/suppliersProducts';
import { useEffect } from "react";
import TableInput from "../components/UI/TableInput/TableInput";


export default function SupplierCatalog() {
    const theme = useMantineTheme();
    const { data, fetchSuppliersProducts, setData } = useSuppliersProducts(10);

    useEffect(() => {
        fetchSuppliersProducts();
    }, [])

    const handleChange = (id: number, filed: string, value: string) => {
        switch (filed) {
            case 'name':
                let buffer = data.data;
                buffer[id].product = { ...buffer[id].product, name: value }
                break;
            case 'price':
                break;
            case 'quantity':
                break;
        }
        //setData()
    }

    const rows = data.data.map((element) => (
        <tr key={element.product.article}>
            <td>{element.product.article}</td>
            <td><TableInput text={element.product.name} onChange={e => console.log(e)}></TableInput></td>
            <td>{element.product.class_id}</td>
            <td><TableInput text={element.stock.price.toString()} onChange={e => console.log(e, element.product.article)}></TableInput></td>
            <td><TableInput text={element.stock.quantity.toString()} onChange={e => console.log(e)}></TableInput></td>
        </tr>
    ));


    return (
        <Container>
            <Flex align={'center'} direction="row" gap='md'>

                <TextInput placeholder='Search'

                    radius='xl'
                    size='md'
                    w={'100%'}
                    icon={<IconSearch size="1.1rem" stroke={1.5} />}
                    rightSection={
                        <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
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
            <Table>
                <thead>
                    <tr>
                        <th>Артикул</th>
                        <th>Товар</th>
                        <th>Категория</th>
                        <th>Цена</th>
                        <th>Количество</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </Container>
    )
}
