import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
const BackButton = () => {
  return (
    <div >
        <Button href='/books' variant="contained" sx={{mx:5, my:2}}>Home</Button>
    </div>
  )
}

export default BackButton