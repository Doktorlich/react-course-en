export async function fetchProducts() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const response = await fetch("http://localhost:3000/meals", { method: "GET" });
    const products = await response.json();
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    return products;
}
export async function postOrder(customerData,cartData) {
    const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            order: {
                customer: {
                    email: customerData.email,
                    name: customerData.name,
                    street: customerData.street,
                    "postal-code": customerData.postalCode, // ← ключ с дефисом
                    city: customerData.city,
                },
                items: cartData, // ← обязательное поле для сервера
            },
        }),
    });
    if (!response.ok) {
        throw new Error("Failed to post order.");
    }
}
