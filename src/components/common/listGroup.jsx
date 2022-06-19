import React from 'react';

const ListGroup = ({ items, selectedItem, onItemSelect, textProperty, valueProperty }) => {
    return (
        <ul className="list-group">
            {items.map(item => (
                <li 
                    className={(item === selectedItem) ? "list-group-item clickable active" : "list-group-item clickable"} 
                    key={item[valueProperty]}
                    onClick={() => onItemSelect(item)}
                >
                    {item[textProperty]}
                </li>
            ))}
        </ul>
    );
}

ListGroup.defaultProps = {
    textProperty: "name",
    valueProperty: "_id"
};

export default ListGroup;