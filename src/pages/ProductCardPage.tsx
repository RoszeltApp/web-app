import { useParams } from 'react-router-dom'
import { useMantineTheme, Flex, Text, Group, Container, Tabs, Stack, Divider } from "@mantine/core";
import { Product } from '../types/ProductCardTypes';
import { useEffect, useState } from 'react';
import { useCard } from '../api/product';
import ProductCardView from '../components/UI/ProductCardView/ProductCardViews';

interface FormatProps {
    id: number,
    product: Product
}
function ProductCardPanel({ id, product }: FormatProps) {
    const theme = useMantineTheme()
    console.log(product)
    return (
        <Flex align={'flex-start'} gap={'xl'}>
            <ProductCardView product_name={product.name} product_article={product.article} media={product.mapping[id].media}></ProductCardView>
            <Stack w={"100%"}>
                <h3>Категория:</h3>
                <Text>12312</Text>
                <Divider></Divider>
                <Group grow>
                    <div>
                        <h3>Цена:</h3>
                        <Text c={theme.primaryColor} fw={600}>{product.mapping[id].stock.price} ₽</Text>
                    </div>
                    <div>
                        <h3>Остаток:</h3>
                        <Text c={theme.primaryColor} fw={600}>{product.mapping[id].stock.quantity} шт.</Text>
                    </div>
                </Group>
                <Divider></Divider>
                <h3>Характеристики:</h3>
                {product.mapping[id].props.map((element) => { return <Text key={element.id}>{element.name}: {element.value}</Text> })}
            </Stack>
        </Flex>

    )
}

export default function ProductCardPage() {
    const params = useParams()
    const [activeTab, setActiveTab] = useState<string | null>("0");
    const { fetching, data } = useCard(params.id as any);
    useEffect(() => { fetching() }, [])

    return (
        <Container>
            <Tabs value={activeTab} onTabChange={setActiveTab}>
                <Tabs.List>
                    {
                        data.mapping.map((element, index) => { return <Tabs.Tab key={element.id} value={index.toString()}>{element.user.name}</Tabs.Tab> })
                    }
                </Tabs.List>
                {
                    data.mapping.map((element, index) => { return <Tabs.Panel key={element.id * 100} value={index.toString()}><ProductCardPanel id={Number.parseInt(activeTab ?? "0")} product={data}></ProductCardPanel></Tabs.Panel> })
                }
            </Tabs>
        </Container>
    )
}
