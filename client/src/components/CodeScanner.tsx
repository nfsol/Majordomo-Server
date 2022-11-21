import { SetStateAction, useRef,useState } from 'react';
import {Button} from '@mantine/core'
import Scanner from './Scanner';

//Largely lifted from Quagga2's example page. 

const CodeScanner = ({setLastScan}:{setLastScan:React.Dispatch<React.SetStateAction<string|null>> }) => {
    const [scanning, setScanning] = useState(false);
    const scannerRef = useRef(null);

    return (
        <div>

            <Button variant="outline" fullWidth mt="xl" onClick={() => setScanning(!scanning) }>{scanning ? 'Stop' : 'Start'}</Button>
            <div ref={scannerRef} style={{position: 'relative'}}>
                <canvas className="drawingBuffer" style={{
                    position: 'absolute',
                    top: '0px'
                }} width="320" height="240" />
                {scanning ? <Scanner scannerRef={scannerRef} onDetected={(result) => setLastScan(result)} /> : null}
            </div>
        </div>
    );
};

export default CodeScanner;