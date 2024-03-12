"use client";

import React, { useState, useEffect } from 'react';

function TestDbComponent() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/testdb');
      const data = await response.json();
      if (data.currentTime) {
        setCurrentTime(data.currentTime);
      } else {
        console.error('Failed to fetch current time');
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      Current Time in DB: {currentTime}
    </div>
  );
}

export default TestDbComponent;