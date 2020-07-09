# Curso (GraphQL)[https://graphql.org/]

Curso GraphQL - Platzi

GraphQL es un lenguaje de consulta para API y un tiempo de ejecución para completar esas consultas con sus datos existentes. GraphQL proporciona una descripción completa y comprensible de los datos en su API, brinda a los clientes el poder de pedir exactamente lo que necesitan y nada más, facilita la evolución de las API con el tiempo y permite poderosas herramientas para desarrolladores.

**Base de una API en GraphQL**

Base de una API en GraphQL ess el esquema, el esquema es un documento de informacion que describe detalladamente todos los tipos de informacion que va tener el API, cada uno especificando que tipo de campo es.

```
const { graphql, buildSchema } = require("graphql");

//definiendo el esquema
const schema = buildSchema(`
type Query{
  hello: String
}
`);

//Ejecutar el query hello
graphql(
  schema,
  `
    {
      hello
    }
  `
).then((data) => console.log(data));
```
