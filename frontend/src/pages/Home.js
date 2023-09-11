import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {Link, useNavigate} from 'react-router-dom';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] =useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8000/books')
      .then((response) => {
        setBooks(response.data);
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
  },[]);

  const deleteBook = (id) => {
    axios
      .delete(`http://localhost:8000/books/${id}`)
      .then((response) => {
        setBooks((prevState) => prevState.filter((book) => book._id!==id));
        // setLoading(false)
      })
      .catch((error) => {
        console.log(error);
        // setLoading(false);
      })
  }
  return (
    <div style={{margin: 20}}>
      
      <Stack direction={'row'} justifyContent={'space-between'}>
        <h1>Books List</h1>
        <Link to={`/books/create`} style={{display:'flex', alignContent:'center', flexWrap:'wrap'}}>
            <AddBoxOutlinedIcon />
        </Link>
      </Stack>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell align="center">No</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Author</TableCell>
            <TableCell align="center">Publish Year</TableCell>
            <TableCell align="center">Operations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book, index) => (
            <TableRow
              key={book._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell align="center">{book.title}</TableCell>
              <TableCell align="center">{book.author}</TableCell>
              <TableCell align="center">{book.publishYear}</TableCell>
              <TableCell align="center">
                <Link to={`/books/details/${book._id}`} style={{color:'black', marginRight:10}}>
                  <InfoOutlinedIcon />
                </Link>
                <Link to={`/books/edit/${book._id}`} style={{color:'black', marginRight:10}}>
                  <BorderColorOutlinedIcon />
                </Link>
                <IconButton aria-label="delete" color='warning' sx={{p:0}} onClick={() => deleteBook(book._id)}>
                  <DeleteOutlinedIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default Home