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
    <div className="min-h-screen flex flex-col justify-between items-center bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <Head>
        <title>Open Dictionary</title>
        <meta name="description" content="A simple static dictionary app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-lg p-8 bg-white dark:bg-gray-800 shadow-lg rounded-xl mt-10">
        <h1 className="text-5xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          Open Dictionary
        </h1>
        <div className="flex space-x-3">
          <input
            type="text"
            placeholder="Enter a word..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
          />
          <button 
            onClick={handleSearch}
            className="px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 focus:outline-none"
          >
            Search
          </button>
        </div>
        <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 text-center">
          {definition || error}
        </p>
      </main>

      <footer className="w-full py-4 bg-gray-200 dark:bg-gray-800 text-center text-gray-600 dark:text-gray-400">
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
