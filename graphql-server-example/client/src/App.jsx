
import './App.css'
import { gql, useQuery } from '@apollo/client'


const query = gql`
query ExampleQuery {
  getTodos {
    userId
    id
    title
    completed
    user {
      email
    }
  }
}

  `


function App() {
  const {loading, error, data} = useQuery(query)
  console.log(data)

  if(loading){
    return <p>Loading....</p>
  }

  if(error){
    return <p>Error: {error.message}</p>
  }



  return (
    <table>
      <tbody>
        {
          data?.getTodos?.map((todo)=>(
            <tr key={todo.loading}>
              <td>{todo.title}</td>
              <td>{todo?.user?.name}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default App
