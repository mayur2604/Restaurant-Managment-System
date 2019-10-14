import React from 'react';
import Table from "./components/Table";
import { ListItem, List, ListItemText, IconButton, Typography } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import FoodItem from "./components/FoodItem";
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
class App extends React.Component {
  render() {
    var tables = this.props.tables;
    var items = this.props.items;
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
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
