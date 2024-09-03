// pages/api/verifyContract.js
import { exec } from 'child_process';
import util from 'util';

// Convert exec to a promise-based function
const execPromise = util.promisify(exec);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { address, constructorArguments } = req.body;

        try {
            // Prepare the command with arguments
            const command = `npx hardhat verify ${address} --network sepolia ${constructorArguments.join(' ')}`;

            // Run the Hardhat command
            const { stdout, stderr } = await execPromise(command);

            if (stderr) {
                console.error('Error:', stderr);
                return res.status(500).json({ error: stderr });
            }

            // Log the output for debugging
            console.log('Output:', stdout);

            res.status(200).json({ message: 'Contract verified successfully!' });
        } catch (error) {
            console.error('Verification error:', error);
            res.status(500).json({ error: error.message || 'Failed to verify contract' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
