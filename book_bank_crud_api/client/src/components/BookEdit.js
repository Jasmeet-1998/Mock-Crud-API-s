import React from 'react';
import {Edit ,SimpleForm ,TextInput} from 'react-admin'

//Note mentioned localhost 3000 because we added a proxy in the client package.json to port 5000.
const BookEdit =(props)=> {
  return (
    <Edit title='Edit Book' {...props}>
        <SimpleForm>
            <TextInput disabled source='id' />
            <TextInput disabled source='title' />
            <TextInput disabled source='author' />
            <TextInput disabled source='yop' />
            <TextInput source='copies_count' />
        </SimpleForm>
    </Edit>
  )
}

export default BookEdit;
