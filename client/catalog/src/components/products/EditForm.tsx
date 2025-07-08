import { gql, useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../styles/Button";
import { Container } from "../../styles/Conatiner ";

const GET_PRODUCT = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      id
      title
      description
      price
      imageUrl
      stock
      isActive
      categoryId
      ownerId
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($updateProductInput: UpdateProductInput!) {
    updateProduct(updateProductInput: $updateProductInput) {
      id
      title
    }
  }
`;

export function EditProductForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    imageUrl: "",
    stock: 0,
    isActive: true,
    categoryId: "",
    ownerId: "",
  });

  const {
    data,
    loading: loadingProduct,
    error: errorLoading,
  } = useQuery(GET_PRODUCT, {
    variables: { id },
    skip: !id,
    fetchPolicy: "network-only", // garante que os dados estão atualizados
  });

  const [updateProduct, { loading: updating, error: errorUpdating }] =
    useMutation(UPDATE_PRODUCT);

  useEffect(() => {
    if (data?.product) {
      setForm({
        title: data.product.title,
        description: data.product.description,
        price: data.product.price,
        imageUrl: data.product.imageUrl,
        stock: data.product.stock,
        isActive: data.product.isActive,
        categoryId: data.product.categoryId,
        ownerId: data.product.ownerId,
      });
    }
  }, [data]);

  if (loadingProduct) return <p>Carregando produto...</p>;
  if (errorLoading)
    return <p>Erro ao carregar produto: {errorLoading.message}</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submetendo com dados:", form);
    try {
      await updateProduct({
        variables: {
          id,
          updateProductInput: { ...form, id },
        },
      });
      alert("Produto atualizado com sucesso!");
      navigate("/"); // ou "/products" ou onde fizer sentido no seu app
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <label>
          Título*
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            disabled={updating}
          />
        </label>

        <label>
          Descrição
          <input
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            disabled={updating}
          />
        </label>

        <label>
          Preço*
          <input
            required
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: +e.target.value })}
            disabled={updating}
            min={0}
            step="0.01"
          />
        </label>

        <label>
          Estoque*
          <input
            required
            type="number"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: +e.target.value })}
            disabled={updating}
            min={0}
          />
        </label>

        <label>
          URL da Imagem
          <input
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            disabled={updating}
          />
        </label>

        <label>
          Categoria ID
          <input
            required
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            disabled={updating}
          />
        </label>

        <label>
          Proprietário ID*
          <input
            required
            value={form.ownerId}
            onChange={(e) => setForm({ ...form, ownerId: e.target.value })}
            disabled={updating}
          />
        </label>

        <label>
          Ativo
          <input
            style={{ display: "flex" }}
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
            disabled={updating}
          />
        </label>

        <Button type="submit" disabled={updating}>
          {updating ? "Atualizando..." : "Atualizar Produto"}
        </Button>

        {errorUpdating && (
          <p style={{ color: "red" }}>Erro: {errorUpdating.message}</p>
        )}
      </form>
    </Container>
  );
}
