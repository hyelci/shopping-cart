import CartItem from "./CartItem"

const reducer = (state, action) => {
    if(action.type === 'CLEAR_CART'){
        return {...state, cart:[]}
    }
    if(action.type ==='REMOVE'){
        return { 
            ...state, 
            cart:state.cart.filter((cartItem)=> cartItem.id !== action.payload )}
    }
    // if (action.type === 'INCREASE'){ 

    //     let tempCart = state.cart.map((cartItem)=> {
    //         if(cartItem.id === action.payload){
    //             return { ...cartItem, amount: cartItem.amount + 1}
    //         }
    //         return cartItem
    //     });
    //     return {...state, cart:tempCart}
    // }

    //  if (action.type === 'DECREASE'){ 

    //     let tempCart = state.cart.map((cartItem)=> {
    //         if(cartItem.id === action.payload){ 
    //             return { ...cartItem, amount: cartItem.amount - 1}
    //         }
    //         return cartItem
    //     })
    //     .filter((cartItem)=> cartItem.amount !==0) 


    //     return {...state, cart:tempCart}  
    // }

    if(action.type === 'GET_TOTALS'){
        let total = 0;
        let amount = 0;
        for (const cartItem of state.cart) {
            total = total + (cartItem.price * cartItem.amount)
            amount = amount + cartItem.amount
        }

        // let {total, amount} = state.cart.reduce((cartTotal, cartItem)=> {
        //     const {price, amount} = cartItem;
        //     const itemTotal = price * amount;

        //     cartTotal.total += itemTotal
        //     cartTotal.amount += amount
        //     return cartTotal
        // }, {
   
        //     total: 0,
        //     amount: 0,
        // })





        total = parseFloat(total.toFixed(2))

        return {...state, total, amount} 
    }

    if(action.type === 'LOADING'){
        return{ ...state, loadind : true}
    } 
    if(action.type === "DISPLAY_ITEMS"){
        return { ...state, cart: action.payload, loading:false}
    }
    if (action.type === 'TOGGLE_AMOUNT'){
        let tempCart = state.cart
        .map((cartItem)=> {
            if(cartItem.id === action.payload.id){
             if(action.payload.type === 'inc'){
                return { ...cartItem, amount:cartItem.amount +1}
             }
             if(action.payload.type === 'dec'){
                return { ...cartItem, amount:cartItem.amount -1}

             }
            }
            return cartItem
         })
         .filter((cartItem)=> cartItem.amount !==0)
        return {...state, cart:tempCart}
    }
    return state
}


export default reducer


