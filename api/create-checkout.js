// api/create-checkout.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const apiKey = process.env.LEMON_API_KEY;
    const storeId = process.env.LEMON_STORE_ID;
    const proVariantId = process.env.LEMON_VARIANT_ID;
    const premiumVariantId = process.env.LEMON_PREMIUM_VARIANT_ID;

    if (!apiKey || !storeId || !proVariantId || !premiumVariantId) {
      return res.status(500).json({
        error: "Missing env vars",
        missing: {
          LEMON_API_KEY: !apiKey,
          LEMON_STORE_ID: !storeId,
          LEMON_VARIANT_ID: !proVariantId,
          LEMON_PREMIUM_VARIANT_ID: !premiumVariantId,
        },
      });
    }

    const { email, plan } =
      req.body && typeof req.body === "object" ? req.body : {};

    let variantId = null;

    if (plan === "premium") {
      variantId = premiumVariantId;
    } else if (plan === "pro") {
      variantId = proVariantId;
    } else {
      return res.status(400).json({
        error: "Invalid plan",
        message: "Plan must be 'pro' or 'premium'",
      });
    }

    const payload = {
      data: {
        type: "checkouts",
        attributes: {
          test_mode: true,
          product_options: {
            redirect_url: "https://euskaliaweb.com/pago-correcto",
            enabled_variants: [Number(variantId)],
          },
          checkout_data: {
            ...(email ? { email } : {}),
            custom: {
              plan,
            },
          },
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
      return res.status(500).json({
        error: "No checkout url returned",
        data,
      });
    }

    return res.status(200).json({ url });
  } catch (err) {
    return res.status(500).json({
      error: "Server error",
      message: String(err?.message || err),
    });
  }
}