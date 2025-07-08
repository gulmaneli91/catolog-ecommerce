import styled from "styled-components";

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  background-color: #2563eb; /* azul padrão */
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1d4ed8;
  }

  &:disabled {
    background-color: #94a3b8;
    cursor: not-allowed;
  }
`;