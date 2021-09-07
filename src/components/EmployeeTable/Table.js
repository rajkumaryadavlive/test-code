
import employeeList from '../../MockData/employeeList';
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Input } from '@material-ui/core';
import '../EmployeeTable/Table.scss';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      width: 250,
      editable: false,
    },
    {
      field: 'code',
      headerName: 'Code',
      width: 140,
      editable: false,
    },
    {
      field: 'availability',
      headerName: 'Availability',
      type: 'boolean',
      width: 170,
      editable: false,
    },
    {
      field: 'needing_repair',
      headerName: 'Need to Repair',
      type: 'boolean',
      width: 200,
    },
    {
      field: 'durability',
      headerName: 'Durability',
      type: 'number',
      width: 170,
    },
    {
      field: 'mileage',
      headerName: 'Mileage',
      type: 'number',
      width: 170,
    }
  ];
  
 

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

  
  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  
  export default function DataTable() {
    const [open, setOpen] = useState(false);
    const [openPrice, setOpenPrice] = useState(false);
    const [price, setPrice] = useState(0);
    const [data, setData] = useState([]);
    const [srchInput, setSrchcInput] = useState("");
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [age, setAge] = useState('');
    const [days, setDays] = useState("No of Days");
    const [book, setBook] = useState(false);
    const [ret, setRet] = useState(false);
    const [mileage, setMileage] = useState("");
    const daysHandler = (event) => {
      setDays(event.target.value);
    }

    const mileageHandler = (event) => {
      setMileage(event.target.value);
    }

    useEffect(() => {
      searchHandler();
    }, [srchInput]); 

    const searchHandler = () => {
      let datas1 = employeeList();
      let databody = datas1.user;
      let datas = [];
      for (let i = 0; i < databody.length; i++) {
        datas.push({"id":i+1, ...databody[i]}) ;
      }
      console.log(datas);
      if (srchInput) {
        setData(datas.filter(obj => obj.name.includes(srchInput)));
      }
      else {
        setData(datas); 
      }
      
    }

    const inputHandler = (event) => {
      setSrchcInput(event.target.value);
    }

    const returnHandler = (event) => {
      setRet(true);
      setOpen(true);
    }

    const handlePriceOpen = () => {
      
      if (ret) {
        setOpenPrice(true);
        setPrice(5000);
        setRet(false);
      }
      else {
        setOpenPrice(true);
        const priceData = data.filter(obj => ((obj.availability=== true)&&obj.name === age));
        const prce = priceData[0].price * days;
        setPrice(prce);
      }
    }

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setOpenPrice(false);
      setBook(false);
      setDays("Days");
      setPrice(0);
      setAge(""); 
      setRet(false);
      setMileage(0);
    };

    const dropHandler = (event) => {
      setAge(event.target.value);
    };

    const confirmBookingHandler = () => {
        setBook(true);
    }

    const availableData = data.filter(obj => obj.availability=== true);
    const listItems = availableData.map((obj) =>
    <MenuItem value={obj.name}>{obj.name}</MenuItem>
    );
  
    let body = null;

    if (ret) {
      body = (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Return a Product</h2>
          
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              defaultValue="Available are"
              onChange={dropHandler}
            >
          {listItems}
          </Select>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={4}>
            <Input
                  className="searchInput"
                  margin="dense"
                  type="number"
                  onChange={mileageHandler}
                  value={mileage}
                  placeholder="Used Mileage"
                
            />
          </Grid>
          <Grid item xs={6}>
          </Grid>
          <Grid item xs={3}>
            <Button 
                variant="contained" 
                color="primary"
                onClick={handlePriceOpen}
                disabled={(mileage<0)||!age}
              >
                Yes
              </Button>
          </Grid>
          <Grid item xs={3}>
              <Button 
                  variant="contained" 
                  color="primary"
                  onClick={handleClose}
                >
                  No
                </Button>
          </Grid>
         </Grid>
          
        
        </div>);
    }
    
    else if (book) {
      body = (
        <div style={modalStyle} className={classes.paper}>
          <FormControl className={classes.formControl}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
          <h4 id="simple-modal-title">Your Booking is confirmed.</h4>
          </Grid>
          <Grid item xs={12}>Thanks for booking.</Grid>
          <Grid item xs={6}>
          </Grid>
          <Grid item xs={3}>
          </Grid>
          <Grid item xs={3}>
              <Button 
                  variant="contained" 
                  color="primary"
                  onClick={handleClose}
                >
                  Close
                </Button>
          </Grid>
         </Grid>
          
        </FormControl>
        </div>);
    }

    else if (!openPrice) {
       body = (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Book a Product</h2>
          
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              defaultValue="Available are"
              onChange={dropHandler}
            >
          {listItems}
          </Select>
          </Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={3}>
            <Input
                  className="searchInput"
                  margin="dense"
                  type="number"
                  onChange={daysHandler}
                  value={days}
                  placeholder="Days"
                
            />
          </Grid>
          <Grid item xs={6}>
          </Grid>
          <Grid item xs={3}>
            <Button 
                variant="contained" 
                color="primary"
                onClick={handlePriceOpen}
                disabled={(days<1)||(!age)}
              >
                Yes
              </Button>
          </Grid>
          <Grid item xs={3}>
              <Button 
                  variant="contained" 
                  color="primary"
                  onClick={handleClose}
                >
                  No
                </Button>
          </Grid>
         </Grid>
          
        
        </div>);
    }

    else {
      body = (
        <div style={modalStyle} className={classes.paper}>
          <FormControl className={classes.formControl}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
          <h4 id="simple-modal-title">Your Estimated price is ${price}</h4>
          </Grid>
          <Grid item xs={12}>Do you want to proceed ? </Grid>
          <Grid item xs={6}>
          </Grid>
          <Grid item xs={3}>
            <Button 
                variant="contained" 
                color="primary"
                onClick={confirmBookingHandler}
              >
                Yes
              </Button>
          </Grid>
          <Grid item xs={3}>
              <Button 
                  variant="contained" 
                  color="primary"
                  onClick={handleClose}
                >
                  No
                </Button>
          </Grid>
         </Grid>
          
        </FormControl>
        </div>);
    }
    
    
    

    return (
      <div style={{ height: 400, width: '100%' }}>
        <div className={classes.root}>
          <Input
            className="searchInput"
            margin="dense"
            type="search"
            onChange={inputHandler}
            value={srchInput}
            placeholder="Search"
          
          />
          <Button 
            variant="contained" 
            color="primary"
            onClick={searchHandler}
          >
            Search
          </Button>

        </div>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          checkboxSelection={false}
          disableSelectionOnClick
          disableMultipleSelection={true}
        />
        <div className={classes.root}>
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleOpen}
          >
            Book
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={returnHandler}
          >
            Return
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>

        </div>
      </div>
    );
  }