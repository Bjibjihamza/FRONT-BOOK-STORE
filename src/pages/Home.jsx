import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-center gap-x-4 mb-6">
        <button
          className="btn-toggle"
          onClick={() => setShowType('table')}
        >
          Table View
        </button>
        <button
          className="btn-toggle"
          onClick={() => setShowType('card')}
        >
          Card View
        </button>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-semibold">Books List</h1>
        <Link to="/books/create" className="icon-btn">
          <MdOutlineAddBox className="text-4xl" />
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
