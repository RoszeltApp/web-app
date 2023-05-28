import { useRef } from 'react';
import type { Offer } from '../../../types/ProductCardTypes';
import { ActionIcon, Button, Flex, Group, Image, NumberInput, NumberInputHandlers, Stack, Text, rem, useMantineTheme } from "@mantine/core";

interface FormatProps {
    name: string,
    offer: Offer,
    value: number,
    onDelete: (productId: number) => void,
    onValueChange: (productId: number, value: number | '') => void;
}

export default function ProductCardMini({ name, offer, value, onDelete, onValueChange }: FormatProps) {

    const handlers = useRef<NumberInputHandlers>();
    const theme = useMantineTheme();

    return (
        <Flex direction={"row"} mt={"xs"} mb={"xs"} gap={"xl"}>
            <Image width={200} alt='Фото' src="http://tpnasb.ru/images/b/97/9097/B6189097.jpg"></Image>
            <Flex direction={"column"} align={"flex-start"} gap={"md"} justify={"center"}>
                <Stack>
                    <Text>{name}</Text>
                    <Group spacing={5}>
                        <ActionIcon size={42} variant="default" onClick={() => handlers.current?.decrement()}>
                            –
                        </ActionIcon>

                        <NumberInput
                            hideControls
                            value={value}
                            onChange={(val) => {
                                onValueChange(offer.id, val);
                            }}
                            handlersRef={handlers}
                            max={10}
                            min={1}
                            step={1}
                            styles={{ input: { width: rem(54), textAlign: 'center' } }}
                        />

                        <ActionIcon size={42} variant="default" onClick={() => handlers.current?.increment()}>
                            +
                        </ActionIcon>
                    </Group>
                </Stack>
                <Button variant='outline' w={"200px"} onClick={() => onDelete(offer.id)}>Удалить</Button>
            </Flex>
            <Flex direction={"column"} align="flex-end" justify="center" ml={"auto"} gap={"xs"}>
                <Text c={"grey"} fw={500}>Поставщик: {offer.user.name}</Text>
                <Text c={theme.primaryColor} fw={600}>{offer.stock.price} ₽</Text>
                <Text>В наличии:</Text>
                <Text c={theme.primaryColor} fw={600}>{offer.stock.quantity} шт.</Text>
            </Flex>
        </Flex>
    )
}