import React from 'react';
import { useParams } from "react-router-dom";

export default function CategoryPage() {
    const { name } = useParams();
    const realName = name.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return (
        <div>
            <h1>param: {name}</h1>
            <h1>Exact Category Name: {realName}</h1>

            {/* filter products by `realName` i.e category and render below */}
        </div>
    );
}