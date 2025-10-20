export async function fetchProducts() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const response = await fetch("http://localhost:3000/meals", { method: "GET" });

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    return await response.json();
}

export async function postOrder(customerData, cartData) {
    const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            order: {
                customer: {
                    email: customerData.email,
                    name: customerData.name,
                    street: customerData.street,
                    "postal-code": customerData.postalCode,
                    city: customerData.city,
                },
                items: cartData,
            },
        }),
    });
    if (!response.ok) {
        throw new Error("Failed to post order.");
    }
}
