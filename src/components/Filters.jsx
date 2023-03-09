import React from 'react';
import {
    Grid
    , TextField
    , MenuItem
    , Button
} from '@mui/material';
import {cuisineList} from '../utils/cuisineList';


const Filters = props => {
    const {filterValues, handleFilterChange, handleSearchClick, handleResetClick} = props;
    return (
        <>
            <Grid item xs={6}>
                <TextField 
                    id="query" 
                    label="Query" 
                    variant="outlined" 
                    fullWidth
                    value={filterValues.query}
                    onChange={event => handleFilterChange('query', event.target.value)}

                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    id="cuisine"
                    select
                    label="Cuisine"
                    fullWidth
                    value={filterValues.cuisine}
                    onChange={event => handleFilterChange('cuisine', event.target.value)}
                >
                    {cuisineList.map((opt, idx) => (
                        <MenuItem key={`${opt}-${idx}`} value={opt}>{opt}</MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <Button 
                    variant="contained" 
                    onClick={handleSearchClick}
                    disabled={!filterValues.query && !filterValues.cuisine}
                    style={{marginRight: '5px'}}
                >
                    Search
                </Button>
                <Button 
                    variant="outlined" 
                    onClick={handleResetClick}
                    disabled={!filterValues.query && !filterValues.cuisine}
                    style={{marginRight: '5px'}}
                >
                    Reset
                </Button>
            </Grid>
        </>
    )
}

export default Filters;