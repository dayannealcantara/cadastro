import { TextField, TextFieldProps } from '@mui/material';
import { useField } from '@unform/core';
import { useEffect, useState } from 'react';

type VTextFieldProps = TextFieldProps & {
  name:string
}

export const VTextField : React.FC<VTextFieldProps> =({name, ...rest}) =>{ 
  const {fieldName, registerField, error, clearError, defaultValue} = useField(name);

  const [value, setValue] = useState(defaultValue || '');

  useEffect(() => {
    registerField({
      name:fieldName,
      getValue:() => value,
      setValue
    });
  },[registerField, fieldName, value]);

  return(
    <TextField 
      {...rest}
      error={!!error}
      helperText={error}
      defaultValue={defaultValue}
      onKeyDown={()=> error ? clearError() : undefined}
      value={value}
      onChange={e => setValue(e.target.value)}/>
  );
};