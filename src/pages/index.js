import { useState } from 'react';
import Head from 'next/head';

export default function Home({ dictionaryData, error }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [definition, setDefinition] = useState(null);

  const handleSearch = () => {
    if (!dictionaryData) {
      setDefinition('Data not available');
      return;
    }
    const result = dictionaryData.find(
      entry => entry.word.toLowerCase() === searchTerm.toLowerCase()
    );
    setDefinition(result ? result.definition : 'Word not found');
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
        <p>Powered by Next.js</p>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch('https://script.google.com/macros/s/AKfycbwaWNNJ6qbQR_Tva5kvh3qvFpol0CK-o4GxBIcnCeD5qbcsq40e80Becr5rd4R_k_T5/exec');
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const dictionaryData = await res.json();

    if (!Array.isArray(dictionaryData)) {
      throw new Error('Invalid JSON structure');
    }

    return {
      props: {
        dictionaryData,
        error: null,
      },
    };
  } catch (error) {
    console.error('Failed to fetch JSON data:', error.message);
    return {
      props: {
        dictionaryData: [],
        error: 'Failed to fetch dictionary data',
      },
    };
  }
}

