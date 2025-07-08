import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { Button } from "../../styles/Button";

const CREATE_CATEGORY = gql`
  mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {
    createCategory(createCategoryInput: $createCategoryInput) {
      id
      title
    }
  }
`;

interface CategoryFormProps {
  onSuccess?: () => void;
}

export function CategoryForm({ onSuccess }: CategoryFormProps) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    email: "",
  });

  const [createCategory, { loading, error }] = useMutation(CREATE_CATEGORY);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createCategory({ variables: { createCategoryInput: form } })
      .then(() => onSuccess?.())
      .catch(console.error);
  };

  return (
    <form onSubmit={handleSubmit} className="category-form">
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
        E-mail do proprietário*
        <input 
          className="form-input"
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </label>

      <Button type="submit" disabled={loading}>
        {loading ? "Salvando..." : "Salvar Categoria"}
      </Button>

      {error && <p className="error-message">Erro: {error.message}</p>}
    </form>
  );
}
