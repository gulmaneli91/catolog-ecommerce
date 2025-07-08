/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../styles/Button";

const GET_CATEGORIES_BY_OWNER = gql`
  query GetCategoriesByOwner($ownerId: String!) {
    owners {
      id
      categories {
        id
        title
      }
    }
  }
`;

export default function EditOwnerCategoriesPage() {
  const { ownerId } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_CATEGORIES_BY_OWNER, {
    variables: { ownerId },
  });

  if (loading) return <p>Carregando categorias...</p>;
  if (error) return <p>Erro ao buscar categorias: {error.message}</p>;

  const owner = data.owners.find((o: any) => o.id === ownerId);

  if (!owner) return <p>Proprietário não encontrado</p>;

  return (
    <div>
      <h2>Categorias de {ownerId}</h2>
      <ul>
        {owner.categories.map((category: any) => (
          <li key={category.id}>
            {category.title}{" "}
            <Button onClick={() => navigate(`/categories/${category.id}/edit-form`)}>
              Editar
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
