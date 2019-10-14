export default (state = {
    tables: {
        "1": { amt: 0, no_of_items: 0, orders: {} },
        "2": { amt: 0, no_of_items: 0, orders: {} },
        "3": { amt: 0, no_of_items: 0, orders: {} },
        "4": { amt: 0, no_of_items: 0, orders: {} },
        "5": { amt: 0, no_of_items: 0, orders: {} }
    },
    items: {
        burger: 100,
        pizza: 120,
        coke: 80,
        fries: 90
    },
    dragged_item: null
},
    action) => {
    switch (action.type) {
        case "addOrder": break;
        case "deleteOrder": break;
        case "modifyOrder": break;
        case "addItem": break;
        case "modifyItem": break;
        case "deleteItem": break;
        case "dragItem":
            state = { ...state, dragged_item: action.val };
            break;
        case "dropItem":
            const table_no = action.table_no;
            var res;
            Object.entries(state.tables).map(([index, val]) => {
                if (index === table_no) res = val
            }
            );
            const item = state.dragged_item;
            const price = state.items[item];
            var amt = Number(res.amt) + Number(price);
            amt = Number(amt);
            const no_of_items = res.no_of_items + 1;
            var orders = res.orders;
            var flag = 0;
            Object.entries(orders).map(([order, no]) => {
                if (order === item) {
                    orders[item] = no + 1;
                    flag = 1;
                }
            });
            if (flag === 0) orders[item] = 1;
            const tables = { ...state.tables, [table_no]: { amt, no_of_items, orders } }
            state = { ...state, tables }
            break;
        default:
    }
    return state;
};