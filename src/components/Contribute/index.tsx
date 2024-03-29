import React, {
  ReactElement,
  RefObject,
  useEffect,
  useRef,
  useState
} from 'react';
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
import {
  fetchCategories,
  fetchSavePrompt
} from '../../store/slices/contribute';
import { setNavigationTab } from '../../store/slices/application';

interface Props {}
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 'calc(100% - 28px)'
    }
  }
}));

export default function Contribute({}: Props): ReactElement {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('');
  const { categories, loading, hasErrors, errorMsg } = useSelector(
    (state: any) => state
  ).contributeSlice;
  const { navigationTab } = useSelector((state: any) => state).applicationSlice;
  const classes = useStyles();

  useEffect(() => {
    if (!categories.length && !loading && !hasErrors) {
      dispatch(fetchCategories());
    }
  });

  useEffect(() => {
    if (!hasErrors && !loading && !navigationTab) {
      dispatch(setNavigationTab('contribute'));
    }
  }, [dispatch, hasErrors, loading, navigationTab]);

  const handleChangeCategory = (e: any) => {
    setSelectedCategory(e.target.value);
  };

  const promptValueRef = useRef<any>(''); //creating a refernce for TextField Component
  const handleSubmitPrompt = (e: any) => {
    e.preventDefault();
    dispatch(
      fetchSavePrompt({
        category: selectedCategory,
        prompt: promptValueRef.current.value
      })
    );
  };

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
        <TextField
          inputRef={promptValueRef}
          id="outlined-basic"
          label="Prompt"
          variant="outlined"
        />
        <Button
          type="submit"
          onClick={handleSubmitPrompt}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
      {selectedCategory && (
        <React.Fragment>
          <h2>Existing prompts for this category:</h2>

          <div
            style={{
              height: 250,
              overflowY: 'scroll',
              textAlign: 'left',
              margin: '10px 20px 0px 20px'
            }}
          >
            {selectedCategory &&
              categories
                .find((c: any) => c.category === selectedCategory)
                .prompts.map(
                  (
                    p: {
                      submittedBy: string;
                      prompt: string;
                      timestamp: string;
                    },
                    idx: number
                  ) => (
                    <div key={idx} style={{ marginBottom: 12 }}>
                      <div>
                        <strong>Prompt:</strong> {p.prompt}
                      </div>
                      <div>
                        <strong>Submitted By:</strong> {p.submittedBy}
                      </div>
                      <div>
                        <strong>Timestamp: </strong>
                        {p.timestamp}
                      </div>
                    </div>
                  )
                )}
          </div>
        </React.Fragment>
      )}

      {hasErrors && errorMsg && (
        <div style={{ marginTop: 10, color: 'red' }}>{errorMsg}</div>
      )}
      {loading && <CircularProgress />}
    </div>
  );
}
