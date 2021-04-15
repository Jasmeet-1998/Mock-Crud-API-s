import React from 'react';
import {Create ,SimpleForm ,TextInput} from 'react-admin'

//Note mentioned localhost 3000 because we added a proxy in the client package.json to port 5000.
const BookAdd =(props)=> {
  return (
    <Create title='Add a New Book' {...props}>
        <SimpleForm>
            <TextInput source='title' />
            <TextInput source='author' />
            <TextInput source='yop' />
            <TextInput source='copies_count' />
        </SimpleForm>
    </Create>
  )
}

export default BookAdd;
