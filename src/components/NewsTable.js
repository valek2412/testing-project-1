import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InfiniteScroll from 'react-infinite-scroller';
import EnhancedTableHead from './EnhancedTableHead/EnhancedTableHead';
import useRequest from '../hooks/useRequest';
import getComparator from '../utils/comparator';
import stableSort from '../utils/stableSort';

const NewsTable = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const [state, update] = useRequest(`${props.url}1.json`);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // eslint-disable-next-line react/jsx-filename-extension
  if (state.isFetching && (state.page === 1)) return (<div>Loading</div>);

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={() => { update(`${props.url}${state.page}.json`); }}
      initialLoad={false}
      hasMore={!state.error}
      loader={<div className="loader" key={state.page}>Loading ...</div>}
    >
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {stableSort(state.responseData, getComparator(order, orderBy)).map((item) => (
              <TableRow hover onClick={() => { window.location.href = item.url; }} key={item.title}>
                <TableCell component="th" scope="row">
                  {item.time_ago}
                </TableCell>
                <TableCell align="right">{item.title}</TableCell>
                <TableCell align="right">{item.domain}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </InfiniteScroll>
  );
};

NewsTable.propTypes = {
  url: PropTypes.string.isRequired,
};

export default NewsTable;
