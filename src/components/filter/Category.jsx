import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export const Category = ({ product }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {product.map((item, index) => (
        <Card key={index} style={{ maxWidth: 345 }}>
          <CardHeader
            title={<Typography variant="h6">{item.category.toUpperCase()}</Typography>}
            subheader={<Typography variant="body2">Card Description</Typography>}
          />
          <CardContent>
            <Typography variant="body2">
              {item.category.toUpperCase()}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">Card Footer</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default Category;
