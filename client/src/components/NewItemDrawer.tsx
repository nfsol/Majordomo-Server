import { Dispatch, useState } from "react";
import {
  TextInput,
  FileInput,
  Drawer,
  Button,
  Group,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import Compressor from "compressorjs";
import axios from "axios";
import { showNotification } from '@mantine/notifications';


const NewItemDrawer = ({
  isNewItem,
  setIsNewItem,
  lastScan,
  setLastScan,
}: {
  isNewItem: boolean | null;
  setIsNewItem: Dispatch<boolean | null>;
  lastScan: string | null;
  setLastScan: Dispatch<string | null>;
}) => {
  const form = useForm({
    initialValues: {
      upc: "",
      name: "",
      image: null,
      bbDate: "",
    },
  });
  const [feedback, setFeedback] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string>("");
  const [bbDate, setBBDate] = useState<Date | null>(new Date());

  const imageCompressor = (img: File) => {
    new Compressor(img, {
      quality: 0.6,
      success(result: File) {
        setImage(result);
        setImageName(result.name);
      },
      error(err) {
        console.log(err.message);
      },
    });
  };
  const submitForm = () => {
    const formData = new FormData();
    formData.append("upc", lastScan ? lastScan : "Error");
    formData.append("name", name);
    formData.append("image", image!, imageName);
    formData.append("bbDate", bbDate!.toDateString());

    axios.post("/product/new", formData).then((res) => {
      if (res.status == 200) {setLastScan(null)
        showNotification({ title:'Saved!',message: `Created new entry for${name}` });}
        else setFeedback("something went wrong")
    });
  };

  return (
    <>
      <Drawer
        opened={Boolean(lastScan) && isNewItem === true}
        onClose={() => setLastScan(null)}
        title="Add New Product"
        padding="xl"
        size="xl"
      >
        <div style={{ maxWidth: 320, margin: "auto" }}>
          <h2>Scanned UPC:{lastScan ? lastScan : "Error"}</h2>
          <TextInput
            value={name}
            label="Product Name"
            placeholder="Optional"
            onChange={(event) => setName(event.currentTarget.value)}
          />
          <h4>{feedback}</h4>
          <FileInput
            value={image}
            label="Capture Image"
            placeholder="Click to Open Camera"
            accept="image/*"
            onChange={imageCompressor}
          />
          <DatePicker
            value={bbDate}
            placeholder="Pick date"
            label="Best Before"
            onChange={setBBDate}
          />
          <Group position="center" mt="xl">
            <Button variant="outline" onClick={submitForm}>
              Submit
            </Button>
          </Group>
        </div>
      </Drawer>
    </>
  );
};

export default NewItemDrawer;
