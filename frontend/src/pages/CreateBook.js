import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { Box, Button, Stack, TextField } from '@mui/material';

const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const book = { title, author, publishYear };
    axios
      .post('http://localhost:8000/books', book)
      .then((response) => {
        navigate('/books');
      })
      .catch((error) => console.log(error))
  }

  return (
    <div>
      <BackButton />
      <Box
        component="form"
        sx={{
          display: 'flex',
          justifyContent: 'center',
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="author"
            variant="standard"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="publishYear"
            variant="standard"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
          />
          <Button variant="contained" onClick={handleSubmit}>Create</Button>
        </Stack>
      </Box>
    </div>
  )
}

export default CreateBook