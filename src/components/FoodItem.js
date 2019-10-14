import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
function onDrag(e, prop) {
    e.preventDefault();
    prop.dragItem(prop.name);
}
class FoodItem extends React.Component {
    render() {
        return (
            <div draggable onDrag={(e) => onDrag(e, this.props)} >
                <Box component="div" boxShadow={3}
                    bgcolor="primary.main" color="primary.contrastText"
                    m={1}
                    px={2}
                    py={2}
                    overflow="hidden"
                    style={{ width: '90rem', height: '6rem' }}>
                    <Typography>
                        <Box pb={4} fontWeight="fontWeightBold" fontSize="h6.fontSize">
                            {this.props.name}
                        </Box><Box fontWeight="fontWeightMedium">
                            {this.props.price}
                        </Box>
                    </Typography>
                </Box>
            </div>
        );
    }

}
export default FoodItem;