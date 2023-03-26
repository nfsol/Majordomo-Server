import { Dispatch, useState } from "react";
import { Modal, Stack, Image, List, Title, Text, ActionIcon, Container } from "@mantine/core";
import { IconTrash } from "@tabler/icons";
import { showNotification } from '@mantine/notifications';
import axios from "axios";
type ProductType = {
  _id: string;
  name: string;
  upc: string;
  exp: string;
  image: string;
};

export function TableProduct({
  activeProduct,
  setActiveProduct,
}: {
  activeProduct: ProductType | null;
  setActiveProduct: Dispatch<ProductType | null>;
}) {
  const splitDateList = String(activeProduct?.exp).split(", ");
  

  return (
    <>
      <Modal
        opened={Boolean(activeProduct)}
        onClose={() => setActiveProduct(null)}
        title={<Title order={2}>Product: {activeProduct?.name}</Title>}
        size="auto"
        fullScreen={window.innerWidth > 1000 ? false : true}
      >
        <Stack
          align="center"
          spacing="xs"
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          })}
        >
          <Title order={4}>UPC: {activeProduct?.upc}</Title>
          <Container fluid sx={(theme) => ({display: "flex"})}>

          <Image
            radius="md"
            width={'30%S'}
            src={activeProduct?.image}
            placeholder={<Text align="center">Loading Image</Text>}
            alt={`User uploaded image for ${activeProduct?.name}`}
            />
            <div>

          <Title order={3} sx={{textDecoration:"underline"}}>Best Before Batches</Title>
          <List center size="md" sx={{ listStyleType: "none" }}>
            {splitDateList ? (
              splitDateList.map((dateListItem) => (
                <>
                  <List.Item sx={{ display: "flex" }}>
                    <ActionIcon color="red" size={24} radius="xl" sx={{display:'inline'}}>
                      <IconTrash
                        size={16}
                        onClick={() => {
                          axios
                          .patch(`/product/cull/${activeProduct!._id}`, {
                            exp:
                            splitDateList.filter(
                              (date) => date !== dateListItem
                              ),
                            })
                            .then((res) => {
                              if (res.status == 200) {
                                setActiveProduct(null);
                                showNotification({ title:'Success',message: 'Date deleted from list' });
                              }
                            })
                            .catch(() => console.log("an error occured"));
                          }}
                          />
                    </ActionIcon>
                    {dateListItem}
                  </List.Item>
                </>
              ))
              ) : (
                <List.Item>Error, no items found. Try reloading</List.Item>
                )}
          </List>
                </div>
                </Container>
        </Stack>
      </Modal>
    </>
  );
}
