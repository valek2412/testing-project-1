import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InfiniteScroll from 'react-infinite-scroller';
import EnhancedTableHead from './EnhancedTableHead';
import useRequest from '../hooks/useRequest';

const NewsTable = () => {
  const [state, update] = useRequest('https://api.hnpwa.com/v0/news/1.json');
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('time');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => (order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy));

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  if (state.isFetching && (state.page === 1)) return (<div>Loading</div>);

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={() => { update(`https://api.hnpwa.com/v0/news/${state.page}.json`); }}
      initialLoad={false}
      hasMore={state.page < 10}
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
              <TableRow hover onClick={() => { window.location.href = item.url; }} key={item.id}>
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

export default NewsTable;
