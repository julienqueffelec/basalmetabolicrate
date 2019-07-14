import React, { useState } from "react";import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import FormControl from '@material-ui/core/FormControl';
import clsx from 'clsx';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';

const theme = createMuiTheme({
    palette: {
      primary: red,
      secondary: red,
    },
});

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    height: '100vh',
    justifyContent: 'center',
  },
  app: {
    width: '600px',
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
  },
  select: {
    marginTop: theme.spacing(2),
  },
  bmr: {
    display: 'flex',
    fontSize: 50,
    justifyContent: 'center',
  }
}));

export default function App() {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    activity: '',
    age: '',
    gender: '',
    weight: '',
    size: '',
    bmr: '500',
  });

  const handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (values.gender) {
      if (values.gender === 'male') {
        const bmr = Math.round((66.5 + (13.75 * values.weight) + (5 * values.size) - (6.77 * values.age)) * values.activity);
        setValues({
          ...values,
          bmr: bmr
        });
      } else {
        const bmr = Math.round((665.1 + (9.56 * values.weight) + (1,.5 * values.size) - (4.67 * values.age)) * values.activity);
        setValues({
          ...values,
          bmr: bmr
        });
      }

    }



  };

  return (
    <div className={classes.root}>
      <form className={classes.app} onSubmit={handleSubmit}>
        <Typography className={classes.title} variant="h2" component="h2" gutterBottom>
          Calculate Basal Metabolic Rate (BMR) online (Harris Benedict Equation)
        </Typography>
        {values.bmr && <Typography gutterBottom className={classes.bmr}>{values.bmr} calories</Typography>}
        <MuiThemeProvider theme={theme}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="activity-simple">Activity level</InputLabel>
              <Select
                value={values.activity}
                onChange={handleChange}
                inputProps={{
                  name: 'activity',
                  id: 'activity-simple',
                }}
              >
                <MenuItem value={1.2}>Sitting/lying all day (1.2</MenuItem>
                <MenuItem value={1.3}>Seated work, no exercise (1.3)</MenuItem>
                <MenuItem value={1.4}>Seated work, light exercise (1.4)</MenuItem>
                <MenuItem value={1.5}>Moderately physical work, no exercise (1.5)</MenuItem>
                <MenuItem value={1.6}>Moderately physcial work, light exercise (1.6)</MenuItem>
                <MenuItem value={1.7}>oderately physcial work, heavy exercise (1.7)</MenuItem>
                <MenuItem value={1.8}>Heavy work / heavy exercise (1.8)</MenuItem>
                <MenuItem value={2}>bove average physical work / exercise (2.0-2.4)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
              <Input
                id="adornment-weight"
                values={values.weight}
                onChange={handleChange}
                endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                aria-describedby="weight-helper-text"
                inputProps={{
                  name: 'weight',
                  'aria-label': 'Poids',
                }}
              />
                <FormHelperText id="weight-helper-text">Weight</FormHelperText>
              </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
              <Input
                id="adornment-size"
                values={values.size}
                onChange={handleChange}
                endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                aria-describedby="size-helper-text"
                inputProps={{
                  name: 'size',
                  'aria-label': 'Taille',
                }}
              />
              <FormHelperText id="size-helper-text">Height</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
              <Input
                id="adornment-age"
                values={values.age}
                onChange={handleChange}
                endAdornment={<InputAdornment position="end">y/o</InputAdornment>}
                aria-describedby="age-helper-text"
                inputProps={{
                  name: 'age',
                  'aria-label': 'Age',
                }}
              />
              <FormHelperText id="age-helper-text">Age</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
              <Select
                  value={values.gender}
                  onChange={handleChange}
                  inputProps={{
                    name: 'gender',
                    id: 'gender-simple',
                  }}
                >
                  <MenuItem value={'male'}>Male</MenuItem>
                  <MenuItem value={'female'}>Female</MenuItem>
                </Select>
              <FormHelperText id="gender-helper-text">Gender</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth type="submit" variant="contained" color="primary" className={classes.button}>
              Valider
            </Button>
          </Grid>
        </Grid>
        </MuiThemeProvider>
      </form>
    </div>
  );
}