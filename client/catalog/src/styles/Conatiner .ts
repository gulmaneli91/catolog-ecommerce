import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  box-sizing: border-box;

  input {
    border-radius: 8px;
    padding: 0.6rem;
    display: grid;
    
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    max-width: 600px;
  }

  form-label {
    display: flex;
    flex-direction: column;
    gap:1rem

  }

  form-input {
    padding: 1.5rem;
    font-size: 1rem;
  }
`;
