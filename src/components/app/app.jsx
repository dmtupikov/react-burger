import React, { useReducer } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import { ProductsContext } from '../../services/productsContext.jsx';
import { CartContext } from '../../services/cartContext.jsx';
import { OrdersContext } from '../../services/ordersContext.jsx';



function App() {

  const [ state, setState ] = React.useState({
    isLoading: false,
    hasError: false,
    products: []
  });

  const [ modal, setModal ] = React.useState({
    visability: false,
    content: null
  });

  const [ cartState, setCart ] = React.useState({
    isLoading: false,
    ingredients: [],
    bun: null
  });

  const [ ordersState, setOrders ] = React.useState({orders:[]});

  const url = 'https://norma.nomoreparties.space/api/ingredients';

  const totalInitialState = { total:0 };

  function reducer(totalState, action) {
    switch (action.type) {
      case "change":
        return { total: action.total };
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  } 

  const [totalState, totalDispatcher] = useReducer(reducer, totalInitialState, undefined);

  const handleOpenModal = (content) => {
    setModal({ visability:true, content:content })
  }

  const handleCloseModal = () => {
    setModal({ ...modal, visability:false })
  }

  const createBurgerArray = (product) => {
    if (product.type == 'bun') {
      if (cartState.bun != product._id) {
        cartState.bun = product._id;
      }
    } else {
      if (cartState.ingredients.find(item => item === product._id) === undefined) {
        cartState.ingredients.push(product._id);
      }
    } 
  };

  React.useEffect(() => {
    const getProducts = async () => {
      fetch(url)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(res.status);
        })
        .then(data => {
          setState({...state, products:data.data, isLoading:false });
          setCart({...cartState, isLoading:!cartState.isLoading});
        })
        .catch(e => {
          setState({ ...state, hasError: true, isLoading:false });
        });
    };
    getProducts();
  }, []);

  React.useEffect(() => {
    if (cartState.isLoading) {
      if (state.products.length > 0) {
        state.products.map((product, index) => createBurgerArray(product)); 
        if ((cartState.ingredients.length > 0) || (cartState.bun !== null)) {
          let total = 0;
          if (cartState.ingredients.length > 0) cartState.ingredients.map((item, index) => total += state.products.find(product => item === product._id).price);
          if (cartState.bun != null) {
            total += 2 * state.products.find(product => product._id === cartState.bun).price;
          }
          totalDispatcher({type:'change', total:total});
          setCart({...cartState, isLoading:!cartState.isLoading});
        } 
      }
    }
  }, [cartState.isLoading]);

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
              <OrdersContext.Provider value={{ ordersState, setOrders }}>
                <BurgerConstructor handleOpenModal={handleOpenModal} key='2' />
              </OrdersContext.Provider>
            </CartContext.Provider>
          </ProductsContext.Provider>
        </div>
      </main>
      <Modal visability={visabilityModal} onClose={handleCloseModal} >
        {contentModal}
      </Modal>
    </div>
  );
}

export default App;