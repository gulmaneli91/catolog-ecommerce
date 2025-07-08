import { ProductForm } from "../../components";
import { Container } from "../../styles/Conatiner ";

  
  export default function CreateProductPage() {
  return (
    <Container>
      <h1>Criar Produto</h1>
      <ProductForm onSuccess={() => alert("Produto criado!")} />
    </Container>
  );
}