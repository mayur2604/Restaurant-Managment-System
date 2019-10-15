import React from 'react';
import Table from "./components/Table";
import { ListItem, List, ListItemText } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import FoodItem from "./components/FoodItem";
import { connect } from "react-redux";
import Box from '@material-ui/core/Box';
class App extends React.Component {
  render() {
    let tables = this.props.tables;
    let menu = this.props.menu;

    const food_categories = Object.entries(menu).map(([category, items]) => {

      const food_items = items.map((item) => (
        <ListItem id={item}>
          <ListItemText><FoodItem name={item} price={this.props.items[item]}  dragItem={this.props.dragItem} /></ListItemText>
        </ListItem>
      ));
      return (<Box >
        <Box width={1} fontSize="h3.fontSize" mx="auto" p={1} fontFamily="Monospace">{category}</Box>
        <Box display="flex" flexDirection="row">{food_items}</Box>
      </Box>);


    });
    const Tables = Object.entries(tables).map(([table_no, table_info]) => (

      <ListItem id={table_no}>
        <ListItemText >
          <Table
            no={table_no}
            no_of_items={table_info.no_of_items}
            amt={table_info.amt}
            orders={table_info.orders}
            items={this.props.items}
            dropItem={this.props.dropItem}
            modifyOrder={this.props.modifyOrder}
            deleteOrder={this.props.deleteOrder}
          />
        </ListItemText>
      </ListItem>
    )
    );
    return (
      <Grid container direction="row" overflow="hidden">
        <Grid p={5} m={2}>
        <Box fontSize="h3.fontSize" mx="auto" p={1} fontFamily="Monospace">Tables</Box>
          <List >
            {Tables}
          </List>
        </Grid>
        <Divider orientation="vertical" />

        <Box p={5} m={2}>
          {food_categories}
        </Box>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    tables: state.tables,
    items: state.items,
    menu: state.menu
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dragItem: (val) => {
      dispatch({ type: "dragItem", val });
    },
    dropItem: (table_no) => {
      dispatch({ type: "dropItem", table_no });
    },
    modifyOrder: (table_no, item, no_of_items) => {
      dispatch({ type: "modifyOrder", table_no, item, no_of_items });
    },
    deleteOrder: (table_no, item) => {
      dispatch({ type: "deleteOrder", table_no, item });
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
