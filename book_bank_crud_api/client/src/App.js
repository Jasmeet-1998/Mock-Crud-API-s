import React from 'react';
import {Admin ,Resource} from 'react-admin';
import restProvider from "ra-data-simple-rest";
import BookList from './components/BookList';
import BookAdd from './components/BookAdd';
import BookEdit from './components/BookEdit';
import UserList from './components/UserList';


//Note mentioned localhost 3000 because we added a proxy in the client package.json to port 5000.
function App() {
  return (
    <Admin dataProvider={restProvider('http://localhost:3000')}>
     <Resource name='books' list={BookList} create={BookAdd} edit={BookEdit} />
     <Resource name='users' list={UserList} />
    </Admin>

  )
}

export default App;
