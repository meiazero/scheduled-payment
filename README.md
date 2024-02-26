# scheduled-payment

## Descrição
A empresa X é especializada em soluções digitais de pagamento. Sabendo disso, o desafio
consiste em implementar um serviço de pagamento agendando.

## Regras de negócios

- [ ] Quando um agendamento é enviado deve ser registrado como pending e retornado o id;
- [ ] O usuário deve conseguir consultar o status do agendamento `pending | paid`;
- [ ] Se o pagamento ainda não foi realizado o usuário poderá:
    - [ ] Excluir o agendamento;
    - [ ] Atualizar a data/hora do agendamento ou status;

### Estrutura do agendamento:

```json
{
  "id": "27a61386-ae2e-40d2-b4f9-d7c58d9fc6e7",
  "amount": 1000,
  "payment_date": "2021-10-10T10:00:00",
  "status": "pending",
  "created_at": "2024-02-26T00:51:36.401Z",
  "updated_at": "2024-02-26T00:51:36.401Z"
}
```

o `id` deve ser um UUID v4, o `amount` é o valor do pagamento, em  centavos, o `payment_date` é a data e hora do agendamento e o `status` pode ser `pending` ou `paid`, por padrão o status é `pending`.

### Rotas e Responses
> a documentação pode ser acessada em `http://localhost:3333/docs`


 `/payment/schedule` - POST
```json
{
  "amount": 1000,
  "payment_date": "2021-10-10T10:00:00"
}
```

```json
{
  "id": "27a61386-ae2e-40d2-b4f9-d7c58d9fc6e7"
}
```

`/payment/schedule/:id` - GET
```json
{
  "id": "27a61386-ae2e-40d2-b4f9-d7c58d9fc6e7",
  "amount": 1000,
  "payment_date": "2021-10-10T10:00:00",
  "status": "pending",
  "created_at": "2024-02-26T00:51:36.401Z",
  "updated_at": "2024-02-26T00:51:36.401Z"
}
```

`/payment/schedule/:id` - DELETE
```json
{
  "message": "Agendamento excluído com sucesso",
  "id": "27a61386-ae2e-40d2-b4f9-d7c58d9fc6e7"
}
```

`/payment/schedule/:id` - PATCH
```json
{
  "payment_date": "2021-10-10T10:00:00"
}
```

```json
{
  "message": "Agendamento atualizado com sucesso",
  "id": "27a61386-ae2e-40d2-b4f9-d7c58d9fc6e7"
}
```
