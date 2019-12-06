import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ title, fields, align }) => {
  console.log(align);
  return (
    <div>
      <span>{ title }</span>
      <ul>
        {fields.map((field) => (
          <li key={field}>
            <button type="button">{field}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

Filter.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  align: PropTypes.string,
};

Filter.defaultProps = {
  align: 'left',
};


export default Filter;
