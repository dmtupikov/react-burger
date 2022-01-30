import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';


function App() {

  const [ state, setState ] = React.useState({
    isLoading: false,
    hasError: false,
    products: []
  });

  const [ modal, setModal ] = React.useState({
    visability: false,
    content: null
  })

  const handleOpenModal = (content) => {
    setModal({ visability:true, content:content })
  }

  const handleCloseModal = () => {
    setModal({ ...modal, visability:false })
  }

  const url = 'https://norma.nomoreparties.space/api/ingredients';

  React.useEffect(() => {
    const getProducts = async () => {
      fetch(url)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(res.status);
        })
        .then(data => setState({...state, products:data.data, isLoading: false }))
        .catch(e => {
          setState({ ...state, hasError: true, isLoading: false });
        });
    };
    getProducts();
  }, []);

  const dataProducts = state.products;
  const visabilityModal = modal.visability;
  const contentModal = modal.content;

  return (
    <div>
      <AppHeader />
      <main>
        <div className={styles.conteiner}>  
          <BurgerIngredients products={dataProducts} handleOpenModal={handleOpenModal} key='1' />
          <BurgerConstructor products={dataProducts} handleOpenModal={handleOpenModal} key='2' /> 
        </div>
      </main>
      <Modal visability={visabilityModal} onClose={handleCloseModal} >
        {contentModal}
      </Modal>
    </div>
  );
}

export default App;