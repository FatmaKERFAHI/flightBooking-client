import 'isomorphic-fetch';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export default function Asynchronous({idInput, labelInput, parentCallback}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await fetch('http://localhost:8081/flight/airports');
      await sleep(1e3); // For demo purposes.
      const countries = await response.json();
      console.log(countries);
      if (active) {
        setOptions(countries);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  function handleClick(event) {
    var value = event.target.value.split(" - ");
    parentCallback(value[1]);
  }

  return (
    <Autocomplete
      id={idInput}
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onSelect={handleClick}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={option => option.name + ' - ' + option.code}
      groupBy={option => option.country.name}
      options={options}
      loading={loading}
      renderInput={params => (
        <TextField
          {...params}
          label={labelInput}
          fullWidth
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}