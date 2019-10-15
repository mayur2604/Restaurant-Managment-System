export default (state = {
    tables: {
        "1": { amt: 0, no_of_items: 0, orders: {} },
        "2": { amt: 0, no_of_items: 0, orders: {} },
        "3": { amt: 0, no_of_items: 0, orders: {} },
        "4": { amt: 0, no_of_items: 0, orders: {} },
        "5": { amt: 0, no_of_items: 0, orders: {} }
    },
    items: {
        "Manchuria": 200, "Spring Roll": 190, "Panner 65": 150,"Veg Bullet":230, "Finger Chips":250,
        "Tomato Soup": 100, "Veg Corn Soup": 120, "Manchow Soup": 130,"Hot & Sour Soup":115, "Sweet Corn Soup":120,
        "Fried Rice": 190, "Schezwan Noodles": 200, "Paneer Fried Rice": 230,"Fried Noodles":230, "Masala Fried Rice":220,
        "Kadai Paneer": 200, "Dal Fry": 120, "Butter Roti": 100,"Kulcha":120, "Naan":90,
        "Gulab Jamun": 110, "Choclate Brownie": 180, "Strawberry ice-cream": 100,"Choclate Ice-cream":120, "Vanilla IceCream":100,
        "Coke": 100, "Sprite": 100, "Fanta": 100,"Butter Milk":130, "Lassi":170
    },
    menu: {
        "Starters": ["Manchuria", "Spring Roll", "Panner 65", "Veg Bullet", "Finger Chips"],
        "Soups": ["Tomato Soup", "Veg Corn Soup", "Manchow Soup", "Hot & Sour Soup", "Sweet Corn Soup"],
        "Chinese": ["Fried Rice", "Schezwan Noodles", "Paneer Fried Rice", "Fried Noodles", "Masala Fried Rice"],
        "Indian": ["Kadai Paneer", "Dal Fry", "Butter Roti", "Kulcha", "Naan"],
        "Deserts": ["Gulab Jamun", "Choclate Brownie", "Strawberry ice-cream", "Choclate Ice-cream", "Vanilla IceCream"],
        "Beverages": ["Coke", "Sprite", "Fanta", "Butter Milk", "Lassi"]
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