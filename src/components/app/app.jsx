import React, { useReducer, useState } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import { ProductsContext } from '../../services/productsContext.jsx';
import { CartContext } from '../../services/cartContext.jsx';
import { OrdersContext } from '../../services/ordersContext.jsx';

const totalInitialState = { total:0 };

function reducer(totalState, action) {
  switch (action.type) {
    case "change":
      return { total: action.total };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
} 

function App() {

  const [ state, setState ] = useState({
    isLoading: false,
    hasError: false,
    products: []
  });

  const [ modal, setModal ] = useState({
    visability: false,
    content: null
  });

  const [ cartState, setCart ] = useState({
    isLoading: false,
    ingredients: [],
    bun: null
  });

  const [ ordersState, setOrders ] = useState({orders:[]});

  const url = 'https://norma.nomoreparties.space/api/';

  const [totalState, totalDispatcher] = useReducer(reducer, totalInitialState, undefined);

  const ingredients = [];

  const handleOpenModal = (content) => {
    setModal({ visability:true, content:content })
  }

  const handleCloseModal = () => {
    setModal({ ...modal, visability:false })
  }

  React.useEffect(() => {
    const getProducts = async () => {
      fetch(url + 'ingredients')
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(res.status);
        })
        .then(data => {
          setState((prevState) => ({...prevState, products:data.data, isLoading:false}))
          setCart((prevState) => ({...prevState, isLoading:true}));
        })
        .catch(e => {
          setState((prevState) => ({...prevState, hasError: true, isLoading:false }));
        });
    };
    getProducts();
  }, []);

  React.useEffect(() => {
    if (cartState.isLoading) {
      if (state.products.length > 0) {
        state.products.forEach((product, index) => {
          if (product.type === 'bun') setCart((prevState) => ({ ...cartState, bun:(cartState.bun !== product._id) ? product._id : cartState.bun }));
          else {
            ingredients.push(product._id);
            setCart((prevState) => ({ ...prevState, bun:prevState.bun, ingredients:ingredients }));
          }
        });
      }
      setCart((prevState) => ({...prevState, isLoading:false}));
    }
  }, [cartState.isLoading]);

  React.useEffect(() => {
    let total = 0;
    if (cartState.ingredients.length > 0) cartState.ingredients.map((item, index) => total += state.products.find(product => item === product._id).price);
    if (cartState.bun != null) {
      total += 2 * state.products.find(product => product._id === cartState.bun).price;
    }
    totalDispatcher({type:'change', total:total});
  }, [cartState.bun, cartState.ingredients]);

  const dataProducts = state.products;
  const visabilityModal = modal.visability;
  const contentModal = modal.content;

  return (
    <div>
      <AppHeader />
      <main>
        <div className={styles.conteiner}>
          <ProductsContext.Provider value={{ dataProducts }}>  
            <BurgerIngredients products={dataProducts} handleOpenModal={handleOpenModal} key='1' />
            <CartContext.Provider value={{ totalState, totalDispatcher, cartState }}>
              <OrdersContext.Provider value={{ ordersState, setOrders, url }}>
                <BurgerConstructor handleOpenModal={handleOpenModal} key='2' />
              </OrdersContext.Provider>
            </CartContext.Provider>
          </ProductsContext.Provider>
        </div>
      </main>
      {visabilityModal && (
        <Modal visability={visabilityModal} onClose={handleCloseModal} >
          {contentModal}
        </Modal>
      )}
    </div>
  );
}

export default App;