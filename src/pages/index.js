import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [definition, setDefinition] = useState(null);
  const [error, setError] = useState(null);

const handleSearch = async () => {
  if (!searchTerm) {
    setDefinition('Please enter a word.');
    return;
  }
  
  try {
    const res = await fetch(`https://script.google.com/macros/s/AKfycbyndx9Qymia15t-VI30tAemV-AVrT8xLwumA4XwqZB5W9FBURbssNqLxofhhMLBa_an/exec?filename=${searchTerm}.json`);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    
    const text = await res.text(); // Fetch raw text first
    console.log('Raw response:', text); // Log raw response for debugging
    
    let dictionaryData;
    try {
      dictionaryData = JSON.parse(text); // Parse JSON manually
    } catch (error) {
      throw new Error('Invalid JSON format');
    }
    
    if (dictionaryData.error) {
      throw new Error(dictionaryData.error);
    }

    // Find the definition of the searched word
    const result = dictionaryData.find(
      entry => entry.word.toLowerCase() === searchTerm.toLowerCase()
    );
    setDefinition(result ? result.definition : 'Word not found');
  } catch (error) {
    console.error('Failed to fetch JSON data:', error.message);
    setDefinition('Failed to fetch dictionary data');
  }
};


  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <Head>
        <title>Open Dictionary</title>
        <meta name="description" content="A simple static dictionary app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-md p-4 bg-white shadow-md rounded-lg">
        <h1 className="text-4xl font-bold mb-4 text-center">Open Dictionary</h1>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter a word"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <button 
            onClick={handleSearch}
            className="p-2 bg-blue-500 text-white rounded-md"
          >
            Search
          </button>
        </div>
        <p className="mt-4 text-lg text-gray-700 text-center">
          {definition || error}
        </p>
      </main>

      <footer className="mt-8 text-gray-500">
      </footer>
    </div>
  );
}
