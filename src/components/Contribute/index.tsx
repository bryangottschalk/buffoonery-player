import React, { ReactElement, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../store/slices/contribute';

interface Props {}
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 'calc(100% - 28px)'
    }
  }
}));

const handleClick = () => {
  alert(`Sorry, this feature isn't ready yet.`);
};
export default function Contribute({}: Props): ReactElement {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('');
  const { categories, loading, hasErrors, errorMsg } = useSelector(
    (state: any) => state
  ).contributeSlice;

  const handleChangeCategory = (e: any) => {
    setSelectedCategory(e.target.value);
  };
  useEffect(() => {
    if (!categories.length && !loading && !hasErrors) {
      dispatch(fetchCategories());
    }
  });

  const classes = useStyles();

  return (
    <div style={{ margin: '0px 16px' }}>
      <div style={{ marginBottom: 20 }}>
        <div>Contribute to this app! Submit prompt suggestions below.</div>
      </div>

      <form className={classes.root} noValidate autoComplete="off">
        <FormControl variant="outlined">
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            label="Category"
            value={selectedCategory}
            onChange={handleChangeCategory}
          >
            {categories.length > 0 &&
              categories.map((c: any, idx: number) => (
                <MenuItem key={idx} value={c.category}>
                  {c.category}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <TextField id="outlined-basic" label="Prompt" variant="outlined" />
        <Button onClick={handleClick} variant="contained" color="primary">
          Submit
        </Button>
      </form>
      {hasErrors && errorMsg && (
        <div style={{ marginTop: 10, color: 'red' }}>{errorMsg}</div>
      )}
      {loading && <CircularProgress />}
    </div>
  );
}
