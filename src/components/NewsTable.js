import React from 'react';
import useRequest from "../hooks/useRequest";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const NewsTable = () => {
    const [state] = useRequest(`https://api.hnpwa.com/v0/news/1.json`);
    console.log(state);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Time added</TableCell>
                        <TableCell align="right">Title</TableCell>
                        <TableCell align="right">Domain</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {state.map(item => (
                        <TableRow key={item.id}>
                            <TableCell component="th" scope="row">
                                {item.time}
                            </TableCell>
                            <TableCell align="right">{item.title}</TableCell>
                            <TableCell align="right">{item.domain}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default NewsTable;