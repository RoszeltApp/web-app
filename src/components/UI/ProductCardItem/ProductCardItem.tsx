import { Carousel } from '@mantine/carousel'
import { Badge, Button, Card, Group, Text, Image, Paper, Stack } from '@mantine/core'
import { Product } from '../../../types/ProductTypes';
import { IconBasket } from '@tabler/icons-react';


interface FormatProps {
    product: Product
}


export default function ProductCardItem({ product }: FormatProps) {
    const slides = product.mapping.map((offer) => (
        <Carousel.Slide key={offer.id}>
            <Card shadow="sm" padding="lg" radius="md" withBorder h={350}>
                <Card.Section component="a" >
                    <Image
                        src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                        height={160}
                        alt="Norway"
                    />
                </Card.Section>

                <Group position="apart" mt="md" mb="xs">
                    <Badge color="pink" variant="light">
                        On Sale
                    </Badge>
                    <Text weight={500}>Предложение от {offer.user.name}</Text>
                </Group>


                <Stack>
                    <div>
                        <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
                            ${offer.stock.price}
                        </Text>
                        <Text fz="sm" c="dimmed" fw={500} sx={{ lineHeight: 1 }} mt={3}>
                            Количество: {offer.stock.quantity}
                        </Text>
                    </div>

                    <Button radius="xl" leftIcon={<IconBasket ></IconBasket>}>
                        Добавить
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
