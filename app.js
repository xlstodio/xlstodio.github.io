const SUPABASE_URL = "https://gzljjxnytibmhcozwdkx.supabase.co";
const SUPABASE_KEY = "sb_publishable_r7nWFSXUjtfYT_A49il7XA_5jUitOoR";

async function loadProducts() {
    try {
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/products?select=*`,
            {
                headers: {
                    apikey: SUPABASE_KEY,
                    Authorization: `Bearer ${SUPABASE_KEY}`
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const products = await response.json();

        console.log("XL Studios products:", products);

        let container = document.getElementById("products-container");

        if (!container) {
            container = document.createElement("div");
            container.id = "products-container";
            document.body.appendChild(container);
        }

        container.innerHTML = "";

        if (products.length === 0) {
            container.innerHTML = "<p>هنوز محصولی منتشر نشده است.</p>";
            return;
        }

        products.forEach(product => {
            const card = document.createElement("div");

            card.className = "game-card";

            card.innerHTML = `
                <div class="game-info">

                    <h2>${escapeHTML(product.name || "")}</h2>

                    <p>
                        نسخه:
                        ${escapeHTML(product.version || "")}
                    </p>

                    <p>
                        ${escapeHTML(product.description || "")}
                    </p>

                    <div class="game-buttons">

                        ${
                            product.apk_url
                            ? `<a class="btn primary"
                                  href="${product.apk_url}">
                                  دانلود Android
                               </a>`
                            : ""
                        }

                        ${
                            product.exe_url
                            ? `<a class="btn secondary"
                                  href="${product.exe_url}">
                                  دانلود Windows
                               </a>`
                            : ""
                        }

                        ${
                            product.linux_url
                            ? `<a class="btn secondary"
                                  href="${product.linux_url}">
                                  دانلود Linux
                               </a>`
                            : ""
                        }

                        ${
                            product.zip_url
                            ? `<a class="btn secondary"
                                  href="${product.zip_url}">
                                  دانلود ZIP
                               </a>`
                            : ""
                        }

                    </div>

                </div>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Supabase error:", error);

        const container =
            document.getElementById("products-container");

        if (container) {
            container.innerHTML =
                "<p>خطا در اتصال به سرور.</p>";
        }
    }
}

function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

loadProducts();
