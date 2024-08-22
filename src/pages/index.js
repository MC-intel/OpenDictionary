import { useState } from 'react';
import Head from 'next/head';
import dictionaryData from '../data/dictionary.json';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [definition, setDefinition] = useState(null);

  const handleSearch = () => {
    const result = dictionaryData.find(
      entry => entry.word.toLowerCase() === searchTerm.toLowerCase()
    );
    setDefinition(result ? result.definition : 'Word not found');
  };

  return (
    <div className="container">
      <Head>
        <title>Open Dictionary</title>
        <meta name="description" content="A simple static dictionary app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Open Dictionary</h1>
        <input
          type="text"
          placeholder="Enter a word"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <p>{definition}</p>
      </main>

      <footer>
        <p>Powered by Next.js</p>
      </footer>

      <style jsx>{`
        .container {
          padding: 0 2rem;
        }
        main {
          min-height: 100vh;
          padding: 4rem 0;
          text-align: center;
        }
        h1 {
          margin: 0;
          font-size: 4rem;
        }
        input {
          font-size: 1.5rem;
          padding: 0.5rem;
          margin-right: 1rem;
        }
        button {
          font-size: 1.5rem;
          padding: 0.5rem 1rem;
        }
        p {
          font-size: 1.2rem;
          margin-top: 2rem;
        }
        footer {
          position: absolute;
          bottom: 0;
          width: 100%;
          text-align: center;
          padding: 1rem;
          background: #f1f1f1;
        }
      `}</style>
    </div>
  );
}
