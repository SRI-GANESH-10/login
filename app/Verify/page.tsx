'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { deleteCookie, getToken } from '../comp/cookie';
import Link from 'next/link';

const VerificationForm = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<string | null>(null);
  const router = useRouter();

  const handleVerify = async () => {
    try {
      // Replace 'YOUR_ACCESS_TOKEN' with the actual access token
      const accessToken = getToken();

      const response = await axios.get(
        `https://api.dev2.constructn.ai/api/v1/users/verify/${verificationCode}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Assuming the API returns a success message or status
      setVerificationStatus(response.data.message);

      // If verification is successful, you can redirect the user to the landing page
      if (response.data.success) {
        router.push('/Landing');
      }
    } catch (error) {
      // Handle errors, e.g., token is invalid or expired
      setVerificationStatus('Verification failed. Please try again.');
    }
  };

  return (
    <div className='mt-24'>
      <label htmlFor="verificationCode">Enter Verification Code:</label>
      <input
        type="text"
        id="verificationCode"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <button onClick={handleVerify}>Verify</button>
      {verificationStatus && <p>{verificationStatus}</p>}
      <Link href={'/Login'} onClick={() => deleteCookie()} className="text-blue-500 underline cursor-pointer">
        Logout
      </Link>
    </div>
  );
};

export default VerificationForm;
