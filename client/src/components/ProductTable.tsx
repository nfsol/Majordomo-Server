import {
    Avatar,
    Table,
    Group,
    Text,
    ActionIcon,
    Anchor,
    ScrollArea,
    useMantineTheme,
  } from '@mantine/core';
  import { IconPencil, IconTrash } from '@tabler/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
  
  interface ProductsTableProps {
    data: {
        _id: string;
        name: string;
        upc: string;
        exp: string;
        image: string;
      }[];
  }
  
  export function ProductTable({ data }: ProductsTableProps) {
    const navigate = useNavigate();
  const deleteProduct = (id:string) => {
    axios.delete(`/product/${id}`).then(() =>{
      
        navigate(0)
      
    })  
  }
    const theme = useMantineTheme();
    const rows = data.map((item) => (
      <tr key={item.name}>
        <td>
          <Group spacing="sm">
            <Avatar size={40} src={item.image} radius={30} />
            <Text size="sm" weight={500}>
              {item.name}
            </Text>
          </Group>
        </td>
        <td>
          <Anchor<'a'> size="sm" href="#" onClick={(event) => event.preventDefault()}>
            {item.upc}
          </Anchor>
        </td>
        <td>
          <Text size="sm" color="dimmed">
            {item.exp}
          </Text>
        </td>
        <td>
          <Group spacing={0} position="right">
            <ActionIcon>
              <IconPencil size={16} stroke={1.5} />
            </ActionIcon>
            <ActionIcon color="red">
              <IconTrash size={16} stroke={1.5} onClick={()=>{deleteProduct(item._id)}}/>
            </ActionIcon>
          </Group>
        </td>
      </tr>
    ));
  
    return (
      <ScrollArea>
        <Table sx={{ minWidth: 600 }} verticalSpacing="sm">
          <thead>
            <tr>
              <th>Product</th>
              <th>UPC</th>
              <th>Best Before</th>
              <th />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    );
  }