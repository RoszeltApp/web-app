import { Carousel } from '@mantine/carousel'
import { Badge, Button, Card, Group, Text, Image, Paper, Stack } from '@mantine/core'
import { IconBasket, IconExternalLink } from '@tabler/icons-react';
import { addToDB } from '../../../hooks/indexedDB';
import { Offer, Product } from '../../../types/ProductCardTypes';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';


interface FormatProps {
    product: Product,
    classes: string
}

export function getImageScr(image: string | null) {
    if (image) {
        return `http://127.0.0.1:9000/testbucket/${image}`
    }
    else {
        return `http://127.0.0.1:9000/testbucket/default.jpg`
    }
}

export default function ProductCardItem({ product, classes }: FormatProps) {

    const handleAddToBasket = (offer: Offer) => {
        if (offer) {
            const selectedProduct = { ...product, mapping: [offer], id: offer.id };
            addToDB(selectedProduct)
                .then(() => {
                    console.log("Продукт успешно добавлен в IndexedDB")

                    notifications.show({
                        id: 'successful-busket-add',
                        title: "Успешно",
                        message: 'Продукт добавлен в корзину',
                        color: 'green',
                    })
                })
                .catch((error) => {
                    console.error("Ошибка при добавлении продукта в IndexedDB:", error);
                });
        }
    };
    const router = useNavigate()

    const slides = product.mapping.map((offer) => (
        <Carousel.Slide key={offer.id}>
            <Card shadow="sm" padding="lg" radius="md" withBorder h={400}>
                <Card.Section component="a">
                    <Image
                        src={getImageScr(offer.image)}
                        height={160}
                        alt="Norway"
                        fit="fill"
                    />
                </Card.Section>

                <Group position="apart" mt="md" mb="xs">
                    <Badge color="pink" variant="light">
                        {classes}
                    </Badge>
                    <Text weight={500}>Предложение от {offer.user.name}</Text>
                </Group>


                <Stack>
                    <div>
                        <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
                            Цена: {offer.stock.price} ₽
                        </Text>
                        <Text fz="sm" c="dimmed" fw={500} sx={{ lineHeight: 1 }} mt={3}>
                            Количество: {offer.stock.quantity}
                        </Text>
                    </div>

                    <Button radius="xl" leftIcon={<IconBasket ></IconBasket>} onClick={() => handleAddToBasket(offer)}>
                        Добавить
                    </Button>
                    <Button radius='xl'
                        onClick={() => router(`/product/${offer.product_id}`)}
                        leftIcon={<IconExternalLink></IconExternalLink>}>
                        Посмотреть
                    </Button>
                </Stack>
            </Card>
        </Carousel.Slide>
    ))

    return (
        <Paper withBorder radius='md' p='lg'>
            <div>
                <Text>
                    <h3>{product.name}</h3>
                    <p>{product.article}</p>
                </Text>
            </div>

            <Carousel
                //slideSize="350px"
                slideSize="33.333333%"
                slideGap="md"

                align="center"
                slidesToScroll={3}
            >
                {slides}
            </Carousel>
            {/* <Divider my='sm'></Divider> */}
        </Paper>
    )
}
