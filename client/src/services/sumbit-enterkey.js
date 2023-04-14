import { useForm } from "react-hook-form";

const { register, handleSubmit } = useForm();

const enterKeySubmit = () => {
  const keyDownHandler = event => {
    console.log('User pressed: ', event.key);

    if (event.key === 'Enter') {
      event.preventDefault();

      // 👇️ call submit function here
      handlSubmit(handleFormSubmit);
    }
  };

  document.addEventListener('keydown', keyDownHandler);

  return () => {
    document.removeEventListener('keydown', keyDownHandler);
  };
}

export default enterKeySubmit;