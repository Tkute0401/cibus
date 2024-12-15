import React, { useEffect } from 'react'
import AddressCard from '../Cart/AddressCard'
import { useSelector } from 'react-redux';
import { GetUser } from '../State/Authentication/Action';
import { Card } from '@mui/material';
import AddLocationTwoToneIcon from '@mui/icons-material/AddLocationTwoTone';
import { Button } from '@mui/material';
import NewAddress from './NewAddressModal';

const Address = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  console.log("opesn address model")
  const  handleOpenAddressModel = () => {
    setOpen(true);
  }

  const {auth} = useSelector(Store => Store);
  const user = localStorage.getItem("user");
  useEffect(() => {
    GetUser(localStorage.getItem("jwt"));
  })
  console.log("user",user);
  return (
    <div>
      <div className="flex items-center flex-col lg:px-10">
        <h1 className="text-xl text-center py-7 font-semibold">Addresses</h1>
        <div className="flex justify-center flex-wrap gap-3">
          {auth.user?.addresses.map((item) => (
            <AddressCard item={item}/>
          ))}
          {/* <Card className="flex flex-col justify-center items-center p-5  w-64 ">
                <div className="flex space-x-5">
                  <AddLocationTwoToneIcon />
                  <div className="space-y-5">
                    <p>Add New Address</p>
                    <Button
                      onClick={handleOpenAddressModel}
                      sx={{ padding: ".75rem" }}
                      fullWidth
                      variant="contained"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </Card> */}
        </div>
          {/* {open && <NewAddress open={open} handleClose={handleClose}/>} */}
      </div>
    </div>
  );
}

export default Address