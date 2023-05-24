import type { SingleImage } from '../../../types/ProductCardTypes';
import { Button, Flex, Text, Group, Rating, Image, Stack } from "@mantine/core";
import { Carousel } from '@mantine/carousel';
import { IconEye } from '@tabler/icons-react';

interface FormatProps {
    product_name: string,
    product_article: string,
    media: SingleImage[]
}

export default function ProductCardView({ product_name, product_article, media }: FormatProps) {
    return (
        <Stack>
            <h2>{product_name}</h2>
            <Group>
                <h4>Артикул:</h4>
                <Text c="light" tt={'uppercase'}>
                    {product_article}
                </Text>
            </Group>
            <Carousel
                withIndicators
                height={200}
                maw={320}
                loop
            >
                {media.map((element) => {
                    return <Carousel.Slide key={element.id}>
                        <Image
                            src={`http://127.0.0.1:9000/testbucket/${element.path}`}
                            height={200}
                            alt="Shaurma"
                            fit="fill"
                        />
                    </Carousel.Slide>
                })}
                {/* ...other slides */}
            </Carousel>
            <Button variant="filled">В корзину</Button>
            <Flex
                gap='md'
                justify={'flex-start'}
                align={'center'}
                direction={'row'}
            >
                <Flex gap={'md'} justify={'flex-start'} align={'flex-start'} direction={'column'}>
                    <Text>Просмотры</Text>
                    <Group>
                        <IconEye></IconEye>
                        <Text>123</Text>
                    </Group>
                </Flex>
                <Flex gap={'md'} justify={'flex-start'} align={'flex-start'} direction={'column'}>
                    <Text>Рейтинг</Text>
                    <Group>
                        <Rating defaultValue={4} />
                        <Text>4.1</Text>
                    </Group>
                </Flex>
            </Flex>

        </Stack>
    )
}