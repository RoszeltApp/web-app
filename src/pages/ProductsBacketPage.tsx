import { Button, Container, Divider, Flex, Text, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import ProductCardMini from "../components/UI/ProductCardMini/ProductCardMini";
import { deleteFromDB, getAllFromDB } from "../hooks/indexedDB.ts";
import { Product } from "../types/ProductCardTypes.ts";
import React from "react";
import { useNavigate } from "react-router";

interface ProductBasket extends Product {
    value: number | ''
}
export default function ProductBasketPage() {
    const [products, setProducts] = useState<ProductBasket[]>([]);
    const [totalQuantity, setTotalQuantity] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const router = useNavigate()

    const theme = useMantineTheme();

    const handleValueChange = (productId: number, value: number | '') => {
        setProducts((prevProducts) => {
            const updatedProducts = prevProducts.map((product) => {
                if (product.id === productId) {
                    return {
                        ...product,
                        value: value,
                    };
                }
                return product;
            });

            const newTotalQuantity = updatedProducts.reduce((total, product) => total + (product.value || 0), 0);
            const newTotalPrice = updatedProducts.reduce((total, product) => total + (product.value || 0) * product.mapping[0].stock.price, 0);
            setTotalPrice(newTotalPrice);
            setTotalQuantity(newTotalQuantity);

            return updatedProducts;
        });
    };

    const fetchProducts = () => {
        getAllFromDB()
            .then((products: Product[]) => {
                if (products) {
                    const productsWithQuantity = products.map((product) => ({
                        ...product,
                        value: 1, // Set initial value to 1
                    }));
                    setProducts(productsWithQuantity);
                } else {
                    console.log('Object not found in IndexedDB');
                }
            })
            .catch((error: any) => {
                console.error(error);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, []);
    useEffect(() => {
        handleValueChange(-1, 0);
    }, [products]);

    const handleDeleteProduct = (offer_id: number) => {
        deleteFromDB(offer_id);
        setProducts((prevProducts) => {
            const updatedProducts = prevProducts.filter((product) => product.mapping[0].id !== offer_id);
            const newTotalQuantity = updatedProducts.reduce((total, product) => total + (product.value || 0), 0);
            const newTotalPrice = updatedProducts.reduce((total, product) => total + (product.value || 0) * product.mapping[0].stock.price, 0);
            setTotalQuantity(newTotalQuantity);
            setTotalPrice(newTotalPrice);
            return updatedProducts;
        });
    };

    return (
        <>
            <Container>
                <Flex direction={"row"} gap={"xl"}>
                    <Flex direction={"column"}>
                        {products.map((element) => (
                            <React.Fragment key={element.id}>
                                <>
                                    <ProductCardMini
                                        key={element.id}
                                        name={element.name}
                                        offer={element.mapping[0]}
                                        value={1}
                                        onDelete={() => handleDeleteProduct(element.mapping[0].id)}
                                        onValueChange={(productId, value) => handleValueChange(productId, value)}
                                    />
                                    <Divider></Divider>
                                </>
                            </React.Fragment>
                        )
                        )}
                    </Flex>
                    <Flex align={"center"} justify={"flex-start"} direction={"column"} gap={"md"}>
                        <Flex direction={"column"} gap={"xs"}>
                            <Text>Итого:</Text>
                            <Text c={"grey"} fw={400}>{totalQuantity} шт. товаров</Text>
                            <Text c={theme.primaryColor} fw={500}>{totalPrice} ₽</Text>
                        </Flex>
                        <Button variant="outline" onClick={() => router(`/place`)}>Разместить</Button>
                    </Flex>
                </Flex>
            </Container>
        </>
    )
}