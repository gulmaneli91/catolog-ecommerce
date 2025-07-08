import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

export const TableHead = styled.thead`
  background-color: #f3f4f6;
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: 12px;
  font-weight: bold;
  border-bottom: 2px solid #e5e7eb;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: 1px solid #e5e7eb;

  &:hover {
    background-color: #f9fafb;
  }
`;

export const TableData = styled.td`
  padding: 12px;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 4px;
`;
