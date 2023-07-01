import Booksearch from '../componets/Booksearch';
import BookList from '../componets/Booklist';

import { useEffect,useContext } from 'react';
import { AuthContext } from "../authContext/AuthContext";
import { useNavigate } from "react-router-dom";

function Bookshelf() {
  const {user}=useContext(AuthContext);
  const navigate=useNavigate();
  useEffect(()=>{
    if(user===null){
      return navigate("/")
    }
  },[]);
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-6'><Booksearch/></div>
        <div className='col-6'><BookList/></div>
      </div>
    </div>
  );
}

export default Bookshelf;