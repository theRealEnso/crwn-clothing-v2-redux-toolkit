import { FormInputLabel, Input, Group } from './form-input.styles';

import {FC, InputHTMLAttributes} from 'react';

type FormInputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        // add additional three checks to fix type error. First, ensure that otherProps.value.length is wrapped inside Boolean, because it essentially returns a boolean. Next, add check to see if otherProps.value is truthy, because typescript says this can return undefined (in the event that no props are passed through). Finally, form inputs can accept both strings AND numbers, and TS says the 'length' property does not exist on numbers, so we add 3rd check to see if the data type of otherProps is of string data type.  => 
        
        <FormInputLabel shrink={Boolean(otherProps.value && typeof otherProps.value === 'string' && otherProps.value.length)}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
