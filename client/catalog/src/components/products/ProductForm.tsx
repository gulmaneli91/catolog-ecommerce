import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Button } from "../../styles/Button";

const CREATE_PRODUCT = gql`
  mutation CreateProduct($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      id
      title
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: String!, $updateProductInput: UpdateProductInput!) {
    updateProduct(id: $id, updateProductInput: $updateProductInput) {
      id
      title
    }
  }
`;

const GET_PRODUCT = gql`
  query Product($id: String!) {
    product(id: $id) {
      id
      title
      description
      price
      stock
      isActive
      imageUrl
      categoryId
      ownerId
    }
  }
`;

interface ProductFormProps {
  productId?: string;
  onSuccess?: () => void;
}

export function ProductForm({ productId, onSuccess }: ProductFormProps) {
  const isEditing = !!productId;

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    stock: 0,
    isActive: true,
    imageUrl: "",
    categoryId: "",
    ownerId: "",
  });

  const { data } = useQuery(GET_PRODUCT, {
    skip: !isEditing,
    variables: { id: productId },
  });

  useEffect(() => {
    if (data?.product) {
      setForm(data.product);
    }
  }, [data]);

  const [createProduct, { loading: creating, error: createError }] = useMutation(CREATE_PRODUCT);
  const [updateProduct, { loading: updating, error: updateError }] = useMutation(UPDATE_PRODUCT);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const mutation = isEditing
      ? updateProduct({ variables: { id: productId, updateProductInput: form } })
      : createProduct({ variables: { createProductInput: form } });

    mutation
      .then(() => onSuccess?.())
      .catch(console.error);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label className="form-label">
        Título*
        <input
          className="form-input"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </label>

      <label className="form-label">
        Descrição
        <input
          className="form-input"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </label>

      <label className="form-label">
        Preço*
        <input
          className="form-input"
          type="number"
          required
          value={form.price === 0 ? "" : form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value === "" ? 0 : Number(e.target.value) })
          }
        />
      </label>

      <label className="form-label">
        Estoque*
        <input
          className="form-input"
          type="number"
          required
          value={form.stock === 0 ? "" : form.stock}
          onChange={(e) =>
            setForm({ ...form, stock: e.target.value === "" ? 0 : Number(e.target.value) })
          }
        />
      </label>

      <label className="form-label">
        URL da Imagem
        <input
          className="form-input"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        />
      </label>

      <label className="form-label">
        Categoria ID*
        <input
          className="form-input"
          value={form.categoryId}
          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
        />
      </label>

      <label className="form-label">
        Proprietário ID*
        <input
          className="form-input"
          required
          value={form.ownerId}
          onChange={(e) => setForm({ ...form, ownerId: e.target.value })}
        />
      </label>

      <label className="form-label">
        Ativo
        <input style={{display: "flex"}}
          type="checkbox"
          checked={form.isActive}
          onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
        />
      </label>

      <Button type="submit" disabled={creating || updating}>
        {creating || updating ? "Salvando..." : isEditing ? "Atualizar" : "Criar Produto"}
      </Button>

      {(createError || updateError) && (
        <p className="form-error">Erro: {(createError || updateError)?.message}</p>
      )}
    </form>
  );
}
