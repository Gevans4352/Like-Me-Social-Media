// Create a new component to test env variables
import React from 'react';

export default function EnvTest() {
  console.log('VITE_API_KEY:', import.meta.env.VITE_API_KEY);
  console.log('All env variables:', import.meta.env);
  
  return (
    <div>
      <h2>Environment Variables Test</h2>
      <p>VITE_API_KEY: {import.meta.env.VITE_API_KEY || 'NOT FOUND'}</p>
    </div>
  );
}