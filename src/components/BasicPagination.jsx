import React, {useState, useEffect} from 'react';
import {Pagination, Grid} from '@mui/material'

const BasicPagination = props => {

    const {totalRecords, handlePageChange, activePage = 1} = props;

    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        if(totalRecords > 0) {
            setTotalPages(Math.ceil(totalRecords/5));
        }
    }, [totalRecords])
    return (
        <Grid item xs={12} style={{textAlign: 'center'}}>
            <Pagination 
                count={totalPages} 
                color="primary" 
                onChange={handlePageChange}
                page={activePage}
            />
        </Grid>
    )
}

export default BasicPagination;