import React from 'react';

export default function Item({ itemData }) {
  return (
    <div className="col-4 text-center p-3">
      <div className="bg-dark text-light rounded d-flex flex-column p-2">
        <span>{itemData.title}</span>
        <span>{itemData.overview}</span>
        <span>{itemData.poster_path}</span>
        <span>{itemData.popularity}</span>
        <span>
          {itemData.tags.map((tag, i) => {
            return (
              <span
                className="badge bg-light text-dark mx-2"
                key={itemData._id + 'tag' + i}
              >
                {tag}
              </span>
            );
          })}
        </span>
      </div>
    </div>
  );
}
