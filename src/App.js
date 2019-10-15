import React from 'react';
import Table from "./components/Table";
import { ListItem, List, ListItemText } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import FoodItem from "./components/FoodItem";
import { connect } from "react-redux";

class App extends React.Component {
  render() {
    let tables = this.props.tables;
    let items = this.props.items;
    const food_items = Object.entries(items).map(([item, price]) => (
      <ListItem id={item}>
        <ListItemText><FoodItem name={item} price={price} dragItem={this.props.dragItem} /></ListItemText>
      </ListItem>
    ));
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
      <Grid container>
        <List  >
          {Tables}
        </List>
        <Divider orientation="vertical" />
        <List>
          {food_items}
        </List>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    tables: state.tables,
    items: state.items
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dragItem: (item) => {
      dispatch({ type: "dragItem", val: item });
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
