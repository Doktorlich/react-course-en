import classes from "./meals-grid.module.css";
import MealItem from "@/compinents/meals/meal-item";

export default function MealsGrid({ meals }) {
    return (
        <ul className={classes.meals}>
            {meals.map(meal => {
                return (
                    <li key={meal.id}>
                        <MealItem {...meal} />
                    </li>
                );
            })}
        </ul>
    );
}
