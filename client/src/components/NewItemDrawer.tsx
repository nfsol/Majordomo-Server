import { Dispatch, useState } from 'react';
import { TextInput, FileInput, Drawer, Button, Group } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
const NewItemDrawer = ({lastScan,setLastScan}:{lastScan:string|null,setLastScan:Dispatch<string|null>}) => {
  const form = useForm({
    initialValues: {
      upc: lastScan,
      name: '',
      image: {},
      bbDate: ''
    },
  });
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Drawer
        opened={lastScan ? true : false}
        onClose={() => setLastScan(null)}
        title="Add or Update Product"
        padding="xl"
        size="xl"
      >
       <div style={{ maxWidth: 320, margin: 'auto' }}>

        {/* {define onSubmit function elsewhere } */}
       <form onSubmit={form.onSubmit((values) => console.log(values))}>
       <h2>Scanned UPC:{lastScan ? lastScan: null}</h2>
      <TextInput label="Product Name" placeholder="Optional" {...form.getInputProps('name')} />
      <FileInput label="Capture Image" placeholder="Click to Open Camera" accept="image/png,image/jpeg" {...form.getInputProps('image')}/>
      <DatePicker placeholder="Pick date" label="Best Before" />
      <Group position="center" mt="xl">
        <Button
          variant="outline"
        >
          Submit
        </Button>
      </Group>
      </form>
    </div>
      </Drawer>
    </>
  );
}

export default NewItemDrawer