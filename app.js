const SUPABASE_URL = "https://gzljjxnytibmhcozwdkx.supabase.co/rest/v1/";
const SUPABASE_KEY = "sb_publishable_r7nWFSXUjtfYT_A49il7XA_5jUitOoR";

async function loadProducts() {
    const response = await fetch(
        `${SUPABASE_URL}/rest/v1/products?select=*`
    );

    if (!response.ok) {
        throw new Error("خطا در دریافت محصولات");
    }

    const products = await response.json();

    console.log("XL Studios products:", products);

    return products;
}

loadProducts().catch(error => {
    console.error(error);
});
