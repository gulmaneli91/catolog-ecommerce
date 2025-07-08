import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Layout from "./components/layout/Layout";

import Home from "./pages/Home";
import CreateProductPage from "./pages/products/create";
import EditProductPage from "./pages/products/[id]/listProducts";
import CreateCategoryPage from "./pages/categories/create";
import EditCategoryPage from "./pages/categories/[id]/edit";
import { EditProductForm } from "./components/products/EditForm";

const AppWrapper = styled.div`
  font-family: 'Segoe UI', sans-serif;
`;

export default function App() {
  return (
    <AppWrapper>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/create" element={<CreateProductPage />} />
            <Route path="/products/:id" element={<EditProductPage />} />
            <Route path="/products/:id/edit-form" element={<EditProductForm />} />
            <Route path="/categories/create" element={<CreateCategoryPage />} />
            <Route path="/categories/:id/edit" element={<EditCategoryPage />} />
          </Routes>
        </Layout>
      </Router>
    </AppWrapper>
  );
}
