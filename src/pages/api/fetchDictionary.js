export default async function handler(req, res) {
  const { filename } = req.query;
  
  if (!filename) {
    return res.status(400).json({ error: 'Filename parameter is required' });
  }
  
  try {
    const response = await fetch(`https://script.google.com/macros/s/AKfycbxAyKSSs3upvRqmYLiNsKwRzdbXqexAf5iXSX-gzok44reBadZGDm6YdLkF1WIvzuZL/exec?filename=${filename}`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Failed to fetch data from Google Apps Script:', error.message);
    res.status(500).json({ error: 'Failed to fetch dictionary data' });
  }
}
