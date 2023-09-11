import React, { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import { Box, Paper } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const [book, setBook] = useState({});
  const {id} = useParams();

  useEffect(()=>{
    axios
      .get(`http://localhost:8000/books/${id}`)
      .then((response) => {
        setBook(response.data);
        // setLoading(false)
      })
      .catch((error) => {
        console.log(error);
        // setLoading(false);
      })
  }, [])
  return (
    <>
      <BackButton />
      <Box
        sx={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          backgroundColor: '#F8F0E5',
          height:500,
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            // width: 128,
            // height: 128,
          },
        }}
      >
        <Paper elevation={3} sx={{backgroundColor:'#123456', color:'whitesmoke', p:5}}>
          <div>
            <span>Id : </span>
            <span>{book._id}</span>
          </div>
          <div>
            <span>Title : </span>
            <span>{book.title}</span>
          </div>
          <div>
            <span>Author : </span>
            <span>{book.author}</span>
          </div>
          <div>
            <span>Publish Year : </span>
            <span>{book.publishYear}</span>
          </div>
        </Paper>
      </Box>
    </>
  )
}

export default BookDetails