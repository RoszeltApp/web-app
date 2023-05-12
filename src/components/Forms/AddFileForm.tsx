import { ActionIcon, Flex, Stack, Table, TextInput, ThemeIcon, Image, ScrollArea, createStyles, rem, Button, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSquarePlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { ProductProps } from "../../types/ProductTypes";
import TableInput from "../UI/TableInput/TableInput";
import { useUploadProduct } from "../../api/uploadProduct";



const useStyles = createStyles((theme) => ({
    header: {
        position: 'sticky',
        top: 0,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        transition: 'box-shadow 150ms ease',

        '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
                }`,
        },
    },

    block: {

    },

    scrolled: {
        boxShadow: theme.shadows.sm,
    },
}));

type FormType = {
    name: string,
    article: string,
    brand: string,
    price: number,
    quantity: number,
}

export default function AddFileForm({ addProduct }: { addProduct: () => void }) {

    const { classes, cx } = useStyles();

    const form = useForm({
        initialValues: {
            name: '',
            article: '',
            brand: '',
            price: 0,
            quantity: 0,
        },
        validate: {
            name: (value) => value.length === 0 ? 'Поле должно быть заполнено' : null,
            article: (value) => value.length === 0 ? 'Поле должно быть заполнено' : null,
            brand: (value) => value.length === 0 ? 'Поле должно быть заполнено' : null
        }
    })


    const [productProps, setProductProps] = useState<ProductProps[]>([]);

    const handleChange = (index: number, field: string, value: string) => {
        let buffer = [...productProps]
        switch (field) {
            case 'name':
                buffer[index].name = value
                break;
            case 'value':
                buffer[index].value = value;
                break;
        }
        setProductProps(buffer);
    }
    const handleAppend = () => {
        setProductProps([...productProps, { name: 'Название', value: 'Значение' }])
    }

    const handleDelete = (index: number) => {
        let buffer = [...productProps]
        buffer.splice(index, 1)
        setProductProps(buffer)
    }

    const rows = productProps.map((element, index) => (
        <tr key={element.name + index.toString()}>
            <td><TableInput text={element.name} onChange={e => handleChange(index, 'name', e)}></TableInput></td>
            <td><TableInput text={element.value} onChange={e => handleChange(index, 'value', e)}></TableInput></td>
            <td><ActionIcon onClick={() => handleDelete(index)}><IconTrash color='red'></IconTrash></ActionIcon></td>
        </tr>
    ));

    const [scrolled, setScrolled] = useState(false);
    const { fetching } = useUploadProduct()

    const handleSubmit = (value: FormType) => {
        const data = {
            name: value.name,
            article: value.article,
            price: value.price,
            quantity: value.quantity,
            props: productProps
        }
        console.log(data);
        fetching(data).then(() => addProduct()).catch(() => {
            form.setFieldError('article', 'Ошибка, невозможно сохранить товар')
        });
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <Flex justify="center"
                    align="flex-start"
                    direction="row"
                    gap="lg"
                    wrap="nowrap">

                    <Stack justify="flex-start" w='100%'>
                        <Image src='https://images.unsplash.com/photo-1618359057154-e21ae64350b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80'
                            height={200}>
                        </Image>

                        <TextInput
                            placeholder="Название товара"
                            label="Название товара"
                            withAsterisk
                            {...form.getInputProps('name')}
                        />
                        <TextInput
                            placeholder="Артикул"
                            label="Артикул"
                            withAsterisk
                            {...form.getInputProps('article')}
                        />
                        <TextInput
                            placeholder="Бренд"
                            label="Бренд"
                            withAsterisk
                            {...form.getInputProps('brand')}
                        />
                        <NumberInput
                            placeholder="Цена"
                            label="Цена"
                            withAsterisk
                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                            formatter={(value) =>
                                !Number.isNaN(parseFloat(value))
                                    ? `₽ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                                    : '₽ '
                            }
                            {...form.getInputProps('price')}
                        />
                        <NumberInput
                            placeholder="Количество"
                            label="Количество"
                            withAsterisk
                            {...form.getInputProps('quantity')}
                        />

                    </Stack>

                    <Stack justify="flex-start" w='100%'>
                        <ScrollArea h={540} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
                            <Table highlightOnHover captionSide="bottom" verticalSpacing="sm" >
                                <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                                    <tr>
                                        <th>Название</th>
                                        <th>Значение</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows}
                                </tbody>
                            </Table>
                        </ScrollArea>
                        <ActionIcon variant="subtle" onClick={handleAppend}><ThemeIcon><IconSquarePlus /></ThemeIcon></ActionIcon>
                    </Stack>
                </Flex>
                <Button type="submit">Сохранить</Button>
            </Stack>
        </form>
    )
}
