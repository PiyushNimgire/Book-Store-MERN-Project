import React, { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Stack, TextField } from '@mui/material';

const EditBook = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    publishYear: '',
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
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

  const handleEditBook = () => {
    // const book = {title, author, publishYear};
    axios
      .put(`http://localhost:8000/books/${id}`, book)
      .then((response) => {
        navigate('/books');
      })
      .catch((error) => console.log(error))
  }



  return (
    <>
      <BackButton />
      <div>
        <Box
          component="form"
          sx={{
            display:'flex',
            justifyContent:'center',
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <Stack spacing={5}>
            <TextField
              id="standard-basic"
              label="title"
              variant="standard"
              value={book.title}
              onChange={(e) => setBook({ ...book, title: e.target.value })}
            />
            <TextField
              id="standard-basic"
              label="author"
              variant="standard"
              value={book.author}
              onChange={(e) => setBook({ ...book, author: e.target.value })}
            />
            <TextField
              id="standard-basic"
              label="publishYear"
              variant="standard"
              value={book.publishYear}
              onChange={(e) => setBook({ ...book, publishYear: e.target.value })}
            />
            <Button variant="contained" onClick={handleEditBook}>Update Book</Button>
          </Stack>

        </Box>
      </div>
    </>
  )
}

export default EditBook