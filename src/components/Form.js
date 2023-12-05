import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

const url = "https://userlist-8eev.onrender.com/";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const usuario = ref.current;

      usuario.user.value = onEdit.user;
      usuario.email.value = onEdit.email;
      usuario.password.value = onEdit.password;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuario = ref.current;

    if (
      !usuario.user.value ||
      !usuario.email.value ||
      !usuario.password.value
    ) {
      return toast.warn("Rellena todos los campos");
    }

    if (onEdit) {
      await axios
        .put(`${url}` + onEdit.id, {
          user: usuario.user.value,
          email: usuario.email.value,
          password: usuario.password.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post(`${url}`, {
          user: usuario.user.value,
          email: usuario.email.value,
          password: usuario.password.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    usuario.user.value = "";
    usuario.email.value = "";
    usuario.password.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>user</Label>
        <Input name="user" />
      </InputArea>
      <InputArea>
        <Label>email</Label>
        <Input name="email" type="email" />
      </InputArea>
      <InputArea>
        <Label>password</Label>
        <Input name="password" type="password" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
