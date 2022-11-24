import CodeScanner from "../components/CodeScanner";
import LastItems from "../components/LastItems";
import NewItemDrawer from "../components/NewItemDrawer";
import { useState } from "react";
import UpdateItemDrawer from "../components/UpdateItemDrawer";


const ItemInput = () => {
  const [lastScan,setLastScan] = useState<string | null>("");
  const [isNewItem,setIsNewItem] = useState<boolean | null>(null);
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
