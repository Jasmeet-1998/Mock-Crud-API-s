import React from 'react';
import {List, Datagrid, TextField, DeleteButton} from 'react-admin'

//Note mentioned localhost 3000 because we added a proxy in the client package.json to port 5000.
const UserList =(props)=> {
  return (
    <List {...props}>
      <Datagrid>
          <TextField source='id' />
          <TextField source='name' />
          <TextField source='email' />
          <TextField source='password' />
          <TextField source='user_type' />
          <DeleteButton basePath='/books'/>
      </Datagrid>
    </List>
  )
}

export default UserList;
