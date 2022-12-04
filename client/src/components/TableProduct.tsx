import { Dispatch } from "react";
import {
  Modal,
  Group,
  Stack,
  Image,
  List,
  Title,
  ActionIcon,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons";
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
          <Title order={2}>{activeProduct?.name}</Title>
          <Title order={4}>{activeProduct?.upc}</Title>
          <Image
            radius="md"
            src={activeProduct?.image}
            alt={`User uploaded image for ${activeProduct?.name}`}
          />
          <List center icon={
        <ActionIcon color="red" size={24} radius="xl">
          <IconTrash size={16} onClick={() => {
                        // deleteDate(item._id);
                      }}/>
        </ActionIcon>
      } size="md">
            {splitDateList ? (
              splitDateList.map((dateListItem) => (
                <span>
                  <List.Item >
                  {dateListItem}
                    </List.Item>
                      </span>
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
