import { Dispatch, useState } from "react";
import { Modal, Stack, Image, List, Title, Text, ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons";
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
        title="Inspect Product"
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
          <Title order={2}>Product: {activeProduct?.name}</Title>
          <Title order={4}>UPC: {activeProduct?.upc}</Title>
          <Image
            radius="md"
            fit="contain"
            src={activeProduct?.image}
            placeholder={<Text align="center">Loading Image</Text>}
            alt={`User uploaded image for ${activeProduct?.name}`}
          />
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
              <List.Item>Error</List.Item>
            )}
          </List>
        </Stack>
      </Modal>
    </>
  );
}
