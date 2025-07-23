import React, { useState } from 'react'
import { Loader2Icon } from 'lucide-react';
import { Button } from './ui/button';

// 👉 Google Login button click
export const handleGoogleLogin = () => {
  // ✅ BaseURL /api already laga hai, so just "/auth/google"
  window.open('/api/auth/google', '_self');
};
const GoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const btnClick = () => {
    handleGoogleLogin();
    setLoading(true);
  }
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Button
        onClick={btnClick}
        disabled={loading}
        className='flex items-center justify-center gap-2 cursor-pointer'
      >
        {loading ? (
          <>
            <Loader2Icon className="animate-spin h-4 w-4" />
            <span className='text-md font-tinos'>Signing up...</span>
          </>
        ) : (
          "Sign Up"
        )}
      </Button>
    </div>
  )
};

export default GoogleAuth;


