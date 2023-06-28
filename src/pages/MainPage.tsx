import { Flex, Container, Title, List, Divider } from "@mantine/core";


export default function MainPage(): JSX.Element {
    return (
        <Container>
            <Flex justify={'center'}>
                <Title>Геоинформационная система для поддержки выбора и размещения
                    компонентов компьютерной инфраструктуры на основе теоретико-множественного
                    подхода классификации компонентов</Title>
            </Flex>
            <Divider pb={50} ></Divider>
            <Title pb={20}>Основные возможности системы:</Title>
            <List size={'lg'}>
                <List.Item>Отображение и загрузка пространственной информации компонентов компьютерной инфраструктуры и помещений организации</List.Item>
                <List.Item>Пространственное размещение компонентов компьютерной инфраструктуры</List.Item>
                <List.Item>Поиск и выбор компонентов компьютерной инфраструктуры</List.Item>
                <List.Item>Загрузка информации о компонентов компьютерной инфраструктуры</List.Item>
            </List>
        </Container>
    )
}
