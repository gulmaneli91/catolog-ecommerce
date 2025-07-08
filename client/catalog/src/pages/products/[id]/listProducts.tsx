/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql, useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../../styles/Button";
import { formatCurrency } from "../../../helpers/helpers";

const GET_OWNER_WITH_PRODUCTS = gql`
  query GetOwnerWithProducts($id: String!) {
    getOwner(id: $id) {
      id
      name
      products {
        id
        title
        price
      }
    }
  }
`;

export default function EditOwnerProductsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_OWNER_WITH_PRODUCTS, {
    variables: { id },
    skip: !id,
    fetchPolicy: "network-only",
  });

  if (loading) return <p>Carregando produtos...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  const owner = data.getOwner;

  return (
    <div>
      {owner.products.length ? (
        <h2>Produtos do proprietário {owner.name}</h2>
      ) : (
        <h2>Este proprietário ainda não possui produtos cadastrados.</h2>
      )}
      <ul>
        {owner.products.map((product: any) => (
          <li key={product.id}>
           <h3>{product.title} - {formatCurrency(product.price)} {product.category? - product.category: ''}
            <Button style={{backgroundColor:'#0d5181', marginLeft:30}}
              onClick={() => navigate(`/products/${product.id}/edit-form`)}
            >
              Editar
            </Button>
            </h3>
          </li>
        ))}
      </ul>
    </div>
  );
}
