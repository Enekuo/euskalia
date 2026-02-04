// api/create-checkout.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const apiKey = process.env.LEMON_API_KEY;
    const storeId = process.env.LEMON_STORE_ID;
    const variantId = process.env.LEMON_VARIANT_ID;

    if (!apiKey || !storeId || !variantId) {
      return res.status(500).json({
        error: "Missing env vars",
        missing: {
          LEMON_API_KEY: !apiKey,
          LEMON_STORE_ID: !storeId,
          LEMON_VARIANT_ID: !variantId,
        },
      });
    }

    const { email } = (req.body && typeof req.body === "object") ? req.body : {};

    const payload = {
      data: {
        type: "checkouts",
        attributes: {
          test_mode: true,
          product_options: {
            // ✅ redirect tras pago OK
            redirect_url: "https://euskaliaweb.com/pago-correcto",
            // ✅ opcional: para que solo se vea esta variante
            enabled_variants: [Number(variantId)],
          },
          // ✅ opcional: prefill email si lo envías desde el front
          ...(email ? { checkout_data: { email } } : {}),
        },
        relationships: {
          store: {
            data: { type: "stores", id: String(storeId) },
          },
          variant: {
            data: { type: "variants", id: String(variantId) },
          },
        },
      },
    };

    const r = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
      },
      body: JSON.stringify(payload),
    });

    const data = await r.json();

    if (!r.ok) {
      return res.status(400).json({
        error: "Lemon API error",
        status: r.status,
        details: data,
      });
    }

    const url = data?.data?.attributes?.url;
    if (!url) {
      return res.status(500).json({ error: "No checkout url returned", data });
    }

    return res.status(200).json({ url });
  } catch (err) {
    return res.status(500).json({ error: "Server error", message: String(err?.message || err) });
  }
}
