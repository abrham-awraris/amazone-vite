
import React from 'react';
import { categoryInfos} from './catagoryFullInfos'
import CategoryCard from './CategoryCard'
import classes from './catagory.module.css'

function Category() {
  return (
    <section className={classes.Category__container}>
      {categoryInfos.map((infos, index) => (
        <CategoryCard key={infos.title || index} data={infos} />
      ))}
    </section>
  );
}
export default Category