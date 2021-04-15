import React from 'react';
import {List, Datagrid, TextField, EditButton, DeleteButton} from 'react-admin'

//Note mentioned localhost 3000 because we added a proxy in the client package.json to port 5000.
const PostList =(props)=> {
  return (
    <List {...props}>
      <Datagrid>
          <TextField source='id' />
          <TextField source='title' />
          <TextField source='author' />
          <TextField source='yop' />
          <TextField source='copies_count' />
          <EditButton basePath='/books'/>
          <DeleteButton basePath='/books'/>
      </Datagrid>
    </List>
  )
}

export default PostList;
