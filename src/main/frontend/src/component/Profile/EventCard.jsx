import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

const EventCard = ({item}) => {
  return (
    <div>
        <Card sx={{width:345}}>
            <CardMedia 
            sx={{height:345}}
            image={item.image}/>
            <CardContent>
                <Typography variant='h5'>
                    {item.name}
                </Typography>
                <Typography variant='body2'>
                    {item.description} At <b className='text-lg'> {item.restaurant.name}</b>
                </Typography>
                <div className='py-2 space-y-2'>
                    <p>{item.location}</p>
                    <p className='text-sm text-blue-500'>{item.startedAt? item.startedAt:""}</p>
                    <p className='text-sm text-red-500'>{item.endsAt? item.endsAt:""}</p>
                </div>
            </CardContent>
            {false && <CardActions>
                <IconButton>
                    <DeleteIcon/>
                </IconButton>
            </CardActions>}
        </Card>
    </div>
  )
}

export default EventCard