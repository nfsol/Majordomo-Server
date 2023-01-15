import CodeScanner from "../components/CodeScanner";
import LastItems from "../components/LastItems";
import NewItemDrawer from "../components/NewItemDrawer";
import { useState } from "react";
import UpdateItemDrawer from "../components/UpdateItemDrawer";
import { showNotification } from '@mantine/notifications';

const ItemInput = () => {
  const [lastScan,setLastScan] = useState<string | null>("");
  const [isNewItem,setIsNewItem] = useState<boolean | null>(null);
  showNotification({ title:'Trouble scanning barcodes?',message: 'Some users of Chrome on mobile report issues with item input, for best results we recommend using Firefox on this page as we work to resolve this issue.', autoClose: false });
  return (
    <>
      <CodeScanner setIsNewItem={setIsNewItem} setLastScan={setLastScan}/>
      <UpdateItemDrawer isNewItem={isNewItem} setIsNewItem={setIsNewItem} lastScan={lastScan} setLastScan={setLastScan}/>
      <NewItemDrawer  isNewItem={isNewItem} setIsNewItem={setIsNewItem} lastScan={lastScan}setLastScan={setLastScan}/>
      <LastItems />
    </>
  );
};

export default ItemInput;
