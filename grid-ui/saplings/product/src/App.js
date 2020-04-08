/**
 * Copyright 2018-2020 Cargill Incorporated
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCaretUp,
  faCaretDown,
  faCheck,
  faPenSquare,
  faChevronLeft,
  faPlus,
  faTimes,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';

import { ServiceProvider } from './state/service-context';
import FilterBar from './components/FilterBar';
import ProductsTable from './components/ProductsTable';
import ProductInfo from './components/ProductInfo';
import { AddProductForm } from './components/AddProductForm';
import './App.scss';

library.add(
  faCaretUp,
  faCaretDown,
  faCheck,
  faPenSquare,
  faChevronLeft,
  faPlus,
  faTimes,
  faSpinner
);

function App() {
  const [activeForm, setActiveForm] = useState(null);

  function addProduct() {
    setActiveForm('add-product');
  }

  function openForm(formName) {
    switch (formName) {
      case 'add-product':
        return <AddProductForm closeFn={() => setActiveForm(null)} />;
      default:
    }
    return null;
  }

  return (
    <ServiceProvider>
      <div id="product-sapling" className="product-app">
        <FilterBar />
        <Router>
          <Switch>
            <Route exact path="/product">
              <ProductsTable actions={{ addProduct }} />
            </Route>
            <Route path="/product/products/:id">
              <ProductInfo />
            </Route>
          </Switch>
        </Router>
        {activeForm && openForm(activeForm)}
      </div>
    </ServiceProvider>
  );
}

export default App;
