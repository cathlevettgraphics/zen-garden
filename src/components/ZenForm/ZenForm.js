import React, { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './ZenForm.module.css';

import { GardenContext } from './../../contexts/ZenGardenContexts';

const schema = yup.object().shape({
  name: yup.string().required(),
  tree: yup.string().required(),
  leaves: yup.string().required(),
  minTemp: yup.number().integer().required(),
  imageUrl: yup.string().url(),
});

function ZenForm() {
  let { id: _id } = useParams();
  let history = useHistory();
  const { addTree, updateTree, garden } = useContext(GardenContext);

  let defaultValues = {
    name: '',
    tree: '',
    leaves: '',
    minTemp: '',
    imageUrl: '',
  };

  let submitHandler = () => {};

  if (_id) {
    // Alias the id from the data to avoid collision with useParams()
    const treeToBeUpdated = garden.find(({ _id: ID }) => ID === _id);
    submitHandler = (vals) => {
      console.log('update values', vals);
      updateTree(_id, vals);
      history.push('/');
    };
    if (treeToBeUpdated) {
      defaultValues = treeToBeUpdated;
    } else {
      throw new Error(`Couldn't find the tree with id ${_id}`);
    }
  } else {
    submitHandler = (vals) => {
      console.log('add value', vals);
      reset(defaultValues);
      addTree(vals);
      history.push('/');
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
    <form onSubmit={handleSubmit(submitHandler)} className={styles.zenForm}>
      {/* name */}
      <div className={styles.formRow}>
        <label htmlFor="name" className={styles.fieldName}>
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          ref={register}
          aria-invalid={errors.name ? 'true' : 'false'}
          className={styles.inputField}
        />
        {errors.name && (
          <label htmlFor="name" role="alert" className="error">
            {errors.name?.message}
          </label>
        )}
      </div>

      {/* tree */}
      <div className={styles.formRow}>
        <label htmlFor="tree" className={styles.fieldName}>
          Latin name
        </label>
        <input
          id="tree"
          type="text"
          name="tree"
          ref={register}
          aria-invalid={errors.tree ? 'true' : 'false'}
          className={styles.inputField}
        />
        {errors.tree && (
          <label htmlFor="tree" role="alert" className="error">
            {errors.tree?.message}
          </label>
        )}
      </div>

      {/* Leaves */}
      <div className={styles.formRow}>
        <label htmlFor="leaves" className={styles.fieldName}>
          Leaves
        </label>
        <input
          id="leaves"
          type="text"
          name="leaves"
          ref={register}
          aria-invalid={errors.leaves ? 'true' : 'false'}
          className={styles.inputField}
        />
        {errors.leaves && (
          <label htmlFor="leaves" role="alert" className="error">
            {errors.leaves?.message}
          </label>
        )}
      </div>

      {/* Min temp */}
      <div className={styles.formRow}>
        <label htmlFor="minTemp" className={styles.fieldName}>
          Minimum temperature
        </label>
        <input
          id="minTemp"
          type="text"
          name="minTemp"
          ref={register}
          aria-invalid={errors.minTemp ? 'true' : 'false'}
          className={styles.inputField}
        />
        {errors.minTemp && (
          <label htmlFor="minTemp" role="alert" className="error">
            {errors.minTemp?.message}
          </label>
        )}
      </div>

      {/* Image url */}
      <div className={styles.formRow}>
        <label htmlFor="imageUrl" className={styles.fieldName}>
          Image url
        </label>
        <input
          id="imageUrl"
          type="text"
          name="imageUrl"
          ref={register}
          aria-invalid={errors.imageUrl ? 'true' : 'false'}
          className={styles.inputField}
        />
        {errors.imageUrl && (
          <label htmlFor="imageUrl" role="alert" className="error">
            {errors.imageUrl?.message}
          </label>
        )}
      </div>

      {/* form row controls */}
      <div className={styles.formRowControls}>
        <button type="reset" onClick={reset} className={styles.resetForm}>
          Reset
        </button>
        <button
          type="submit"
          disabled={isSubmitting || !(isValid && isDirty)}
          className={styles.submitForm}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ZenForm;
