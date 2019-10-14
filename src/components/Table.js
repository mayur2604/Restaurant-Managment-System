import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { ListItem, List } from '@material-ui/core';

function dragOver(e) {
    e.preventDefault();
}
function onDrop(e, props) {
    props.dropItem(props.no);
}

class Table extends React.Component {
    render() {
        const items = Object.entries(this.props.orders).map(([order, no]) => (
            <ListItem>
                <Box px={1} mx="auto">
                    {order}
                </Box>
                <Box px={1}  mx="auto">
                    {this.props.items[order]}
                </Box >
                <Box px={1}  mx="auto">
                    {no}
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
                            anchorPosition={{ top: 200, left: 400 }}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >

                            <Typography>
                                <Box px={12} mx="auto">Order Details</Box>
                                <List>
                                    <ListItem>
                                    <Box px={2} mx="auto">NAME</Box>
                                    <Box px={2} mx="auto">SERVINGS</Box> 
                                    <Box px={2} mx="auto">PRICE</Box>
                                    </ListItem>
                                    {items}
                                </List>
                            </Typography>
                        </Popover>
                    </div>
                )}
            </PopupState>
        );
    }
}
export default Table;