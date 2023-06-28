import { Button, Flex, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAddBuilding } from "../../api/buildings";

interface FormType {
    name: string;
    address: string;
}

export default function AddPlaceForm({ onSubmit }: { onSubmit: () => void }) {
    const { fetching } = useAddBuilding()
    const form = useForm<FormType>({
        initialValues: {
            name: "",
            address: "",
        },
        validate: {
            name: (value) => (value.length === 0 ? "Поле должно быть заполнено" : null),
            address: (value) => (value.length === 0 ? "Поле должно быть заполнено" : null),
        },
    });

    const handleSubmit = () => {
        if (form.isValid()) {
            const data = { name: form.values.name, address: form.values.address };
            fetching(data).then(() => {
                onSubmit()
            })
        }
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Flex direction={"column"} gap={"xs"} mb={"md"}>
                <TextInput
                    placeholder="Наименование"
                    label="Помещение"
                    withAsterisk
                    {...form.getInputProps("name")}
                />
                <TextInput
                    placeholder="Расположение"
                    label="Адрес"
                    withAsterisk
                    {...form.getInputProps("address")}
                />
            </Flex>
            <Button type="submit">Сохранить</Button>
        </form>
    );
}
