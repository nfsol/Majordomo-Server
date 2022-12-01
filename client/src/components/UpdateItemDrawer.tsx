import { Dispatch, useState } from "react";
import { Drawer, Button, Group } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import axios from "axios";
const UpdateItemDrawer = ({
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
      bbDate: "",
    },
  });
  const [feedback, setFeedback] = useState<string>("");
  const [bbDate, setBBDate] = useState<Date | null>(new Date());

  const submitForm = () => {
    // const formData = new FormData();
    // formData.append("upc", lastScan ? lastScan : "Error");
    // formData.append("bbDate", bbDate!.toDateString());

    axios.patch(`/product/${lastScan}`, {exp:bbDate!.toDateString()}).then((res) => {
      if (res.status == 200) setLastScan(null);
      else setFeedback("something went wrong");
    });
  };

  return (
    <>
      <Drawer
        opened={(Boolean(lastScan) && isNewItem === false)}
        onClose={() => {setLastScan(null)
            setIsNewItem(null)}}
        title="Update Product"
        padding="xl"
        size="xl"
      >
        <div style={{ maxWidth: 320, margin: "auto" }}>
          <h2>Scanned UPC:{lastScan ? lastScan : "Error"}</h2>
          <h4>{feedback}</h4>
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

export default UpdateItemDrawer;
