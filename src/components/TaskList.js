import React, { useEffect, useState } from "react"
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';



const GET_TODOS = gql`
{
    todos {
        task,
        id,
        status
    }
}
`;
const DELETE_TODO = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`;
export  default function TaskList (){
  const [deleteTask] = useMutation( DELETE_TODO);

  const handleDelete = (id) => {
    console.log(JSON.stringify(id))
    deleteTask({
      variables: {
        id: id,
      },
      refetchQueries: [{ query: GET_TODOS }],
    });
  };

  const { loading, error, data } = useQuery(GET_TODOS);

if(loading){
  return<>Loading...</>
}

return(
<div>
<table border="2">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th> TASK </th>
                        <th> STATUS </th>
                    </tr>
                </thead>
                <tbody>
                    {data.todos.map(todo => {
                        console.log(todo)
                        return <tr key={todo.id}>
                            <td> {todo.id} </td>
                            <td> {todo.task} </td>
                            <td> {todo.status.toString()} </td>
                            <td onClick={() => handleDelete(todo.id)}>Delete</td>
                           
                        </tr>
                    })}
                </tbody>
            </table>
</div>
)

}