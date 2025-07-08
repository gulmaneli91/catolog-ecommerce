/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableData,
  ActionButton,
} from "../styles/TableStyles";

const GET_OWNERS = gql`
  query GetOwners {
    owners {
      id
      name
      email
    }
  }
`;

export default function ListOwnersPage() {
  const { data, loading, error } = useQuery(GET_OWNERS);
  const navigate = useNavigate();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar usuários: {error.message}</p>;

  return (
    <div>
      <h2>Usuários</h2>
      <Table>
        <TableHead>
          <tr>
            <TableHeader>Nome</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Ações</TableHeader>
          </tr>
        </TableHead>
        <TableBody>
          {data.owners.map((owner: any) => (
            <TableRow key={owner.id}>
              <TableData>{owner.name}</TableData>
              <TableData>{owner.email}</TableData>
              <TableData>
                <ActionButton onClick={() => navigate(`/products/${owner.id}`)}>
                  ⋮
                </ActionButton>
              </TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
