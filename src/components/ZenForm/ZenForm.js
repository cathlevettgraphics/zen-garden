import React, { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';

import { GardenContext } from './../../contexts/ZenGardenContexts';

const schema = yup.object().shape({
  name: yup.string().required(),
  treeName: yup.string().required(),
  leaves: yup.string().required(),
  minTemp: yup.number().integer().required(),
  imageUrl: yup.string().url(),
});

function ZenForm() {
  let { id } = useParams();
  let { history } = useHistory();
  const { addTree, updateTree, garden } = useContext(GardenContext);
  const treeToBeUpdated = garden.find(({ id }) => id === id);

  let defaultValues = {
    name: '',
    treeName: '',
    leaves: '',
    minTemp: '',
    imageUrl: '',
  };

  let submitHandler = () => {};

  if (id) {
    submitHandler = (vals) => {
      console.log('update values', vals);
      updateTree(id, vals);
      history.push('/');
    };
    if (treeToBeUpdated) {
      defaultValues = treeToBeUpdated;
    } else {
      throw new Error(`Couldn't find the tree with id ${id}`);
    }
  } else {
    submitHandler = (vals) => {
      console.log('add value', vals);
      reset(defaultValues);
      addTree(vals);
    };
  }

  const { register, handleSubmit, errors, reset, formState } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: defaultValues,
  });

  const { isDirty, isValid, isSubmitting } = formState;

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      {/* Tree Name */}
      <div className="form-row">
        <label htmlFor="treeName" className="fieldName">
          Name
        </label>
        <input
          id="treeName"
          type="text"
          name="treeName"
          ref={register}
          aria-invalid={errors.treeName ? 'true' : 'false'}
        />
        {errors.treeName && (
          <label htmlFor="treeName" role="alert" className="error">
            {errors.treeName?.message}
          </label>
        )}
      </div>

      {/* Name */}
      <div className="form-row">
        <label htmlFor="tree" className="fieldName">
          Latin name
        </label>
        <input
          id="tree"
          type="text"
          name="tree"
          ref={register}
          aria-invalid={errors.tree ? 'true' : 'false'}
        />
        {errors.tree && (
          <label htmlFor="tree" role="alert" className="error">
            {errors.tree?.message}
          </label>
        )}
      </div>

      {/* Leaves */}
      <div className="form-row">
        <label htmlFor="leaves" className="fieldName">
          Leaves
        </label>
        <input
          id="leaves"
          type="text"
          name="leaves"
          ref={register}
          aria-invalid={errors.leaves ? 'true' : 'false'}
        />
        {errors.leaves && (
          <label htmlFor="leaves" role="alert" className="error">
            {errors.leaves?.message}
          </label>
        )}
      </div>

      {/* Min temp */}
      <div className="form-row">
        <label htmlFor="minTemp" className="fieldName">
          Minimum temperature
        </label>
        <input
          id="minTemp"
          type="text"
          name="minTemp"
          ref={register}
          aria-invalid={errors.minTemp ? 'true' : 'false'}
        />
        {errors.minTemp && (
          <label htmlFor="minTemp" role="alert" className="error">
            {errors.minTemp?.message}
          </label>
        )}
      </div>

      {/* Image url */}
      <div className="form-row">
        <label htmlFor="imageUrl" className="fieldName">
          Image url
        </label>
        <input
          id="imageUrl"
          type="text"
          name="imageUrl"
          ref={register}
          aria-invalid={errors.imageUrl ? 'true' : 'false'}
        />
        {errors.imageUrl && (
          <label htmlFor="imageUrl" role="alert" className="error">
            {errors.imageUrl?.message}
          </label>
        )}
      </div>

      {/* form row controls */}
      <div className="form-row-controls">
        <button type="reset" onClick={reset}>
          Reset
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default ZenForm;
