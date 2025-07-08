import { CategoryForm } from "../../components/categories/CategoryForm";
import { Container } from "../../styles/Conatiner ";

export default function CreateCategoryPage() {
  return (
    <Container>
      <h1>Criar Categoria</h1>
      <CategoryForm onSuccess={() => alert("Categoria criada com sucesso!")} />
    </Container>
  );
}