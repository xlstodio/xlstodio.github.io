const SUPABASE_URL = "https://gzljjxnytibmhcozwdkx.supabase.co";
const SUPABASE_KEY = "sb_publishable_7HyHJv5CiaCNU0Af0adR1g_sKC53ayq";

async function loadProducts() {
    try {
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/products?select=*`,
            {
                method: "GET",
                headers: {
                    "apikey": SUPABASE_KEY,
                    "Authorization": `Bearer ${SUPABASE_KEY}`,
                    "Accept-Profile": "public",
                    "Content-Type": "application/json"
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const products = await response.json();

        console.log("XL Studios products:", products);

        let section = document.getElementById("supabase-products");

        if (!section) {
            section = document.createElement("section");
            section.id = "supabase-products";
            section.className = "section";

            section.innerHTML = `
                <div class="section-title">
                    <span>02</span>
                    <h2>محصولات منتشرشده</h2>
                </div>

                <div id="products-container"></div>
            `;

            const gamesSection = document.getElementById("games");

            if (gamesSection) {
                gamesSection.after(section);
            } else {
                document.body.appendChild(section);
            }
        }

        const container =
            document.getElementById("products-container");

        container.innerHTML = "";

        if (products.length === 0) {
            container.innerHTML =
                "<p>هنوز محصولی منتشر نشده است.</p>";
            return;
        }

        products.forEach(product => {

            const card = document.createElement("div");
            card.className = "game-card";

            const name =
                escapeHTML(product.name || "بدون نام");

            const version =
                escapeHTML(product.version || "");

            const description =
                escapeHTML(product.description || "");

            let buttons = "";

            if (product.apk_url) {
                buttons += `
                    <a
                        class="btn primary"
                        href="${product.apk_url}"
                        target="_blank"
                        rel="noopener">
                        دانلود Android
                    </a>
                `;
            }

            if (product.exe_url) {
                buttons += `
                    <a
                        class="btn secondary"
                        href="${product.exe_url}"
                        target="_blank"
                        rel="noopener">
                        دانلود Windows
                    </a>
                `;
            }

            if (product.linux_url) {
                buttons += `
                    <a
                        class="btn secondary"
                        href="${product.linux_url}"
                        target="_blank"
                        rel="noopener">
                        دانلود Linux
                    </a>
                `;
            }

            if (product.zip_url) {
                buttons += `
                    <a
                        class="btn secondary"
                        href="${product.zip_url}"
                        target="_blank"
                        rel="noopener">
                        دانلود ZIP
                    </a>
                `;
            }

            card.innerHTML = `
                <div class="game-info">

                    <div class="tag">
                        XL STUDIOS
                    </div>

                    <h3>${name}</h3>

                    <p>
                        نسخه ${version}
                    </p>

                    <p>
                        ${description}
                    </p>

                    <div class="game-buttons">
                        ${buttons}
                    </div>

                </div>
            `;

            container.appendChild(card);
        });

    } catch (error) {

        console.error(
            "XL Studios / Supabase error:",
            error
        );
    }
}

function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        loadProducts
    );
} else {
    loadProducts();
}
