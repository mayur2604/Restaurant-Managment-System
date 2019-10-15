import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { ListItem, List } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
function dragOver(e) {
    e.preventDefault();
}
function onDrop(e, props) {
    props.dropItem(props.no);
}
function handleModify(e, item, props) {
    e.preventDefault();
    props.modifyOrder(props.no, item, e.target.value);
}
function handleDelete(e, item, props) {
    e.preventDefault();
    props.deleteOrder(props.no, item);
}
class Table extends React.Component {
    render() {
        const items = Object.entries(this.props.orders).map(([order, no]) => (
            <ListItem>
                <Box px={1} mx="auto" fontSize="h6.fontSize">
                    {order}
                </Box>
                <Box px={1} mx="auto" fontSize="h6.fontSize">
                    {this.props.items[order]}
                </Box >
                <Box px={1} mx="auto" fontSize="h6.fontSize">
                    <TextField
                        id="standard-number"
                        label="Number"
                        value={no}
                        onChange={(e) => handleModify(e, order, this.props)}
                        type="number"
                    />
                </Box>
                <Box px={1} mx="auto">
                    <DeleteIcon onClick={(e)=>handleDelete(e, order, this.props)} />
                </Box>
            </ListItem>
        ));
        return (
            <PopupState variant="popover" popupId="demo-popup-popover">
                {popupState => (
                    <div>
                        <div onDragOver={(e) => { dragOver(e) }} onDrop={(e) => { onDrop(e, this.props) }} {...bindTrigger(popupState)}>
                            <Box component="div"
                                boxShadow={3}
                                bgcolor="primary.main"
                                color="primary.contrastText"
                                m={1}
                                px={2}
                                py={2}
                                style={{ width: '9rem', height: '6rem' }}>
                                <Typography>
                                    <Box pb={4} fontWeight="fontWeightBold" fontSize="h6.fontSize">
                                        Table-{this.props.no}
                                    </Box>
                                    <Box fontWeight="fontWeightMedium" >
                                        Rs-{this.props.amt} |
        Total Items-{this.props.no_of_items}
                                    </Box>
                                </Typography>
                            </Box>
                        </div>
                        <Popover
                            {...bindPopover(popupState)}
                            anchorReference="anchorPosition"
                            anchorPosition={{ top: 200, left: 500 }}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >

                            <Box boxShadow={3} height={400} width={800} bgcolor="secondary.main" color="secondary.contrastText">
                                <Box p={1} width={1} mx="auto" fontWeight="fontWeightBold" fontSize="h5.fontSize" >Order Details</Box>
                                <List>
                                    <ListItem>
                                        <Box pr={1} mx="auto" fontWeight="fontWeightMedium" fontSize="h6.fontSize">NAME</Box>
                                        <Box pr={1} mx="auto" fontWeight="fontWeightMedium" fontSize="h6.fontSize">PRICE</Box>
                                        <Box pr={1} mx="auto" fontWeight="fontWeightMedium" fontSize="h6.fontSize">SERVINGS</Box>
                                        <Box pr={1} mx="auto" fontWeight="fontWeightMedium" fontSize="h6.fontSize">DELETE</Box>
                                    </ListItem>
                                    {items}
                                </List>
                            </Box>
                        </Popover>
                    </div>
                )}
            </PopupState>
        );
    }
}
export default Table;