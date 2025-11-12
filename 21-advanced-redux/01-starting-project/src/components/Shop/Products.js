import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
    {
        id: "p1",
        price: 6,
        title: "Test 1",
        description: "This is a first product - amazing!",
    },
    {
        id: "p2",
        price: 12,
        title: "Test 2",
        description: "This is a first product - amazing!",
    },
    {
        id: "p3",
        price: 18,
        title: "Test 3",
        description: "This is a first product - amazing!",
    },
];

const Products = props => {
    return (
        <section className={classes.products}>
            <h2>Buy your favorite products</h2>
            <ul>
                {DUMMY_PRODUCTS.map(item => {
                    return (
                        <ProductItem
                            key={item.id}
                            id = {item.id}
                            title={item.title}
                            price={item.price}
                            description={item.description}
                        />
                    );
                })}
            </ul>
        </section>
    );
};

export default Products;
