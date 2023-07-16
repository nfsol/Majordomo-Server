import { useRef, useState, useCallback } from "react";
import { Button } from "@mantine/core";
import Scanner from "./Scanner";
import axios from "axios";


const CodeScanner = ({
  setIsNewItem,
  setLastScan,
}: {
  setIsNewItem: React.Dispatch<boolean>;
  setLastScan: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [scanning, setScanning] = useState(false);
  const scannerRef = useRef(null);

  const onScan = (result: string) => {
    axios.get(`/product/${result}`).then((res) => {
      if (res.data.payload) {
        setIsNewItem(false);
      } else {
        setIsNewItem(true);
      }
      setLastScan(result);
    });
  };
  function throttle(callback: (result: string) => void, delay: number) {
    let willWait = false;
    return function (result: string) {
      if (!willWait) {
        callback(result);
        willWait = true;
        setTimeout(() => (willWait = false), delay);
      }
    };
  }
  const throttledOnScan = throttle(onScan, 400);
  return (
    <div style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Button
        variant="outline"
        mt="xl"
        onClick={() => setScanning(!scanning)}
      >
        {scanning ? "Stop" : "Start"}
      </Button>
      <div ref={scannerRef} style={{ position: "relative" }}>
        <canvas
          className="drawingBuffer"
          style={{
            position: "absolute",
            top: "0px",
          }}
          width="320"
          height="240"
        />
        {scanning ? (
          <Scanner
            scannerRef={scannerRef}
            onDetected={(result) => throttledOnScan(result)}
          />
        ) : null}
      </div>
    </div>
  );
};

export default CodeScanner;
