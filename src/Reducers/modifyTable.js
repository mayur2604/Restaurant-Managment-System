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
        case "deleteOrder": {
            const table_no = action.table_no;
            let res;
            Object.entries(state.tables).map(([index, val]) => {
                if (index === table_no) res = val
            }
            );
            let amt = res.amt;
            let no_of_items = res.no_of_items;
            let orders = res.orders;
            let temp = 0;
            const item = action.item;
            const price = state.items[item];
            Object.entries(orders).map(([order, no]) => {
                if (order === item) {
                    temp = no;
                    delete orders[item];
                }

            });
            amt = Number(amt) - Number(temp) * Number(price);
            no_of_items = Number(no_of_items) - Number(temp);
            const tables = { ...state.tables, [table_no]: { amt, no_of_items, orders } }
            state = { ...state, tables }
            break;
        }
        case "modifyOrder": {
            const table_no = action.table_no;
            let res;
            Object.entries(state.tables).map(([index, val]) => {
                if (index === table_no) res = val
            }
            );
            let amt = 0;
            let no_of_items = 0;
            let orders = res.orders;
            const modified_no_of_items = action.no_of_items;
            const item = action.item;
            Object.entries(orders).map(([order, no]) => {
                if (order === item) {
                    orders[item] = modified_no_of_items;
                }
                amt = Number(amt) + Number(state.items[order]) * Number(orders[order]);
                no_of_items = Number(no_of_items) + Number(orders[order]);
            });
            const tables = { ...state.tables, [table_no]: { amt, no_of_items, orders } }
            state = { ...state, tables }
            break;
        }
        case "dragItem": {
            state = { ...state, dragged_item: action.val };
            break;
        }
        case "dropItem": {
            const table_no = action.table_no;
            let res;
            Object.entries(state.tables).map(([index, val]) => {
                if (index === table_no) res = val
            }
            );
            const item = state.dragged_item;
            const price = state.items[item];
            let amt = Number(res.amt) + Number(price);
            amt = Number(amt);
            const no_of_items = res.no_of_items + 1;
            let orders = res.orders;
            let flag = 0;
            Object.entries(orders).map(([order, no]) => {
                if (order === item) {
                    orders[item] = no + 1;
                    flag = 1;
                }
            });
            if (flag === 0) orders[item] = 1;
            const tables1 = { ...state.tables, [table_no]: { amt, no_of_items, orders } }
            state = { ...state, tables: tables1 }
            break;
        }
        default:
    }
    return state;
};