// pages/verify.js
import { useState } from 'react';
import axios from 'axios';

export default function VerifyContract() {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const verifyContract = async () => {
        try {
            const response = await axios.post('/api/verifyContract', {
                address: '0x6b537DE41E501E6d2a93B5B31E889b1B704ad80C',
                constructorArguments: [
                    '0x1B8163f3f7Ae29AF06c50dF4AE5E0Fe9375f8496',
                    '0x2a0644d13BD9154962BD0C669aCFa94861D52BD0',
                    'https://timomarket.infura-ipfs.io/ipfs/QmbNdXSauw1bRGbdeP44jFQZ66xT4MaaL5UsbiqPBLHXDZ',
                    'Test idea title 17:16',
                    'https://timomarket.infura-ipfs.io/ipfs/QmbNdXSauw1bRGbdeP44jFQZ66xT4MaaL5UsbiqPBLHXDZ'
                ],
            });
            setResult(response.data.message);
            setError(null);
        } catch (error) {
            setError('Failed to verify contract');
            setResult(null);
        }
    };

    return (
        <div>
            <h1>Verify Smart Contract</h1>
            <button onClick={verifyContract}>Verify Contract</button>

            {result && <p>{result}</p>}
            {error && <p>{error}</p>}
        </div>
    );
}
