import {
    ActionIcon, Flex, Stack, Table, TextInput, ThemeIcon,
    ScrollArea, Button, NumberInput, FileButton, Group, Text, List, Title, Divider
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSquarePlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { ProductProps } from "../../types/ProductTypes";
import TableInput from "../UI/TableInput/TableInput";
import { useUploadProduct } from "../../api/uploadProduct";
import { useUploadGallery } from "../../api/uploadGallery";
import { useUploadPreview } from "../../api/uploadPreview";


type FormType = {
    name: string,
    article: string,
    brand: string,
    price: number,
    quantity: number,
}

export default function AddFileForm({ addProduct }: { addProduct: () => void }) {

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
    const [files, setFiles] = useState<File[]>([]);
    const [main_image, setMainImage] = useState<File | null>(null);


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

    const { fetching } = useUploadProduct()
    const { uploadGallery } = useUploadGallery();
    const { uploadPreview } = useUploadPreview()

    const handleSubmit = (value: FormType) => {
        const data = {
            name: value.name,
            article: value.article,
            price: value.price,
            quantity: value.quantity,
            props: productProps,
            brand: value.brand
        }
        console.log(data);
        fetching(data).then((response) => {
            addProduct();
            const prod_id = response.data.success_products[0].id;
            uploadGallery(prod_id, files).then((response) => {
                console.log('Ura', response)
            }).catch((e) => {
                console.log('bad', e);
            })
            if (main_image)
                uploadPreview(prod_id, main_image).then(() => console.log('Yews')).catch((e) => console.log(e));


        }).catch(() => {
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
                        <Title order={3}>Изображение карточки</Title>
                        <Group position="center">
                            <FileButton onChange={setMainImage} accept="image/png,image/jpeg">
                                {(props) => <Button {...props}>Загрузка</Button>}
                            </FileButton>
                        </Group>

                        {main_image && (
                            <Text size="sm" align="center" mt="sm">
                                Picked file: {main_image.name}
                            </Text>
                        )}
                        <Divider my="sm" />
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
                        <ScrollArea h={300} >
                            <Table highlightOnHover captionSide="bottom" verticalSpacing="sm" >
                                <thead >
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
                        <Group position="center">
                            <FileButton onChange={setFiles} accept="image/png,image/jpeg" multiple>
                                {(props) => <Button {...props}>Загрузка галереи</Button>}
                            </FileButton>
                        </Group>

                        {files.length > 0 && (
                            <Text size="sm" mt="sm">
                                Picked files:
                            </Text>
                        )}
                        <ScrollArea h={150} >
                            <List size="sm" mt={5} withPadding>
                                {files.map((file, index) => (
                                    <List.Item key={index}>{file.name}</List.Item>
                                ))}
                            </List>
                        </ScrollArea>
                    </Stack>
                </Flex>
                <Button type="submit">Сохранить</Button>
            </Stack>
        </form>
    )
}
